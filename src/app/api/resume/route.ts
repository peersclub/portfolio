import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { put } from '@vercel/blob';

// Email-gated resume download.
// POST { email, website?, source? } → records the lead in the private Blob
// store (leads/YYYY-MM-DD/…json) and streams the PDF back. The PDF lives in
// /private, outside /public, so there is no direct URL to it.
// Read leads with: npx vercel blob list --prefix leads/

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PDF_PATH = path.join(process.cwd(), 'private', 'Suresh-Victor-Resume.pdf');
const DOWNLOAD_NAME = 'Suresh Victor - Resume.pdf';
// Pragmatic check: one @, a dot in the domain, no spaces. The real check is
// that the person typed something they expect a reply on.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function bad(message: string, status = 400) {
    return Response.json({ error: message }, { status });
}

export async function POST(req: Request) {
    let body: { email?: unknown; website?: unknown; source?: unknown };
    try {
        body = await req.json();
    } catch {
        return bad('Send the email as JSON.');
    }

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
        return bad('Enter a valid email address, like name@company.com.');
    }

    // Honeypot: humans never see this field, so a filled value means a bot.
    // Answer like a success so the bot learns nothing, but record nothing.
    const isBot = typeof body.website === 'string' && body.website.length > 0;

    if (!isBot) {
        const at = new Date().toISOString();
        const lead = {
            email,
            at,
            source: typeof body.source === 'string' ? body.source.slice(0, 200) : null,
            country: req.headers.get('x-vercel-ip-country'),
            referer: req.headers.get('referer'),
            userAgent: req.headers.get('user-agent')?.slice(0, 300) ?? null,
        };
        try {
            await put(`leads/${at.slice(0, 10)}/${at.replace(/[:.]/g, '-')}-${randomUUID().slice(0, 8)}.json`, JSON.stringify(lead), {
                access: 'private',
                contentType: 'application/json',
                addRandomSuffix: false,
            });
        } catch (err) {
            // Never block the download on storage; the log keeps the lead.
            console.error('[resume] lead not stored', email, err);
        }
    }

    const pdf = await readFile(PDF_PATH);
    return new Response(new Uint8Array(pdf), {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${DOWNLOAD_NAME}"`,
            'Cache-Control': 'no-store',
        },
    });
}

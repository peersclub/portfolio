'use client';

import { useId, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Download, X } from 'lucide-react';
import './resume-gate.css';

type Status = 'idle' | 'sending' | 'done' | 'error';

/**
 * "Download resume" button + email dialog. The PDF is only served by
 * POST /api/resume after an email is entered. Radix portals the dialog to
 * <body>, which keeps it clear of the position:fixed trap in app/template.tsx.
 *
 * `tone` picks the button style: `solid` for the primary CTA row, `ghost`
 * next to an existing solid CTA. Colors come from --rg-* custom properties,
 * which default to the site accent and can be overridden per brand page.
 */
export default function ResumeGate({
    tone = 'ghost',
    label = 'Download resume',
    className = '',
    style,
}: {
    tone?: 'solid' | 'ghost';
    label?: string;
    className?: string;
    style?: React.CSSProperties;
}) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const errId = useId();

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const website = (new FormData(e.currentTarget).get('website') as string) || '';
        setStatus('sending');
        setError('');
        try {
            const res = await fetch('/api/resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, website, source: window.location.pathname }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || 'The download did not start. Try again in a moment.');
            }
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            setFileUrl(url);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Suresh Victor - Resume.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            setStatus('done');
        } catch (err) {
            setStatus('error');
            setError(err instanceof Error ? err.message : 'The download did not start. Try again in a moment.');
        }
    }

    return (
        <Dialog.Root
            open={open}
            onOpenChange={o => {
                setOpen(o);
                if (!o && status !== 'sending') setStatus(status === 'done' ? 'done' : 'idle');
            }}
        >
            <Dialog.Trigger asChild>
                <button type="button" className={`rg-trigger rg-${tone} ${className}`} style={style}>
                    <Download size={16} aria-hidden />
                    <span>{label}</span>
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="rg-overlay" />
                <Dialog.Content className="rg-dialog" aria-describedby={undefined}>
                    <Dialog.Close className="rg-close" aria-label="Close">
                        <X size={18} />
                    </Dialog.Close>
                    <Dialog.Title className="rg-title">Download my resume</Dialog.Title>

                    {status === 'done' ? (
                        <div className="rg-done">
                            <p>The PDF is downloading. If nothing appeared, open it here:</p>
                            <a className="rg-submit" href={fileUrl} download="Suresh Victor - Resume.pdf">
                                <Download size={16} aria-hidden />
                                Open the PDF
                            </a>
                        </div>
                    ) : (
                        <form onSubmit={submit} noValidate={false}>
                            <p className="rg-lede">
                                Enter your email and the PDF downloads right away. Only Suresh sees the
                                address.
                            </p>
                            <label className="rg-label" htmlFor="rg-email">
                                Work email
                            </label>
                            <input
                                id="rg-email"
                                className="rg-input"
                                type="email"
                                name="email"
                                required
                                autoComplete="email"
                                inputMode="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                aria-invalid={status === 'error'}
                                aria-describedby={status === 'error' ? errId : undefined}
                                autoFocus
                            />
                            {/* Honeypot — hidden from people, tempting to bots */}
                            <input className="rg-hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden />
                            {status === 'error' && (
                                <p id={errId} className="rg-error" role="alert">
                                    {error}
                                </p>
                            )}
                            <button className="rg-submit" type="submit" disabled={status === 'sending'}>
                                <Download size={16} aria-hidden />
                                {status === 'sending' ? 'Preparing the PDF…' : 'Download PDF'}
                            </button>
                        </form>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

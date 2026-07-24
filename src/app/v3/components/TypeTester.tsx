'use client';

/* Homage to casadisolare's type tester — but the specimen is the man:
   type a job title, drag the axes, watch the wordmark respond. */

import { useState } from 'react';

const PRESETS = ['Suresh Victor', 'Product Architect', 'Co-Founder & CPO', 'Hard-knot untangler'];

export default function TypeTester() {
    const [text, setText] = useState(PRESETS[0]);
    const [weight, setWeight] = useState(700);
    const [size, setSize] = useState(9);
    const [width, setWidth] = useState(100);

    return (
        <div className="v3-tester">
            <div className="v3-tester-controls">
                <label className="v3-tester-field">
                    <span className="v3-label">Specimen</span>
                    <input
                        className="v3-tester-input"
                        value={text}
                        maxLength={40}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type something…"
                    />
                </label>
                <label className="v3-tester-field">
                    <span className="v3-label">Weight — {weight}</span>
                    <input type="range" min={200} max={800} value={weight} onChange={(e) => setWeight(+e.target.value)} />
                </label>
                <label className="v3-tester-field">
                    <span className="v3-label">Size — {size}vw</span>
                    <input type="range" min={3} max={14} step={0.5} value={size} onChange={(e) => setSize(+e.target.value)} />
                </label>
                <label className="v3-tester-field">
                    <span className="v3-label">Width — {width}</span>
                    <input type="range" min={75} max={100} value={width} onChange={(e) => setWidth(+e.target.value)} />
                </label>
                <div className="v3-tester-presets">
                    {PRESETS.map((p) => (
                        <button key={p} className="v3-chip" onClick={() => setText(p)}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>
            <div className="v3-tester-stage">
                <span
                    className="v3-tester-specimen"
                    style={{
                        fontSize: `${size}vw`,
                        fontVariationSettings: `'wght' ${weight}, 'wdth' ${width}, 'opsz' 96`,
                    }}
                >
                    {text || 'Suresh Victor'}
                </span>
            </div>
        </div>
    );
}

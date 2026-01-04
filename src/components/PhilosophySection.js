class PhilosophySection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 100px 20px;
                    background: rgba(0, 0, 0, 0.2); /* Slight darken */
                }

                .container {
                    max-width: 1000px;
                    margin: 0 auto;
                }

                h2 {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 2rem;
                    color: #ccff00; /* Acid Green */
                    margin-bottom: 50px;
                    text-transform: uppercase;
                }

                h2::before {
                    content: '> ';
                    color: white;
                }

                .grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                }

                @media (max-width: 768px) {
                    .grid { grid-template-columns: 1fr; }
                }

                .column h3 {
                    font-family: system-ui, sans-serif;
                    font-size: 1.5rem;
                    color: white;
                    margin-bottom: 20px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    padding-bottom: 10px;
                }

                p {
                    font-family: system-ui, sans-serif;
                    color: rgba(255, 255, 255, 0.7);
                    line-height: 1.8;
                    font-size: 1rem;
                    margin-bottom: 20px;
                }

                ul {
                    list-style: none;
                    padding: 0;
                }

                li {
                    font-family: 'JetBrains Mono', monospace;
                    color: rgba(255, 255, 255, 0.8);
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                }

                li::before {
                    content: '0x';
                    color: #ff3300;
                    margin-right: 10px;
                    font-size: 0.8rem;
                    opacity: 0.7;
                }

                .highlight {
                    color: #fff;
                    font-weight: bold;
                }
            </style>

            <div class="container" id="about">
                <h2>System_Philosophy</h2>
                
                <div class="grid">
                    <div class="column">
                        <h3>Why No Frameworks?</h3>
                        <p>
                            Modern web development is bloated. Layers upon layers of abstraction 
                            have disconnected us from the machine. I believe in 
                            <span class="highlight">engineering close to the metal</span>.
                        </p>
                        <p>
                            By removing dependencies, we regain control. We achieve 
                            sub-millisecond render times and a deep understanding of 
                            how the browser actually works. This site is a testament 
                            to that belief—pure Native Web Technologies.
                        </p>
                    </div>

                    <div class="column">
                        <h3>Tech Stack & Tooling</h3>
                        <ul>
                            <li>Arch Linux (Hyprland + Wayland)</li>
                            <li>Neovim (Custom Lua Config)</li>
                            <li>WebGPU & WGSL Shaders</li>
                            <li>Rust & WebAssembly</li>
                            <li>Vanilla JavaScript (ES6 Modules)</li>
                            <li>PostgreSQL & Low-level Backend</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('philosophy-section', PhilosophySection);
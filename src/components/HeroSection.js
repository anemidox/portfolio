class HeroSection extends HTMLElement {
    constructor() {
        super();
        // Enable Shadow DOM for style encapsulation
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        // We define styles inside the component for maximum portability
        const styles = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100vh; /* Full viewport height */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    z-index: 10;
                }

                .hero-container {
                    text-align: center;
                    max-width: 1000px;
                    padding: 40px;
                    
                    /* Glassmorphism Effect */
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    
                    /* Fade in animation */
                    animation: fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                    opacity: 0;
                    transform: translateY(30px);
                }

                h1 {
                    font-family: system-ui, -apple-system, sans-serif;
                    font-size: clamp(3rem, 10vw, 8rem);
                    font-weight: 900;
                    line-height: 0.9;
                    margin: 0;
                    color: white;
                    text-transform: uppercase;
                    letter-spacing: -0.04em;
                }

                .highlight {
                    /* Gradient Text */
                    background: linear-gradient(135deg, #fff 0%, #ffaa00 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                p.subtitle {
                    font-family: 'Courier New', monospace; /* Tech feel */
                    font-size: 1.2rem;
                    color: rgba(255, 255, 255, 0.6);
                    margin-top: 20px;
                    margin-bottom: 40px;
                }

                .cta-button {
                    display: inline-block;
                    padding: 16px 32px;
                    background: #ccff00; /* Acid Green accent */
                    color: #000;
                    font-weight: 700;
                    text-decoration: none;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border-radius: 50px;
                    transition: all 0.3s ease;
                    border: none;
                    cursor: pointer;
                    font-size: 1rem;
                }

                .cta-button:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 30px rgba(204, 255, 0, 0.4); /* Glowing effect */
                }

                /* Tech Stats at the bottom */
                .stats {
                    margin-top: 30px;
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.3);
                    font-family: monospace;
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                }

                @keyframes fadeUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        `;

        // The HTML structure of the component
        this.shadowRoot.innerHTML = `
            ${styles}
            <div class="hero-container">
                <h1>
                    Future <br> 
                    <span class="highlight">Artifacts</span>
                </h1>
                
                <p class="subtitle">
                    > ENG.VIHANGA // HIGH-PERFORMANCE WEB ARCHITECTURE
                </p>

                <a href="#projects" class="cta-button">Initialize System</a>

                <div class="stats">
                    <span>GPU: ACTIVE</span>
                    <span>RENDER: WEB_GPU</span>
                    <span>MODE: HYPER_FAST</span>
                </div>
            </div>
        `;
    }
}

// Register the custom element so we can use <hero-section> in HTML
customElements.define('hero-section', HeroSection);

// Export is not strictly necessary if we import for side-effects, 
// but good practice.
export default HeroSection;
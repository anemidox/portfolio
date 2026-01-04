class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Get attributes passed to the tag
        const title = this.getAttribute('title') || 'Untitled Project';
        const type = this.getAttribute('type') || 'Experiment';
        const image = this.getAttribute('image') || ''; 
        
        this.render(title, type, image);
    }

    render(title, type, image) {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    perspective: 1000px; /* For 3D tilt effect */
                    height: 100%; /* Ensure host takes full height of grid cell */
                }

                .card {
                    /* Layout & Sizing */
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    height: 100%;
                    min-height: 100px; /* ADDED: Minimum height to make boxes consistent */
                    padding: 30px;
                    box-sizing: border-box;

                    /* Glassmorphism Visuals */
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    backdrop-filter: blur(10px);
                    
                    /* Animation & Interaction */
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                }

                /* Hover Effects */
                .card:hover {
                    transform: translateY(-10px) scale(1.02);
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.3);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 
                                0 0 20px rgba(255, 69, 0, 0.2); /* Red Glow */
                }

                /* Project Type Tag */
                .type {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.75rem;
                    color: #ccff00; /* Acid Green */
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 20px;
                    display: inline-block;
                    padding: 4px 8px;
                    border: 1px solid rgba(204, 255, 0, 0.2);
                    border-radius: 4px;
                    align-self: flex-start; /* Align tag to the left */
                }

                h3 {
                    margin: 0 0 15px 0;
                    font-size: 1.8rem;
                    font-family: system-ui, sans-serif;
                    font-weight: 700;
                    color: white;
                    line-height: 1.2;
                }

                /* Description Text Area */
                .description {
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.6);
                    line-height: 1.6;
                    flex-grow: 1; /* Makes this fill available space */
                }

                /* Decorative Corner Gradient */
                .card::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, transparent 50%, rgba(255, 255, 255, 0.1) 50%);
                    opacity: 0.6;
                    pointer-events: none;
                }
            </style>

            <div class="card">
                <span class="type">${type}</span>
                <h3>${title}</h3>
                <div class="description">
                    <slot></slot> </div>
            </div>
        `;
    }
}

customElements.define('project-card', ProjectCard);
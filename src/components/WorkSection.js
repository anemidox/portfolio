import './ProjectCard.js';

class WorkSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupIntersectionObserver(); // Enable scroll animation
    }

    // This makes items fade in when you scroll to them
    setupIntersectionObserver() {
        const options = {
            root: null,
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, options);

        // Observe the grid container
        const grid = this.shadowRoot.querySelector('.grid');
        if (grid) observer.observe(grid);
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 100px 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                h2.section-title {
                    font-family: system-ui, sans-serif;
                    font-size: 3rem;
                    color: white;
                    margin-bottom: 10px;
                    border-left: 4px solid #ff3300; /* Red accent line */
                    padding-left: 20px;
                }

                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 30px;
                    opacity: 0;
                    transform: translateY(40px);
                    transition: all 0.8s ease-out;
                }

                /* Class added by JS when scrolled into view */
                .grid.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            </style>

            <div id="projects">
                <h2 class="section-title">Selected Works</h2>
                
                <div class="grid">
                    <project-card title="Hyper Portfolio" type="Web Architecture">
                        A framework-less, high-performance web experience powered by 
                        WebGPU and Vanilla JavaScript. Optimized for Arch Linux 
                        workflow integration.
                    </project-card>

                    <project-card title="Car Auction Engine" type="Full Stack">
                        Real-time bidding platform designed with React & C#. 
                        Features high-concurrency handling and optimized database transactions.
                    </project-card>

                    <project-card title="Nvim-Lua-Config" type="Tooling">
                        A custom Lua-based development environment for Neovim. 
                        Optimized for LSP performance and sub-50ms startup time.
                    </project-card>
                    
                    <project-card title="Neural Lace" type="Experiment">
                        Experimental WebAssembly implementation for neural network 
                        visualization in the browser.
                    </project-card>
                </div>
            </div>
        `;
    }
}

customElements.define('work-section', WorkSection);
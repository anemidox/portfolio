class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.updateTime(); // Initialize the system clock
        this.setupNavigation(); // Initialize navigation click handlers
    }

    updateTime() {
        // Updates the time every second to mimic a system OS clock
        const timeElement = this.shadowRoot.getElementById('sys-time');
        if (timeElement) {
            const now = new Date();
            // Format: HH:MM:SS (24-hour format)
            timeElement.textContent = now.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
            });
        }
        // Recursive call to update every second
        setTimeout(() => this.updateTime(), 1000);
    }

    setupNavigation() {
        // Select all navigation links inside the Shadow DOM
        const links = this.shadowRoot.querySelectorAll('nav a');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default anchor jump behavior
                
                // Extract target name from href (e.g., "#projects" -> "projects")
                const targetName = link.getAttribute('href').substring(1);
                
                // Map the link ID to the actual Web Component tag name in index.html
                let targetTag = '';
                if (targetName === 'projects') targetTag = 'work-section';
                if (targetName === 'about') targetTag = 'philosophy-section';
                if (targetName === 'lab') targetTag = 'hero-section'; // Mapping 'lab' to top for now

                // Find the target component in the main Light DOM
                const element = document.querySelector(targetTag);
                
                // Smooth scroll to the element if found
                if (element) {
                    element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 100; /* Ensure header stays on top of content */
                }

                header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 40px;
                    
                    /* Glassmorphism Effect */
                    background: rgba(5, 1, 0, 0.6); /* Dark semi-transparent background */
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px); /* Safari support */
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                /* Logo Styling */
                .logo {
                    font-family: 'JetBrains Mono', monospace;
                    font-weight: 700;
                    font-size: 1.2rem;
                    color: white;
                    letter-spacing: -1px;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .logo span {
                    color: #ff3300; /* Accent Red color */
                }

                /* Navigation Container */
                nav {
                    display: flex;
                    gap: 30px;
                }

                nav a {
                    font-family: system-ui, sans-serif;
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.7);
                    text-decoration: none;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    transition: color 0.3s ease;
                    position: relative;
                    cursor: pointer;
                }

                nav a:hover {
                    color: #fff;
                }

                /* Animated Underline Effect on Hover */
                nav a::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: -5px;
                    left: 0;
                    background-color: #ccff00; /* Acid Green accent */
                    transition: width 0.3s ease;
                }

                nav a:hover::after {
                    width: 100%;
                }

                /* System Status / Clock Styling */
                .system-status {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.8rem;
                    color: #ccff00;
                    border: 1px solid rgba(204, 255, 0, 0.3);
                    padding: 5px 12px;
                    border-radius: 4px;
                    background: rgba(204, 255, 0, 0.05);
                }

                /* Responsive Design: Hide Nav on Mobile */
                @media (max-width: 600px) {
                    header {
                        padding: 15px 20px;
                    }
                    nav {
                        display: none; 
                    }
                }
            </style>

            <header>
                <a href="#" class="logo">
                    DHANUJA<span>_DEV</span>
                </a>

                <nav>
                    <a href="#projects">Work</a>
                    <a href="#about">Philosophy</a>
                    <a href="#lab">Lab</a>
                </nav>

                <div class="system-status">
                    SYS_TIME: <span id="sys-time">00:00:00</span>
                </div>
            </header>
        `;
    }
}

// Register the custom element
customElements.define('app-header', AppHeader);
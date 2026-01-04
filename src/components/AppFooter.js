class AppFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const year = new Date().getFullYear();
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 40px 20px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    background: rgba(0,0,0,0.8);
                    margin-top: 50px;
                }
                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: rgba(255, 255, 255, 0.4);
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.8rem;
                }
                a {
                    color: inherit;
                    text-decoration: none;
                    margin-left: 20px;
                    transition: color 0.2s;
                }
                a:hover {
                    color: #ccff00;
                }
            </style>
            <div class="footer-content">
                <div>
                    &copy; ${year} ENG.VIHANGA. ALL SYSTEMS NORMAL.
                </div>
                <div>
                    <a href="https://github.com/" target="_blank">GITHUB</a>
                    <a href="https://linkedin.com/" target="_blank">LINKEDIN</a>
                    <a href="mailto:email@example.com">CONTACT</a>
                </div>
            </div>
        `;
    }
}
customElements.define('app-footer', AppFooter);
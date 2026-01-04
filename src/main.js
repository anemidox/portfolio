import { initWebGPU } from "./core/GPUContext.js";

import "./components/AppHeader.js";
import "./components/HeroSection.js";
import "./components/WorkSection.js";
import "./components/PhilosophySection.js";

const startTime = performance.now();

async function bootSystem() {
  console.log("Initializing Hyper-Portfolio Engine...");

  const appContainer = document.getElementById("app");
  const gpuCanvas = document.getElementById("gpu-canvas");

  renderUI(appContainer);

  requestAnimationFrame(() => {
    appContainer.style.opacity = "1";
  });

  // ---------------------------------------------------------
  // STEP 2: WebGPU Background  (Async Loading)
  // ---------------------------------------------------------
  try {
    console.log("Attempting to initialize WebGPU...");
    const gpuSuccess = await initWebGPU(gpuCanvas);

    if (!gpuSuccess) {
      console.warn("WebGPU not supported - Switching to Fallback Mode.");
      document.body.classList.add("no-gpu"); // CSS fallback
    } else {
      console.log("WebGPU Pipeline Active: Liquid Magma Ready.");
    }
  } catch (error) {
    console.error("Critical GPU Error:", error);
  }

  // ---------------------------------------------------------
  // STEP 3: Performance Logging
  // ---------------------------------------------------------
  const endTime = performance.now();
  const loadTime = (endTime - startTime).toFixed(2);

  console.log(`System Fully Ready in ${loadTime}ms`);
}

function renderUI(container) {
  if (!container) return;

  container.innerHTML = `
        <app-header></app-header>

        <main>
            <hero-section></hero-section>

            <work-section></work-section>

            <philosophy-section></philosophy-section>
        </main>

        <app-footer></app-footer>
    `;

  console.log("DOM Injection Complete.");
}

window.addEventListener("DOMContentLoaded", bootSystem);

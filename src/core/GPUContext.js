let device = null;
let context = null;
let pipeline = null;
let startTimestamp = 0;

export async function initWebGPU(canvas) {
    
    if (!navigator.gpu) {
        console.error("WebGPU not supported on this browser.");
        return false;
    }

    
    const adapter = await navigator.gpu.requestAdapter({
        powerPreference: 'high-performance'
    });

    if (!adapter) {
        console.error("No appropriate GPU adapter found.");
        return false;
    }

    
    device = await adapter.requestDevice();

   
    context = canvas.getContext('webgpu');
    const canvasFormat = navigator.gpu.getPreferredCanvasFormat();

    context.configure({
        device: device,
        format: canvasFormat,
        alphaMode: 'premultiplied', 
    });

    await initPipeline(canvasFormat);

    startTimestamp = performance.now();
    requestAnimationFrame(render);

    return true;
}

async function initPipeline(format) {
    const response = await fetch('./src/shaders/liquid.wgsl');
    const shaderCode = await response.text();

    const shaderModule = device.createShaderModule({
        label: 'Liquid Magma Shader',
        code: shaderCode
    });

    pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: {
            module: shaderModule,
            entryPoint: 'vs_main', 
        },
        fragment: {
            module: shaderModule,
            entryPoint: 'fs_main', 
            targets: [{ format: format }]
        },
        primitive: {
            topology: 'triangle-list' 
        }
    });
}

function render() {
    if (!device || !pipeline) return;

    const now = performance.now();
    const time = (now - startTimestamp) * 0.001;

    
    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();

    const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [{
            view: textureView,
            clearValue: { r: 0.05, g: 0.02, b: 0.01, a: 1.0 }, 
            loadOp: 'clear',
            storeOp: 'store',
        }]
    });

    passEncoder.setPipeline(pipeline);
    
    passEncoder.draw(6); 
    
    passEncoder.end();

    device.queue.submit([commandEncoder.finish()]);

    requestAnimationFrame(render);
}
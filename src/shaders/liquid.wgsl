// 1. Structure defining data sent from Vertex Shader to Fragment Shader
struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
    @location(0) uv : vec2<f32>,
};

// 2. Vertex Shader (Generates a full-screen quad)
@vertex
fn vs_main(@builtin(vertex_index) vertexIndex : u32) -> VertexOutput {
    // We generate a full-screen quad (2 triangles) directly in the shader
    // No vertex buffer needed from CPU
    var pos = array<vec2<f32>, 6>(
        vec2<f32>(-1.0, -1.0), vec2<f32>( 1.0, -1.0), vec2<f32>(-1.0,  1.0),
        vec2<f32>(-1.0,  1.0), vec2<f32>( 1.0, -1.0), vec2<f32>( 1.0,  1.0)
    );

    var output : VertexOutput;
    var xy = pos[vertexIndex];
    
    output.Position = vec4<f32>(xy, 0.0, 1.0);
    
    // Calculate UV coordinates (mapping -1..1 to 0..1)
    output.uv = (xy + 1.0) * 0.5; 
    
    return output;
}

// 3. Fragment Shader (Renders the liquid magma pattern)
@fragment
fn fs_main(@location(0) uv : vec2<f32>) -> @location(0) vec4<f32> {
    
    // 2030 Magma Color Palette
    let color_dark = vec3<f32>(0.05, 0.0, 0.02);   // Deep void background
    let color_red = vec3<f32>(0.8, 0.1, 0.0);      // Magma red
    let color_amber = vec3<f32>(1.0, 0.6, 0.1);    // Glowing amber

    // Calculate distance from center for radial gradient effects
    let center = vec2<f32>(0.5, 0.5);
    let dist = distance(uv, center);

    // Generate a simple interference pattern
    // TODO: Pass 'time' uniform later for animation
    let pattern = sin(uv.x * 10.0) * sin(uv.y * 10.0);
    
    // Mix colors based on distance and pattern
    var finalColor = mix(color_dark, color_red, dist); 
    finalColor = mix(finalColor, color_amber, pattern * 0.2); 

    // Add a subtle neon glow vignette
    let glow = 1.0 - smoothstep(0.0, 0.8, dist);
    finalColor = finalColor + (glow * 0.1);

    return vec4<f32>(finalColor, 1.0);
}
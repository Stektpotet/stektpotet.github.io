---
layout: blog
title: Post Processing Adventures - Pixealation Shader
header:
  title: Post Processing Adventures
  subtitle: Pixelation Shader
date: 2018-06-18 00:00:00 +02:00
categories:
- Graphics
thumbnail: safe.png
preview:
  img: /uploads/pixelation_shader.png
  alt: Preview of the pixelation effect
  img-background: '#194c66'
project-date: June 2018
description: Use this area of the page to describe your project. The icon above is
  part of a free icon set by <a href="https://sellfy.com/p/8Q9P/jV3VZ/">Flat Icons</a>.
  On their website, you can download their free set with 16 icons, or you can purchase
  the entire set with 146 icons for only $12!
---
## Post Processing

Post processing is an incredibly powerful tool in graphics.
As suggested by the name, post processing happens post (i.e. after) processing. In the graphics context - after rendering.


Now, what does that mean? How can we apply rendering procedures after rendering is complete?

---
To explain how post processing can be implemented into a graphics project, I will explain the process in which I myself implemented it in a simple OpenGL project that had a render loop looking a little something like this:
```c++
void update(float dt) {/*...*/}

int main(int argc, char** args) {

/// Initialization of everything
///
///         ...
///

    float lastFrameTime = 0, time = 0, deltaTime = 0;
    while(!glfwWindowShouldClose(window))
    {
        time = (float)glfwGetTime();
        deltaTime = time - lastFrameTime;


        Renderer::clear();
        update(dt); //up
        Renderer::draw(scene);


        lastFrameTime = time;
    }
}
```

To enable post processing in such a render-loop, some additional technology needs to be implemented, resulting in another step in the render-loop - another draw-call even!

When you render geometry directly to your viewport window, there's no 'thing' to apply post processing effects onto, as the rendering process is 'given away'. - in such a case there is no output from the context for you to do further processing on. We need such an output, so we insert one in our rendering loop. How? - by rendering to a buffer, or a texture.


## Pixelating your viewport


### vertex shader

``` glsl
#version 410
layout(location = 0) in vec2 position;
layout(location = 1) in vec2 tex_coord;

out vec2 uv;
void main() {
    uv = tex_coord;
    gl_Position = vec4(position, 0.0, 1.0);
}
```

### fragment shader
``` glsl
#version 410
in vec2 uv;

//from our engine, were rendering the color component to a texture, a so called 'render texture', this is what we intend to apply post processing on.
uniform sampler2D rTex_color; //not to be confused with tRex_color, the color of a very dangerous dinosaur...

const float width = 800.0;	//
const float height = 600.0; //
const float wPix=100.0; //pixels in width
const float hPix=75.0;	//pixels in height
const float dx = (width  / wPix) / width;  //'pixel' width in pixels
const float dy = (height / hPix) / height; //'pixel' height in pixels

out vec4 out_color;
void main() {
    vec2 pix = vec2(dx,dy);

    vec2 pixUV = vec2(
        pix.x * round(uv.x / pix.x),
        pix.y * round(uv.y / pix.y)
    );
    out_color = texture(rTex_color, pixUV);
}
```

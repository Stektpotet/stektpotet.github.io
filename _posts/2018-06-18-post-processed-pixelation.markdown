---
layout: blog_post
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
description:
---
{::options parse_block_html="true" /}
## Pixelating your viewport through post Processing
{: .text-center }

For more information on how post processing works, check out this article: [Post Processing in OpenGL ](/articles/Post Processing/)
{: .alert .article-note .jumbotron }

{% capture warn_content %}
This blog post is not yet finished
{: .text-center .small style="color: #{{ site.color.WIP }};"}
{% endcapture %}

{%
    include panels/warn_WIP.html
    panel-header="**Work in Progress!**"
    content=warn_content
%}


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

{% capture note00_content %}
In most cases when dealing with post processing effects, you can get away _without_ providing UV-coordinates (`tex_coord` in the shaders) because they are directly proportionate with the fragment coordinates (accessible through the built-in variable `gl_FragCoord` in OpenGL):

$$
c_{UV} \propto c_{frag}
$$

by normalizing the fragment coordinates to the viewport we get the UV coordinates!
{: .text-center}

$$
c_{UV}=c_{frag}/viewport
$$

Meaning - we can use `gl_FragCoord` to do the sampling of the rendertexture:
```glsl
// - fragment shader
uniform vec2 viewport; //the size of the viewport, passed in upon starting the program or/and whenever it changes...

// more stuff...
void main() {
    vec2 uv = gl_FragCoord/viewport;
    out_color = texture(rTex_color, uv);
}
```
Having said that, it might still be worth sending the UV-coordinates in as part of the vertices, considering you will, in most cases, only pass 4 vertices (the four corners of the viewport quad) into a post processing shader program.
{% endcapture %}
{%
    include panels/side_note.html
    panel-header="Using $c_{UV} \propto c_{frag}$ to minimize our vertex size"
    panel-id="note00"
    content=note00_content
%}

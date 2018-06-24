---
title: Post Processing in OpenGL
categories:
- Game Development
- Programming
tags:
- Unity
- C#
- Programming
- Game Development
description: Nada
layout: article
---

{% capture warn_content %}
This article is not yet finished
{: .text-center .small style="color: #{{ site.color.WIP }};"}
{% endcapture %}

{% include panels/warn_WIP.html panel-header="**Work in Progress!**" content=warn_content %}

This article revolves around implementing post processing capabilities in OpenGL, but _should_ in theory cover a lot the ideas behind post processing in a broader sense. As with anything on this site - feel free to contact me, for inquiries, questions or corrections and what not.
{: .alert .article-note .jumbotron }

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

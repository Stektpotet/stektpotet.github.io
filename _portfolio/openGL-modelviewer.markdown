---
title: OpenGL ModelViewer
date: 2018-05-05 12:47:00 +01:00
categories:
- Game Development
- Programming
tags:
- Programming
- Game Development
modal-id: 3
thumbnail:
  img: OpenGL/Dragon.gif
  alt: Sample Scene rendering the Stanford Dragon
images:
- path: OpenGL/Dragon.gif
  alt: Sample Scene rendering the Stanford Dragon
  description: A sample scene rendering the Stanford Dragon
- path: OpenGL/Bunny.gif
  alt: Stanford Bunny
  description: The Stanford Bunny first time rendering
- path: OpenGL/skybox.gif
  alt: Skybox Demo
  description: demo of realtime asset reloading
links:
- label: Github Repository
  url: https://github.com/Stektpotet/IMT2531-Assignment-2
- label: Github
  url: https://github.com/Stektpotet
description: A comprehensive model viewer/shader playground/scene builder made as part of the NTNU course IMT2531
---

#### OpenGL Model Viewer
Is a comprehensive model viewer/shader playground/scene builder made as part of the NTNU course IMT2531.

Core features:

* Custom, easy to read model format (yaml)

* Configurable execution

* Custom scenegraph implementation

* Scenes, formatted in a yaml custom format

* A sample set of shaders

* Extended shader syntax, to control typical draw call modifiers (blend function/culling/depth test)

* Custom Material format, directly applied to shader uniforms when bound

* Lights, accessible through a uniform buffer object

* Asset Reloading 

  | Key   | Action                                   |
  | ----- | ---------------------------------------- |
  | 1     | Reload all shaders                       |
  | 2     | Reload all materials                     |
  | 3     | Reload all models                        |
  | 4     | Reload scene (and config)                |
  | TAB   | Switch camera (if several cameras in scene) |
  | SPACE | Switch camera-mode (Freeflight/orbital)  |
uniform float flow;
varying vec3 vNormal;
varying float vFlow;

#include src/engine/resources/shaders/classicnoise3D.glsl

void main() {

  vNormal = normal;
  vFlow = flow;

  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
}
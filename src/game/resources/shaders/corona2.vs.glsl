uniform float amplitude;
attribute float displacement;
varying vec3 vNormal;

#include src/engine/resources/shaders/noise3D.glsl

void main() {

  vNormal = normal;

  float n = snoise(normal * amplitude);

  vec3 newPosition = position + normal *
    vec3(displacement * n);

  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(newPosition, 1.0);
}
uniform vec3 color;
varying vec3 vNormal;
varying float vFlow;

#include src/engine/resources/shaders/noise3D.glsl

void main() {

  vec3 light = vec3(0.5, 0.2, 1.0);
  
  light = normalize(light);

  float n = snoise(vNormal * 24.0 + vFlow);

  float texColor = (n+0.5) * dot(vNormal, light);

  gl_FragColor = vec4(texColor + color.r, texColor+color.g, texColor+color.b, 1.0);  

}

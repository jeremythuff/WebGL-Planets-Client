
varying vec3 vNormal;

#include src/engine/resources/shaders/noise3D.glsl

void main() {

  vec3 light = vec3(0.5, 0.2, 1.0);
  
  light = normalize(light);

  float n = snoise(light);
  
  float dProd1 = max(n, dot(vNormal, light));
  float dProd2 = max(n, dot(vNormal, light));
  float dProd3 = max(n, dot(vNormal, light));

  gl_FragColor = vec4(dProd1, dProd2, dProd3, 1.0);  

}

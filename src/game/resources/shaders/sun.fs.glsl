
varying vec3 vNormal;

float rand(vec2 co)
{
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

void main() {

  vec3 light = vec3(0.5, 0.2, 1.0);
  
  light = normalize(light);
  
  float dProd = max(rand(vec2(sin(vNormal.x), 1.0)), dot(vNormal, light));

  gl_FragColor = vec4(1.0, dProd, dProd, 1.0);  

}

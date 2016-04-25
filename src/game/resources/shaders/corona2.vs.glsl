uniform float amplitude;
attribute float displacement;
varying vec3 vNormal;

#include src/engine/resources/shaders/noise3D.glsl

void main() {

  	vNormal = normal;

  	float n = snoise(normal * amplitude);

  	float newPositionX = (position.x + normal.x) * (displacement * amplitude);
	float newPositionY = (position.y + normal.y) * (displacement * amplitude);
  	// gl_Position = projectionMatrix *
   	//              modelViewMatrix *
   	//              vec4(newPosition.x, newPosition.y, position.z, 1.0);


	gl_Position = projectionMatrix * (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0) + vec4(newPositionX, newPositionY, 0.0, 0.0));
}
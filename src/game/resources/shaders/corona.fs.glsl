uniform vec3 color;
//uniform sampler2D texture;
uniform float alpha;

varying vec3 vNormal;

void main() {

	vec3 light = vec3(0.5, 0.2, 1.0);
	light = normalize(light);

	float texColor = max(0.0, dot(vNormal, light));

  	gl_FragColor = vec4(texColor + color.r, texColor+color.g, texColor+color.b, alpha);  

}



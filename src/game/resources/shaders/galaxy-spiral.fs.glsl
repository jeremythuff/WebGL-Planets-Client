uniform vec3 color;
uniform sampler2D texture;
uniform float alpha;

varying vec3 vColor;

void main() {

	gl_FragColor = vec4( color * vColor, alpha );
	gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );

}
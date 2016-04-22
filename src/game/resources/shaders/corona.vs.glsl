uniform vec3 scale;

varying vec3 vNormal;

void main() {

    vNormal = normal;

    float rotation = 0.0;

    vec3 alignedPosition = vec3(position.x * scale.x, position.y * scale.y, position.z*scale.z);

    vec2 pos = alignedPosition.xy;

    vec2 rotatedPosition;
    rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
    rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;

    vec4 finalPosition;

    finalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
    finalPosition.xy += rotatedPosition;
    finalPosition = projectionMatrix * finalPosition;

    gl_Position =  finalPosition;

}
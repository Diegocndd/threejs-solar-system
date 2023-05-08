import * as THREE from "three";

class Planet extends THREE.Mesh {
  constructor({ radius, widthSegments, heightSegments, texture }) {
    const planetTexture = new THREE.TextureLoader().load(texture);
    planetTexture.wrapS = THREE.RepeatWrapping;
    planetTexture.wrapT = THREE.RepeatWrapping;
    planetTexture.repeat.set(1, 1);

    super(
      new THREE.SphereGeometry(radius, widthSegments, heightSegments),
      new THREE.MeshStandardMaterial({ map: planetTexture })
    );
  }
}

export default Planet;

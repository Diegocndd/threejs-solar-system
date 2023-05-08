import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Planet from "./Planet";
import { isCompletelyVisibleElement, isVisibleElement } from "./utils";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(700)
  .fill()
  .forEach(() => addStar());

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

camera.position.setZ(30);

// yeah, we will treat the Sun like a planet
const sun = new Planet({
  radius: 3,
  widthSegments: 32,
  heightSegments: 32,
  texture: "textures/sun.jpg",
});
scene.add(sun);

renderer.render(scene, camera);

sun.position.z = -50;

let addedMercury = false;
let addedVenus = false;
let addedEarth = false;
let addedMars = false;
let addedJupiter = false;
let addedSaturne = false;
let addedUranus = false;
let addedNetune;
let mercury;
let venus;
let earth;
let mars;
let jupiter;
let saturne;
let uranus;
let netune;

function animate() {
  requestAnimationFrame(animate);

  sun.rotation.y += 0.01;

  if (mercury) {
    mercury.rotation.y += 0.01;
  }

  if (venus) {
    venus.rotation.y += 0.01;
  }

  if (earth) {
    earth.rotation.y += 0.01;
  }

  if (mars) {
    mars.rotation.y += 0.01;
  }

  if (jupiter) {
    jupiter.rotation.y += 0.01;
  }

  if (saturne) {
    saturne.rotation.y += 0.01;
  }

  if (uranus) {
    uranus.rotation.y += 0.01;
  }

  if (netune) {
    netune.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

const mercuryContainer = document.getElementById("mercury-container");
const venusContainer = document.getElementById("venus-container");
const earthContainer = document.getElementById("earth-container");

function moveCamera() {
  const mercuryVisible = isVisibleElement(mercuryContainer);
  const venusVisible = isVisibleElement(venusContainer);
  const earthVisible = isVisibleElement(earthContainer);

  if (!addedMercury && mercuryVisible) {
    mercury = new Planet({
      radius: 3,
      widthSegments: 32,
      heightSegments: 32,
      texture: "textures/mercury.jpg",
    });
    scene.add(mercury);
    mercury.position.z = -90;
    renderer.render(scene, camera);

    addedMercury = true;
  }

  if (!addedVenus && venusVisible) {
    venus = new Planet({
      radius: 3,
      widthSegments: 32,
      heightSegments: 32,
      texture: "textures/venus.jpg",
    });
    scene.add(venus);
    venus.position.z = -130;
    renderer.render(scene, camera);

    addedVenus = true;
  }

  if (!addedEarth && earthVisible) {
    earth = new Planet({
      radius: 3,
      widthSegments: 32,
      heightSegments: 32,
      texture: "textures/earth.jpg",
    });
    scene.add(earth);
    earth.position.z = -170;

    addedEarth = true;
  }

  if (
    !addedMars &&
    isVisibleElement(document.getElementById("mars-container"))
  ) {
    mars = new Planet({
      radius: 3,
      widthSegments: 32,
      heightSegments: 32,
      texture: "textures/mars.png",
    });
    scene.add(mars);
    mars.position.z = -210;

    addedMars = true;
  }

  if (
    !addedJupiter &&
    isVisibleElement(document.getElementById("jupiter-container"))
  ) {
    jupiter = new Planet({
      radius: 7,
      widthSegments: 32,
      heightSegments: 32,
      texture: "textures/jupiter.jpg",
    });
    scene.add(jupiter);
    jupiter.position.z = -250;

    addedJupiter = true;
  }

  if (
    !addedSaturne &&
    isVisibleElement(document.getElementById("saturne-container"))
  ) {
    saturne = new Planet({
      radius: 5,
      widthSegments: 32,
      heightSegments: 32,
      texture: "textures/saturne.jpg",
    });
    scene.add(saturne);
    saturne.position.z = -290;

    addedSaturne = true;
  }

  if (
    !addedUranus &&
    isVisibleElement(document.getElementById("uranus-container"))
  ) {
    uranus = new Planet({
      radius: 3,
      widthSegments: 32,
      heightSegments: 32,
      texture: "textures/uranus.jpeg",
    });
    scene.add(uranus);
    uranus.position.z = -330;

    addedUranus = true;
  }

  if (
    !addedNetune &&
    isVisibleElement(document.getElementById("netune-container"))
  ) {
    netune = new Planet({
      radius: 3,
      widthSegments: 32,
      heightSegments: 32,
      texture: "textures/netune.jpeg",
    });
    scene.add(netune);
    netune.position.z = -370;

    addedNetune = true;
  }

  renderer.render(scene, camera);

  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * 0.05;
}

document.body.onscroll = moveCamera;
animate();

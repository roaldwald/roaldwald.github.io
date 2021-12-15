// Find the latest version by visiting https://cdn.skypack.dev/three.
import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.129.0-chk6X8RSBl37CcZQlxof/mode=imports/optimized/three.js';

var blockSizeX = document.getElementById('bg-block').offsetWidth
var blockSizeY = document.getElementById('bg-block').offsetHeight

console.log(blockSizeY)

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, blockSizeX / blockSizeY, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),

});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(blockSizeX, blockSizeY);

camera.position.z = 10;
camera.position.y = 5;
camera.rotation.x = -44.5;

const colorTexture = new THREE.TextureLoader().load('assets/tile_color.jpg');
const normalTexture = new THREE.TextureLoader().load('assets/tile_normal.jpg');
const roughnessMap = new THREE.TextureLoader().load('assets/tile_roughness.jpg');

const cube = new THREE.Mesh( 
    new THREE.BoxGeometry( 5, 5, 5 ), 
    new THREE.MeshStandardMaterial( { 
        map: colorTexture, 
        normalMap: normalTexture,
        roughness: 0.5,
        roughnessMap: roughnessMap
    } ) 
);
scene.add( cube );

const pointLight =  new THREE.PointLight(0xb4f8c8);
pointLight.position.set(3,5,5);

const ambientLight = new THREE.AmbientLight(0xa0e7e5);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(50, 50);

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

animate()
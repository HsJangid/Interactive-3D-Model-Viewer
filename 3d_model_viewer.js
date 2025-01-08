// Initialize the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('tour-container').appendChild(renderer.domElement);

// Set up OrbitControls to allow the user to navigate the scene
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

// Create and add ambient lighting to the scene
const light = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(light);

// Load a 3D model using GLTFLoader
const loader = new THREE.GLTFLoader();
loader.load('model path here, download from github', function (gltf) {
  const model = gltf.scene;
  scene.add(model);
}, undefined, function (error) {
  console.error(error);
});

// Position the camera
camera.position.z = 5;

// Animate and render the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Adjust the size of the renderer when the window is resized
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
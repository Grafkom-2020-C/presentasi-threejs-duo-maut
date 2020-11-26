var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,1,100);
var renderer = new THREE.WebGL1Renderer({ antialias: true });
scene.background = new THREE.Color('0x0a0a0a');
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // mengaktifkan bayangan
renderer.shadowMap.type = THREE.BasicShadowMap; // menggunakan bayangan versi basic
cam.position.z += 15;
document.body.appendChild(renderer.domElement);

var box = new THREE.BoxGeometry(1,1,1);
var boxMat2 = new THREE.MeshPhongMaterial({
    color:0xff0000,
});

var cube2 = new THREE.Mesh(box, boxMat2);
cube2.receiveShadow = true; // agar benda bisa mendapatkan bayangan
cube2.castShadow = true; // agar benda bisa membentuk bayangan
scene.add(cube2);

var plane = new THREE.PlaneGeometry(1000,1000,500,500);
var planeMaterial = new THREE.MeshLambertMaterial({
    color : 0xaaffaa,
});
var planeMesh = new THREE.Mesh(plane, planeMaterial);
planeMesh.receiveShadow = true;
planeMesh.position.set(0, -1, 0);
planeMesh.rotation.x = -Math.PI/2;
scene.add(planeMesh);

window.addEventListener('resize', function() { // auto size window
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    cam.aspect = this.window.innerWidth/this.window.innerHeight;
    cam.updateProjectionMatrix();
})

// var rectLight = new THREE.RectAreaLight(0xffffff, 1, 10, 10); //RectAreaLight
// rectLight.position.set(5, 5, 0);
// rectLight.lookAt(1, 1, 1);
// scene.add(rectLight);
// var rectLightHelper = new THREE.RectAreaLightHelper( rectLight );
// rectLight.add( rectLightHelper );

var ambient = new THREE.AmbientLight(0x404040); // Ambient Light
scene.add(ambient);

var pointLight = new THREE.PointLight(0xff0000,0.5,50); //Point Light
pointLight.position.set(2,2,2);
scene.add(pointLight);
scene.add(new THREE.PointLightHelper(pointLight,0.2,0x00ff00));

// var hemi = new THREE.HemisphereLight(0x0000ff, 0x000000, 0,5); // HemiSphere Light
// scene.add(hemi);

// var directionalLight = new THREE.DirectionalLight(0x00ff00, 0.5); // Directional Light
// directionalLight.position.set(2,2,0);
// directionalLight.target.position.set(3,2,0);
// directionalLight.target.updateMatrixWorld();
// scene.add(directionalLight);
// scene.add(new THREE.DirectionalLightHelper(directionalLight));

var spotlight = new THREE.SpotLight(0x0000ff, 0.5, 5, Math.PI/10,); // SpotLight
spotlight.position.set(2,2,0);
// spotlight.target.position.set(2,3,0);
// spotlight.target.updateMatrixWorld();
spotlight.castShadow = true;
scene.add(spotlight);
scene.add(new THREE.SpotLightHelper(spotlight));

function draw() {
    cube2.rotation.x += 0.01;
    cube2.rotation.z += 0.01;

    renderer.render(scene,cam);
    requestAnimationFrame(draw);
}

draw();

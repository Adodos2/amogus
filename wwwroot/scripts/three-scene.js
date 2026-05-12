import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

function init() {
    const container = document.getElementById('canvas-3d');
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Σχήμα 1: Κύβος (Box)
    const geometry1 = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material1 = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry1, material1);
    scene.add(cube);

    // Σχήμα 2: Torus (Δαχτυλίδι)
    const geometry2 = new THREE.TorusGeometry(0.8, 0.3, 16, 100);
    const material2 = new THREE.MeshStandardMaterial({ color: 0xff6347 });
    const torus = new THREE.Mesh(geometry2, material2);
    torus.position.x = 2.5; // Το βάζουμε δίπλα από τον κύβο
    scene.add(torus);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 15);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 6;

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        torus.rotation.y += 0.02;
        renderer.render(scene, camera);
    }

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate();
}

init();
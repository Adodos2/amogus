import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const container = document.getElementById('canvas-3d');
if (container) {
    // 1. Διάβασμα του χρώματος από το Umbraco (αν δεν υπάρχει, default ένα ασημί/χρυσό)
    const umbracoColor = container.getAttribute('data-color') || '#3498db';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / 400, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, 400);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. Δημιουργία METALLIC Υλικού
    // Το metalness: 0.9 κάνει το αντικείμενο σχεδόν καθαρό μέταλλο
    // Το roughness: 0.2 το κάνει λείο και γυαλιστερό (αντανακλαστικό)
    const metallicMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(umbracoColor),
        metalness: 0.9,
        roughness: 0.15,
        roughnessMap: null // Μπορεί να μπει texture για brushed metal αργότερα
    });

    // Σχήμα 1: Κύβος (Metallic)
    const geometry1 = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const cube = new THREE.Mesh(geometry1, metallicMaterial);
    cube.position.x = -1;
    scene.add(cube);

    // Σχήμα 2: Σφαίρα (Metallic Chrome/Gold ανάλογα το χρώμα)
    const geometry2 = new THREE.SphereGeometry(0.8, 64, 64); // 64 για να είναι απόλυτα λεία
    const sphere = new THREE.Mesh(geometry2, metallicMaterial);
    sphere.position.x = 1.2;
    scene.add(sphere);

    // 3. ΦΩΤΙΣΜΟΣ (Κρίσιμος για να φανεί το μέταλλο!)
    // Χρειαζόμαστε έντονα κατευθυντικά φώτα για να δημιουργηθούν "λάμψεις" (highlights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Μαλακός γενικός φωτισμός
    scene.add(ambientLight);

    // Κύριο Φως (Key Light) - Λευκό και δυνατό
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    // Φως Συμπλήρωσης (Fill Light) - Από την άλλη πλευρά για να σπάει τις βαριές σκιές
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    // Φως Σημείου (Point Light) για extra γυαλάδα καθώς περιστρέφονται
    const rimLight = new THREE.PointLight(0xffffff, 1, 10);
    rimLight.position.set(0, 0, 2);
    scene.add(rimLight);

    camera.position.z = 4;

    // 4. Animation με περιστροφή
    function animate() {
        requestAnimationFrame(animate);
        
        // Περιστροφή για να παίζει το φως πάνω στις μεταλλικές επιφάνειες
        cube.rotation.x += 0.008;
        cube.rotation.y += 0.01;
        
        sphere.rotation.y += 0.005;
        sphere.rotation.z += 0.005;
        
        renderer.render(scene, camera);
    }

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / 400;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, 400);
    });

    animate();
}
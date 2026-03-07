document.addEventListener('DOMContentLoaded', () => {


    const menuIcon = document.querySelector('#menu-icon');
    const hamburger = document.querySelector('#menu-icon .hamburger');
    const closeIcon = document.querySelector('#menu-icon .close');
    const navbar = document.querySelector('.navbar');

    const toggleMenu = () => {
        navbar.classList.toggle('active');
        const isActive = navbar.classList.contains('active');
        hamburger.style.display = isActive ? 'none' : 'block';
        closeIcon.style.display = isActive ? 'block' : 'none';
    };

    const closeMenu = () => {
        navbar.classList.remove('active');
        hamburger.style.display = 'block';
        closeIcon.style.display = 'none';
    }

    menuIcon.onclick = toggleMenu;


    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const header = document.querySelector('.header');

    window.onscroll = () => {

        header.classList.toggle('sticky', window.scrollY > 100);


        let currentSectionId = '';
        sections.forEach(sec => {
            const top = window.scrollY;
            const offset = sec.offsetTop - 150;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                currentSectionId = id;
            };
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href').substring(1);
            if (linkHref === currentSectionId) {
                link.classList.add('active');
            }
        });


        if (navbar.classList.contains('active')) {
            closeMenu();
        }
    };


    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navbar.classList.contains('active')) {
                closeMenu();
            }
        });
    });



    if (document.querySelector('.multiple-text')) {
        const typed = new Typed('.multiple-text', {
            strings: ['Frontend Developer', 'Programmer'],
            typeSpeed: 70,
            backSpeed: 70,
            backDelay: 1000,
            loop: true
        });
    }


    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }

        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach((el) => observer.observe(el));

});

document.getElementById('yr').textContent = new Date().getFullYear();
// ...existing code...

// Contact Form JS (standard submission with UI feedback)
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            // We DO NOT prevent default here so it actually posts to formsubmit!
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();
            const status = document.getElementById('form-status');

            if (!name || !email || !message) {
                e.preventDefault(); // Stop submission if empty
                if (status) {
                    status.textContent = 'Please fill in all fields.';
                    status.style.color = '#e94436';
                }
                return;
            }
            
            // Show sending text while the browser redirects
            if (status) {
                status.textContent = 'Sending message...';
                status.style.color = '#109D58';
            }
        });
    }
});

// --- Three.js Contact Form Animation ---
document.addEventListener('DOMContentLoaded', () => {
    const canvasContainer = document.getElementById('three-bg');
    if (!canvasContainer) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    camera.position.z = 30;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    renderer.domElement.style.zIndex = 1;
    renderer.domElement.style.pointerEvents = 'none'; // so we can click the form underneath
    canvasContainer.appendChild(renderer.domElement);

    // Particles Geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;

    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100; // Spread particles in a 100x100x100 cube
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Particles Material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        color: 0x00eeee, // Cyan main color
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    // Mouse Interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        });
    }

    // Resize handler
    window.addEventListener('resize', () => {
        if (!canvasContainer || canvasContainer.clientWidth === 0) return;
        camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    });

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Base slow rotation
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;

        // Interactive Parallax effect
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        particlesMesh.rotation.y += 0.5 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.5 * (targetY - particlesMesh.rotation.x);

        renderer.render(scene, camera);
    };

    animate();
});

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
 document.addEventListener('DOMContentLoaded', function() {
            // Modo oscuro
            const darkModeToggle = document.querySelector('.dark-mode-toggle');
            if (darkModeToggle) {
                darkModeToggle.addEventListener('click', toggleDarkMode);
                
                // Verificar preferencia del usuario
                if (localStorage.getItem('darkMode') === 'enabled') {
                    document.body.classList.add('dark-mode');
                }
            }
            
            // Botón volver arriba
            const backToTopButton = document.querySelector('.back-to-top');
            if (backToTopButton) {
                window.addEventListener('scroll', toggleBackToTopButton);
                backToTopButton.addEventListener('click', scrollToTop);
            }
            
            // Suscripción al newsletter
            const newsletterForm = document.querySelector('.newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', handleNewsletterSubmit);
            }
            
            // Suscripción en el sidebar
            const subscribeForm = document.querySelector('.subscribe-form');
            if (subscribeForm) {
                subscribeForm.addEventListener('submit', handleNewsletterSubmit);
            }
            
            // Efecto hover en tarjetas de noticias
            const newsCards = document.querySelectorAll('.news-card');
            newsCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                });
            });
        });

        // Funciones
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            
            // Guardar preferencia
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        }

        function toggleBackToTopButton() {
            const backToTopButton = document.querySelector('.back-to-top');
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }

        function scrollToTop(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        function handleNewsletterSubmit(e) {
            e.preventDefault();
            const emailInput = e.target.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                // En una implementación real, aquí se enviaría el email al servidor
                alert('¡Gracias por suscribirte a nuestro boletín científico!');
                emailInput.value = '';
            } else {
                alert('Por favor, introduce un correo electrónico válido.');
            }
        }

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
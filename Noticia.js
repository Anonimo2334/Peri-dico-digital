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
            
            // Comentarios
            const commentForm = document.querySelector('.comment-form form');
            if (commentForm) {
                commentForm.addEventListener('submit', handleCommentSubmit);
            }
        });
        
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
                alert('¡Gracias por suscribirte a nuestro boletín científico!');
                emailInput.value = '';
            } else {
                alert('Por favor, introduce un correo electrónico válido.');
            }
        }
        
        function handleCommentSubmit(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const commentText = document.getElementById('comment').value;
            
            if (name && commentText) {
                // Crear nuevo comentario
                const commentsList = document.querySelector('.comments-list');
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `
                    <div class="comment-avatar">${name.charAt(0)}</div>
                    <div class="comment-content">
                        <div class="comment-header">
                            <div class="comment-author">${name}</div>
                            <div class="comment-date">Ahora mismo</div>
                        </div>
                        <div class="comment-text">
                            ${commentText}
                        </div>
                        <div class="comment-actions">
                            <a href="#" class="comment-action"><i class="fas fa-reply"></i> Responder</a>
                            <a href="#" class="comment-action"><i class="fas fa-thumbs-up"></i> 0</a>
                        </div>
                    </div>
                `;
                
                commentsList.prepend(newComment);
                
                // Resetear formulario
                e.target.reset();
                
                alert('Comentario publicado con éxito');
            }
        }
        
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
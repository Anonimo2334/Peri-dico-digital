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
    
    // Menú móvil
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Cargar noticias dinámicamente (simulación)
    loadNews();
    
    // Suscripción al newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Footer newsletter
    const footerNewsletter = document.querySelector('.footer-newsletter');
    if (footerNewsletter) {
        footerNewsletter.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Mostrar anuncio de cookies si no se ha aceptado
    if (!localStorage.getItem('cookiesAccepted')) {
        showCookieConsent();
    }
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

function toggleMobileMenu() {
    const mobileMenuContent = document.querySelector('.mobile-menu-content');
    mobileMenuContent.classList.toggle('active');
}

function loadNews() {
    // En una implementación real, aquí se haría una petición AJAX o Fetch
    // para cargar noticias desde una API
    
    // Simulación de carga de noticias populares
    const popularNews = [
        {title: "Famoso actor confirma su retirada del cine", category: "entertainment", views: "245K"},
        {title: "Nuevo récord mundial en los 100 metros lisos", category: "sports", views: "198K"},
        {title: "Descubren una nueva especie marina en el Pacífico", category: "science", views: "176K"},
        {title: "El precio de la vivienda sube un 5% este trimestre", category: "economy", views: "154K"}
    ];
    
    const popularGrid = document.querySelector('.popular-grid');
    if (popularGrid) {
        popularGrid.innerHTML = '';
        
        popularNews.forEach((news, index) => {
            const newsItem = document.createElement('article');
            newsItem.className = 'popular-item';
            newsItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="popular-content">
                    <h4>${news.title}</h4>
                    <div class="meta">
                        <span class="category ${news.category}">${getCategoryName(news.category)}</span>
                        <span class="views">${news.views} vistas</span>
                    </div>
                </div>
            `;
            popularGrid.appendChild(newsItem);
        });
    }
}

function getCategoryName(category) {
    const categories = {
        'entertainment': 'Entretenimiento',
        'sports': 'Deportes',
        'science': 'Ciencia',
        'economy': 'Economía',
        'politics': 'Política'
    };
    
    return categories[category] || category;
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (validateEmail(email)) {
        // En una implementación real, aquí se enviaría el email al servidor
        alert('¡Gracias por suscribirte a nuestro boletín!');
        emailInput.value = '';
    } else {
        alert('Por favor, introduce un correo electrónico válido.');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showCookieConsent() {
    const cookieConsent = document.createElement('div');
    cookieConsent.className = 'cookie-consent';
    cookieConsent.innerHTML = `
        <div class="cookie-content">
            <p>Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Al continuar navegando, aceptas nuestro uso de cookies.</p>
            <div class="cookie-buttons">
                <button class="cookie-accept">Aceptar</button>
                <button class="cookie-more">Más información</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(cookieConsent);
    
    const acceptButton = cookieConsent.querySelector('.cookie-accept');
    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.remove();
    });
    
    const moreButton = cookieConsent.querySelector('.cookie-more');
    moreButton.addEventListener('click', () => {
        window.location.href = 'politica-cookies.html';
    });
}

// Simulación de noticias en tiempo real
setInterval(() => {
    const breakingBadge = document.querySelector('.badge.breaking');
    if (breakingBadge) {
        breakingBadge.classList.toggle('pulse');
    }
}, 2000);
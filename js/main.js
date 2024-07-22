document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const backToTopBtn = document.querySelector('.back-to-top');
    const languageToggle = document.getElementById('language-toggle');

    // Función para establecer el idioma
    function setLanguage(lang) {
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Enviar mensaje a todos los iframes para actualizar su contenido
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            iframe.contentWindow.postMessage({ lang: lang, translations: translations[lang] }, '*');
        });
    }

    // Leer el idioma seleccionado del localStorage o establecer por defecto
    let selectedLanguage = localStorage.getItem('language');
    if (!selectedLanguage) {
        selectedLanguage = languageToggle.checked ? 'en' : 'es';
        localStorage.setItem('language', selectedLanguage);
    }
    setLanguage(selectedLanguage);
    languageToggle.checked = selectedLanguage === 'en';

    // Manejar el cambio de idioma
    languageToggle.addEventListener('change', function() {
        const lang = this.checked ? 'en' : 'es';
        localStorage.setItem('language', lang);
        setLanguage(lang);
    });

    function setActiveLink(sectionId) {
        links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
    }

    // Manejar clics en los enlaces de navegación
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
            setActiveLink(sectionId);
        });
    });

    // Manejar el scroll y cambiar el enlace activo y visibilidad del botón back-to-top
    window.addEventListener('scroll', function() {
        let currentSectionId;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - window.innerHeight / 2;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });
        if (currentSectionId) {
            setActiveLink(currentSectionId);
        }

        // Mostrar u ocultar el botón "back-to-top"
        if (window.scrollY > window.innerHeight) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Escuchar mensajes del iframe
    window.addEventListener('message', function(event) {
        if (event.data === 'scrollToContact') {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

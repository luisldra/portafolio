document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function setActiveLink(sectionId) {
        links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-section') === sectionId);
        });
    }

    // Manejar clics en los enlaces de navegación
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
            setActiveLink(sectionId);
        });
    });

    // Manejar el scroll y cambiar el enlace activo
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
    });
});

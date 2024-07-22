document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const level = card.getAttribute('data-level');
        const levelContainer = card.querySelector('.level');
        const levelCircles = getLevelCircles(level);

        levelCircles.forEach(circle => {
            const div = document.createElement('div');
            div.classList.add(circle);
            levelContainer.appendChild(div);
        });
    });

    function getLevelCircles(level) {
        let circles = [];
        switch(level) {
            case 'basico':
                circles = ['basico', 'basico', 'empty', 'empty', 'empty'];
                break;
            case 'intermedio':
                circles = ['intermedio', 'intermedio', 'intermedio', 'empty', 'empty'];
                break;
            case 'bueno':
                circles = ['bueno', 'bueno', 'bueno', 'bueno', 'empty'];
                break;
            case 'excelente':
                circles = ['excelente', 'excelente', 'excelente', 'excelente', 'excelente'];
                break;
        }
        return circles;
    }
});

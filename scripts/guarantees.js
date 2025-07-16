document.addEventListener('DOMContentLoaded', function() {
    const guaranteeItems = document.querySelectorAll('.guarantees__item');

    guaranteeItems.forEach(item => {
        item.addEventListener('click', function() {
            guaranteeItems.forEach(el => el.classList.remove('active'));

            this.classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', (load) => {
  const scrollContainer = document.querySelector('.scroll-on-drag');

  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.classList.add('grabbing');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });

  scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.classList.remove('grabbing');
  });

  scrollContainer.addEventListener('mouseup', (e) => {
    e.preventDefault();
    isDown = false;
    scrollContainer.classList.remove('grabbing');
  });

  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = x - startX;
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
});
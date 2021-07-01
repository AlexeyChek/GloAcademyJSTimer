const smoothScroll = () => {
  document.addEventListener('click', event => {
    const target = event.target.closest('a[href^="#"');
    if (target) {
      if (!target.classList.contains('close-btn') && !target.classList.contains('portfolio-btn')) {
        event.preventDefault();
        const href = target.getAttribute('href').substring(1);
        const position = document.getElementById(href).getBoundingClientRect().top;
        window.scrollBy({
          top: position,
          behavior: 'smooth',
        });
      }
    }
  });
};

export default smoothScroll;

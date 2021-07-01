const togglePopup = () => {
  const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn'),
    popupContent = document.querySelector('.popup-content');
  popup.style.transition = 'all 1s ease';

  let position = -100;
  let rgba = 0;
  let animateId;

  const popupAnimate = () => {
    animateId = requestAnimationFrame(popupAnimate);
    position += 3;
    rgba += 0.01;
    if (position < 0) {
      popupContent.style.transform = 'translateX(' + position + '%)';
    }
    if (rgba < 0.5) {
      popup.style.backgroundColor = 'rgba(0, 0, 0, ' + rgba + ')';
    }
    if (rgba >= 0.5 && position >= 0) {
      cancelAnimationFrame(animateId);
      position = -100;
      rgba = 0;
    }
  };

  popupBtn.forEach(elem => {
    elem.addEventListener('click', () => {
      popup.style.display = 'block';
      if (document.documentElement.clientWidth > 768) {
        popup.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        popupContent.style.transform = `translateX(${position}%)`;
        popupAnimate();
      }
    });
  });

  const closePopup = () => { popup.style.display = 'none'; };

  popup.addEventListener('click', event => {
    let target = event.target;
    if (target.classList.contains('popup-close')) {
      closePopup();
    } else {
      target = target.closest('.popup-content');
      if (!target) {
        closePopup();
      }
    }
  });
};

export default togglePopup;

'use strict';

// Таймер
const counTimer = deadLine => {
  const timerDays = document.getElementById('timer-days'),
    timerHours = document.getElementById('timer-hours'),
    timerMinutes = document.getElementById('timer-minutes'),
    timerSeconds = document.getElementById('timer-seconds'),
    dateStop = new Date(deadLine).getTime();

  const getTimeRemaining = () => {
    const dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor((timeRemaining / 60 / 60) % 24),
      days = Math.floor(timeRemaining / 60 / 60 / 24);
    return { timeRemaining, days, hours, minutes, seconds };
  };

  const updateClock = () => {
    const timer = getTimeRemaining();
    if (timer.timeRemaining > 0) {
      timerDays.textContent = timer.days < 10 ? '0' + timer.days : timer.days;
      timerHours.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours;
      timerMinutes.textContent = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
      timerSeconds.textContent = timer.seconds < 10 ? '0' + timer.seconds : timer.seconds;
    } else {
      timerDays.textContent = '0';
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
      clearInterval(intervalId);
    }
  };
  updateClock();
  const intervalId = setInterval(updateClock, 1000);
};

counTimer('19 july 2021 22:00:00');

// Меню
const toggleMenu = () => {
  const btnMenu = document.querySelector('.menu'),
    menu = document.querySelector('menu'),
    closeBtn = document.querySelector('.close-btn'),
    menuItems = menu.querySelectorAll('ul>li');

  const handlerMenu = () => menu.classList.toggle('active-menu');

  btnMenu.addEventListener('click', handlerMenu);
  closeBtn.addEventListener('click', handlerMenu);
  menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
};

toggleMenu();

// popup
const togglePopup = () => {
  const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn'),
    popupClose = document.querySelector('.popup-close'),
    popupContent = document.querySelector('.popup-content');

  const popupAnimate = () => {
    let position = -400;
    let rgba = 0;
    const timerContent = setInterval(() => {
      position += 2;
      popupContent.style.transform = 'translate(' + position + '%)';
      if (position >= 0) {
        popup.style.transform = 'translate(0)';
        clearInterval(timerContent);
      }
    }, 1);
    const timerOverlay = setInterval(() => {
      rgba += 0.003;
      popup.style.backgroundColor = 'rgba(0, 0, 0, ' + rgba + ')';
      if (rgba >= 0.5) clearInterval(timerOverlay);
    }, 1);
  };

  popupBtn.forEach(elem => {
    elem.addEventListener('click', () => {
      popup.style.display = 'block';
      if (document.documentElement.clientWidth > 768) {
        popup.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        popupContent.style.transform = 'translate(-400%)';
        popupAnimate();
      }
    });
  });

  popupClose.addEventListener('click', () => {
    popup.style.display = 'none';
  });
};

togglePopup();

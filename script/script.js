'use strict';

// Timer
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

// Menu
const toggleMenu = () => {
  const btnMenu = document.querySelector('.menu'),
    menu = document.querySelector('menu'),
    closeBtn = document.querySelector('.close-btn'),
    menuItems = menu.querySelectorAll('ul>li');

  const handlerMenu = () => menu.classList.toggle('active-menu');

  btnMenu.addEventListener('click', handlerMenu);

  menu.addEventListener('click', event => {
    let target = event.target;
    if (target.classList.contains('close-btn')) {
      handlerMenu();
    } else {
      target = target.closest('li');
      if (target) {
        handlerMenu();
      }
    }
  });

  // closeBtn.addEventListener('click', handlerMenu);
  // menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
};
toggleMenu();

// popup
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
togglePopup();

// tabs
const tabs = () => {
  const tabHeader = document.querySelector('.service-header'),
    tab = document.querySelectorAll('.service-header-tab'),
    tabContent = document.querySelectorAll('.service-tab');

  const toggleTabContent = index => {
    for (let i = 0; i < tabContent.length; i++) {
      if (index === i) {
        tabContent[i].classList.remove('d-none');
        tab[i].classList.add('active');
      } else {
        tabContent[i].classList.add('d-none');
        tab[i].classList.remove('active');
      }
    }
  };

  tabHeader.addEventListener('click', event => {
    let target = event.target;
    target = target.closest('.service-header-tab');
    if (target) {
      tab.forEach((item, i) => {
        if (item === target) {
          toggleTabContent(i);
        }
      });
    }
  });
};
tabs();

// slider
const slider = () => {
  const slide = document.querySelectorAll('.portfolio-item'),
    dots = document.querySelector('.portfolio-dots'),
    slider = document.querySelector('.portfolio-content');

  let currentSlide = 0;
  let interval;

  const addDots = len => {
    for (let i = 0; i < len; i++) {
      dots.insertAdjacentHTML('beforeend', '<li class="dot"></li>');
    }
  };

  addDots(slide.length);

  const dot = dots.querySelectorAll('.dot');

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };
  
  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };
  
  
  const autoPlaySlide = () => {
    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');
    currentSlide++;
    if (currentSlide >= slide.length) currentSlide = 0;
    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');
  };
  
  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };
  
  const stopSlide = () => {
    clearInterval(interval);
  };
  
  slider.addEventListener('click', event => {
    event.preventDefault();
    
    const target = event.target;
    
    if (!target.matches('#arrow-right, #arrow-left, .dot')) return;
    
    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');
    
    if (target.matches('#arrow-right')) {
      currentSlide++;
    } else if (target.matches('#arrow-left')) {
      currentSlide--;
    } else if (target.matches('.dot')) {
      dot.forEach((elem, index) => {
        if (elem === target) {
          currentSlide = index;
        }
      });
    }
    if (currentSlide >= slide.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slide.length - 1;
    
    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');
  });
  
  slider.addEventListener('mouseover', event => {
    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
      stopSlide();
    }
  });
  
  slider.addEventListener('mouseout', event => {
    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
      startSlide();
    }
  });
  
  nextSlide(dot, currentSlide, 'dot-active');
  startSlide();
};
slider();

// command
const command = () => {
  const command = document.querySelector('.command');

  const changeImage = (elem) =>{
    const image = elem.src;
    elem.src = elem.dataset.img;
    elem.dataset.img = image;
  };

  command.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (target.closest('img')) changeImage(target);
  });

  command.addEventListener('mouseout', (e) => {
    const target = e.target;
    if (target.closest('img')) changeImage(target);
  });
};
command();

// calc
const calc = (price = 100) => {
  const calc = document.querySelector('.calc'),
    calcType = calc.querySelector('.calc-type'),
    calcSquare = calc.querySelector('.calc-square'),
    calcDay = calc.querySelector('.calc-day'),
    calcCount = calc.querySelector('.calc-count'),
    calcTotal = calc.querySelector('#total');
  let interval;

  const totalSum = () => {
    let total = 0;
    let countValue = 1;
    let dayValue = 1;
    const typeValue = calcType.options[calcType.selectedIndex].value;
    if (typeValue === '') {
      calcSquare.value = '';
      calcDay.value = '';
      calcCount.value = '';
      return 0;
    }
    const squareValue = +calcSquare.value;

    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
    } else {
      total = 0;
    }

    return Math.floor(total);
  };

  const setTotal = (sum) => {
    clearInterval(interval);
    let total = +calcTotal.textContent;
    let step = (sum - total) / 500;
    if (total < sum) {
      interval = setInterval(() => {
        total += step;
        calcTotal.textContent = Math.floor(total);
        if (total > sum) {
          clearInterval(interval);
          calcTotal.textContent = sum;
        }
      }, 1);
    } else if (total > sum) {
      interval = setInterval(() => {
        total += step;
        calcTotal.textContent = Math.floor(total);
        if (total < sum) {
          clearInterval(interval);
          calcTotal.textContent = sum;
        }
      }, 1);
    }
  };

  calc.addEventListener('change', (e) => {
    const target = e.target;
    if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
      setTotal(totalSum());
    }
  });

  const validate = (elem) => {
    elem.value = elem.value.replace(/\D/g, '');
  };

  calc.addEventListener('input', (e) => {
    const target = e.target;
    if (target.closest('input')) {
      validate(target);
    }
  });
};
calc();

// connect
const connect = () => {
  const connect = document.querySelector('.connect');

  const validateCyrillic = (elem) => {
    elem.value = elem.value.replace(/[^а-я -]/gi, '');
  };

  const validateEmail = (elem) => {
    elem.value = elem.value.replace(/[^a-z\_@\.!~\*'-]/gi, '');
  };
  const validatePhone = (elem) => {
    elem.value = elem.value.replace(/[^0-9()-]/gi, '');
  };

  const validateEnd = (elem) => {
    elem.value = elem.value.trim();
    elem.value = elem.value.replace(/-+/g, '-');
    elem.value = elem.value.replace(/ +/g, ' ');
    elem.value = elem.value.replace(/^-/, '');
    elem.value = elem.value.replace(/-$/, '');
    if (elem.name === 'user_name') {
      let text = elem.value.split(' ');
      text.forEach((item, i) => {
        text[i] = item[0].toUpperCase() + item.slice(1);
      });
      elem.value = text.join(' ');
    }
  };

  connect.addEventListener('input', (e) => {
    if (e.target.name === 'user_name' || e.target.name === 'user_message') validateCyrillic(e.target);
    if (e.target.name === 'user_email') validateEmail(e.target);
    if (e.target.name === 'user_phone') validatePhone(e.target);
  });

  connect.addEventListener('blur', (e) => {
    if (e.target.closest('input')) validateEnd(e.target);
  }, true);
};
connect(100);

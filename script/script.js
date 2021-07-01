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
    menu = document.querySelector('menu');

  const handlerMenu = () => menu.classList.toggle('active-menu');

  document.addEventListener('click', event => {
    const target = event.target;
    if (!target.closest('menu') && !target.closest('.menu') && menu.classList.contains('active-menu')) {
      handlerMenu();
    }
  });

  btnMenu.addEventListener('click', () => handlerMenu());

  menu.addEventListener('click', event => {
    let target = event.target;
    if (target.classList.contains('close-btn')) {
      handlerMenu();
    } else {
      target = target.closest('a');
      if (target) {
        handlerMenu();
      }
    }
  });
};
toggleMenu();

// smoothScroll
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
smoothScroll();

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

  const changeImage = elem => {
    const image = elem.src;
    elem.src = elem.dataset.img;
    elem.dataset.img = image;
  };

  command.addEventListener('mouseover', e => {
    const target = e.target;
    if (target.closest('img')) changeImage(target);
  });

  command.addEventListener('mouseout', e => {
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
  let animateId;

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

  const setTotal = sum => {
    cancelAnimationFrame(animateId);
    let total = +calcTotal.textContent;
    const step = (sum - total) / 60;

    const animate = () => {
      calcTotal.textContent = Math.floor(total);
      if (step > 0 && total >= sum) {
        calcTotal.textContent = sum;
        cancelAnimationFrame(animateId);
      } else if (step < 0 && total <= sum) {
        calcTotal.textContent = sum;
        cancelAnimationFrame(animateId);
      } else {
        requestAnimationFrame(animate);
      }
      total += step;
    };

    if (sum !== total) animateId = requestAnimationFrame(animate);
  };

  calc.addEventListener('change', e => {
    const target = e.target;
    if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
      setTotal(totalSum());
    }
  });

  const validate = elem => {
    elem.value = elem.value.replace(/\D/g, '');
  };

  calc.addEventListener('input', e => {
    const target = e.target;
    if (target.closest('input')) {
      validate(target);
    }
  });
};
calc();

// validate
const validate = elem => {

  elem.querySelectorAll('input').forEach(item => {
    item.removeAttribute('required');
  });

  const validateCyrillic = elem => {
    // elem.value = elem.value.replace(/[^а-я -]/gi, '');
    elem.value = elem.value.replace(/[^а-я ]/gi, '');
  };

  const validateMassage = elem => {
    elem.value = elem.value.replace(/[^а-я0-9 .,!?:;]/gi, '');
  };

  const validateEmail = elem => {
    elem.value = elem.value.replace(/[^a-z\_@\.!~\*'-]/gi, '');
  };
  const validatePhone = elem => {
    // elem.value = elem.value.replace(/[^0-9()-]/gi, '');
    elem.value = elem.value.replace(/[^+0-9]/, '');
    if (elem.value.length > 12) elem.value = elem.value.substring(0, 12);
  };

  const getValidError = (elem, text) => {
    const parent = elem.parentNode;
    parent.style.cssText = 'position: relative;';
    const validError = parent.querySelector('.error') || document.createElement('div');
    validError.className = 'error';
    validError.textContent = text;
    parent.insertAdjacentElement('beforeend', validError);
    validError.style.cssText = `position: absolute;
    color: #fff;
    background-color: tomato;
    padding: 3px 10px;
    font-size: 1em;
    border-radius: 19px;`;
    validError.style.left = `${elem.offsetLeft + ((elem.offsetWidth - validError.offsetWidth) / 2)}px`;
    validError.style.top = `${elem.offsetTop - ((document.documentElement.clientWidth > 991 && elem.closest('#form1')) ? 57 : 17)}px`;
  };

  const removeValidError = () => {
    const parent = elem.parentNode;
    const error = parent.querySelector('.error');
    if (error) error.remove();
  };

  const validateEnd = elem => {
    elem.value = elem.value.trim();
    elem.value = elem.value.replace(/-+/g, '-');
    elem.value = elem.value.replace(/ +/g, ' ');
    elem.value = elem.value.replace(/^-/, '');
    elem.value = elem.value.replace(/-$/, '');
    if (elem.name === 'user_name') {
      if (!/[а-я]{2,}/.test(elem.value.trim())) {
        getValidError(elem, 'минимум 2 буквы');
      } else {
        removeValidError(elem);
        const text = elem.value.split(' ');
        text.forEach((item, i) => {
          text[i] = item[0].toUpperCase() + item.slice(1);
        });
        elem.value = text.join(' ');
      }
    }
    if (elem.name === 'user_email') {
      if (!/^[^@]{2,}@[^@]{2,}\.\w{2,}/.test(elem.value.trim())) {
        getValidError(elem, 'неверный e.mail');
      } else {
        removeValidError(elem);
      }
    }
    if (elem.name === 'user_phone') {
      if (!/^\+?([0-9]){6,13}$/.test(elem.value.trim())) {
        getValidError(elem, 'неверный номер');
      } else {
        removeValidError(elem);
      }
    }
  };

  elem.addEventListener('input', e => {
    const target = e.target;
    if (target.name === 'user_name') {
      validateCyrillic(target);
    }
    if (target.name === 'user_message') {
      validateMassage(target);
    }
    if (target.name === 'user_email') {
      validateEmail(target);
    }
    if (target.name === 'user_phone') {
      validatePhone(target);
    }
  });

  elem.addEventListener('blur', e => {
    if (e.target.closest('input')) validateEnd(e.target);
  }, true);
};

// send-ajax-form
const sendForms = () => {
  const preload = () => {
    const preloader = document.createElement('div');
    const bounce1 = document.createElement('div');
    const bounce2 = document.createElement('div');
    const bounce3 = document.createElement('div');
    preloader.insertAdjacentElement('beforeend', bounce1);
    preloader.insertAdjacentElement('beforeend', bounce2);
    preloader.insertAdjacentElement('beforeend', bounce3);

    preloader.style.cssText = 'display: flex; justify-content: center;';

    const speed = 60;
    let count1 = 0;
    let count2 = speed / 3;
    let count3 = speed * 2 / 3;
    let way1 = 1;
    let way2 = 1;
    let way3 = 1;
    const animate = () => {
      count1 += way1;
      if (count1 >= speed) way1 = -1;
      if (count1 <= 0) way1 = 1;
      count2 += way2;
      if (count2 >= speed) way2 = -1;
      if (count2 <= 0) way2 = 1;
      count3 += way3;
      if (count3 >= speed) way3 = -1;
      if (count3 <= 0) way3 = 1;
      bounce1.style.cssText = `width: 20px;
        height: 20px;
        border-radius: 100px;
        background-color: rgb(25, 181, 254);
        margin-right: 5px;
        transform: scale(${count1 / speed});`;
      bounce2.style.cssText = `width: 20px;
        height: 20px;
        border-radius: 100px;
        background-color: rgb(25, 181, 254);
        margin-right: 5px;
        transform: scale(${count2 / speed});`;
      bounce3.style.cssText = `width: 20px;
        height: 20px;
        border-radius: 100px;
        background-color: rgb(25, 181, 254);
        transform: scale(${count3  / speed});`;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    return preloader;
  };

  const errorMessage = 'Что-то пошло не так...',
    successMesage = 'Спасибо! Мы скоро с вами свяжемся!',
    formErrorMessage = 'Заполните все поля!';

  const form1 = document.getElementById('form1');
  const form2 = document.getElementById('form2');
  const form3 = document.getElementById('form3');

  validate(form1);
  validate(form2);
  validate(form3);

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem; color: #fff';

  const delMessage = () => {
    setTimeout(() => {
      statusMessage.remove();
      statusMessage.textContent = '';
    }, 3000);
  };

  const validForm = form => {
    let result = true;
    form.querySelectorAll('input').forEach(elem => {
      if (elem.name === 'user_name' || elem.name === 'user_email' || elem.name === 'user_phone') {
        if (elem.value.length === 0) result = false;
      }
    });
    return result;
  };

  const postData = body => fetch('./server.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const sendForm = form => {
    form.appendChild(statusMessage);
    if (!validForm(form)) {
      statusMessage.textContent = formErrorMessage;
    } else {
      statusMessage.textContent = '';
      statusMessage.insertAdjacentElement('beforeend', preload());
      const formData = new FormData(form);
      const body = {};

      // for (let val of formData.entries()) {
      //   body[val[0]] = val[1];
      // }

      formData.forEach((val, key) => {
        body[key] = val;
      });
      postData(body).then(response => {
        if (response.status !== 200) {
          throw new Error('status network not 200');
        }
        statusMessage.textContent = successMesage;
        delMessage();
      }).catch(error => {
        statusMessage.textContent = errorMessage;
        console.error(error);
        delMessage();
      }).finally(form.querySelectorAll('input').forEach(input => input.value = ''));
    }
  };

  form1.addEventListener('submit', event => {
    event.preventDefault();
    sendForm(form1);
  });

  form2.addEventListener('submit', event => {
    event.preventDefault();
    sendForm(form2);
  });

  form3.addEventListener('submit', event => {
    event.preventDefault();
    sendForm(form3);
  });
};
sendForms();

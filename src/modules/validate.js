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

export default validate;

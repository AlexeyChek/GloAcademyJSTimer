import validate from './validate';


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
    setTimeout(() => {
      document.querySelector('.popup').style.display = 'none';
    }, 2000);
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

  const postData = body => fetch('./../server.php', {
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

export default sendForms;

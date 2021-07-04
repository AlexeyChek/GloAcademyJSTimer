class Validator {
  constructor({ selector, pattern = {}, method }) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter(item => (item.tagName.toLowerCase() !== 'button' &&
      item.type !== 'button'));
    this.error = new Set();
  }

  getValidResult() {
    return this.submitError;
  }

  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.chekIt.bind(this)));
    this.deleteRequired();
  }

  checkValid() {
    this.elementsForm.forEach(elem => this.chekIt({ target: elem }));
    if (this.error.size) {
      return false;
    } else {
      return true;
    }
  }

  deleteRequired() {
    this.elementsForm.forEach(elem => elem.removeAttribute('required'));
  }

  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value.trim() === '') {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };

    if (this.method) {
      const method = this.method[elem.id.split('-')[1]];

      if (method) {
        return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
      }
    } else {
      console.warn('Необходимо передать id полей ввода и методы проверки этих полей!');
    }

    return true;
  }

  chekIt(event) {
    const target = event.target;

    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  showError(elem) {
    elem.classList.add('error');
    elem.classList.remove('success');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      return;
    }
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator-error');
    elem.parentNode.classList.add('validator-parent');
    elem.insertAdjacentElement('afterend', errorDiv);
  }

  showSuccess(elem) {
    elem.classList.add('success');
    elem.classList.remove('error');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      elem.nextElementSibling.remove();
    }
  }

  applyStyle() {
    const style = document.createElement('style');
    style.textContent = `
      input.success {
        border: 2px solid green;
      }
      input.error {
        border: 2px solid red;
      }
      .validator-error {
        font-size: 12px;
        font-family: inherit;
        color: red;
        position: absolute;
        left: 50%;
        top: 0px;
        transform: translateX(-50%);
      }
      .validator-parent {
        position: relative;
      }
    `;
    document.head.appendChild(style);
  }

  setPattern() {
    if (!this.pattern.phone) this.pattern.phone = /^(\+7|8)([()-]*\d){10}$/;
    if (!this.pattern.email) this.pattern.email = /^[^@]{2,}@[^@]{2,}\.\w{2,}/;
  }
}

export default Validator;

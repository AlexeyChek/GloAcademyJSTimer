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

export default calc;

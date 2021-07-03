const toggleMenu = () => {
  // const btnMenu = document.querySelector('.menu'),
  const  menu = document.querySelector('menu');

  const handlerMenu = () => menu.classList.toggle('active-menu');

  document.addEventListener('click', event => {
    let target = event.target;
    if (!target.closest('menu') && !target.closest('.menu') && menu.classList.contains('active-menu')) {
      handlerMenu();
    }
    if (target.closest('.menu')) handlerMenu();
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

export default toggleMenu;

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

export default toggleMenu;

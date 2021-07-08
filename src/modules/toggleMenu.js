const toggleMenu = () => {
  const  menu = document.querySelector('menu');

  const handlerMenu = () => menu.classList.toggle('active-menu');

  document.addEventListener('click', event => {
    let target = event.target;
    if (!target.closest('menu') && !target.closest('.menu') && menu.classList.contains('active-menu')) {
      handlerMenu();
    } else if (target.closest('.menu')) {
      handlerMenu();
    } else if (target.classList.contains('close-btn')) {
      handlerMenu();
    } else {
      target = target.closest('a');
      if (target.closest('.active-menu')) {
        handlerMenu();
      }
    }
  });
};

export default toggleMenu;

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

export default command;

'use strict';

class SliderCarousel {
  constructor({
    main,
    wrap,
    slides,
    next,
    prev,
    infinity = false,
    position = 0,
    slidesToShow = 3,
  }) {
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.slides = [...this.wrap.querySelectorAll(slides)];
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.slidesToShow = slidesToShow;
    this.options = {
      position,
      infinity,
      widthSlide: Math.floor(100 / this.slidesToShow),
    };
  }

  init() {
    this.addGloClass();
    this.addStyle();

    if (this.prev && this.next) {
      this.controlSLider();
    } else {
      this.addArrow();
      this.controlSLider();
    }
  }

  addGloClass() {
    this.main.classList.add('glo-slider');
    this.wrap.classList.add('glo-slider__wrap');
    this.slides.forEach(item => item.classList.add('glo-slider__item'));
  }

  addStyle() {
    const style = document.createElement('style');
    style.id = 'sliderCarousel-style';
    style.textContent = `
      .glo-slider {
        overflow: hidden !important;
      }

      .glo-slider__wrap {
        display: flex !important;
        transition: transform 0.5s !important;
        will-change: transform !important;
      }

      .glo-slider__item {
        position: relative !important;
        top: 0 !important;
        left: 0 !important;
        transform: none !important;
        flex: 0 0 ${this.options.widthSlide}% !important;
        margin: auto 0 !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);
  }

  controlSLider() {
    this.next.addEventListener('click', event => {
      event.preventDefault();
      this.nextSlider();
    });
    this.prev.addEventListener('click', event => {
      event.preventDefault();
      this.prevSlider();
    });
  }

  nextSlider() {
    if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
      ++this.options.position;
      if (this.options.position > this.slides.length - this.slidesToShow) this.options.position = 0;
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }
  }

  prevSlider() {
    if (this.options.infinity || this.options.position > 0) {
      --this.options.position;
      if (this.options.position < 0) this.options.position = this.slides.length - this.slidesToShow;
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }
  }

  addArrow() {
    this.prev = document.createElement('button');
    this.next = document.createElement('button');

    this.prev.className = 'glo-slider__prev';
    this.next.className = 'glo-slider__next';

    this.prev.textContent = '<';
    this.next.textContent = '>';

    this.main.appendChild(this.prev);
    this.main.appendChild(this.next);
  }
}

export default SliderCarousel;

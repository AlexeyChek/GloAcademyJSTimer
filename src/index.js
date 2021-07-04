'use strict';

import counTimer from './modules/counTimer';
import toggleMenu from './modules/toggleMenu';
import smoothScroll from './modules/smoothScroll';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import command from './modules/command';
import calc from './modules/calc';
import Validator from './modules/validate-lesson25';
import sendForms from './modules/sendForms';

counTimer('19 july 2021 22:00:00');

toggleMenu();

smoothScroll();

togglePopup();

tabs();

slider();

command();

calc();

sendForms(Validator);

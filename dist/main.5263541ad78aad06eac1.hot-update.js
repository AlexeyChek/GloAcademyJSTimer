/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatetimer"]("main",{

/***/ "./src/modules/validate.js":
/*!*********************************!*\
  !*** ./src/modules/validate.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar validate = function validate(elem) {\n  elem.querySelectorAll('input').forEach(function (item) {\n    item.removeAttribute('required');\n  });\n\n  var validateCyrillic = function validateCyrillic(elem) {\n    elem.value = elem.value.replace(/[^а-я ]/gi, '');\n  };\n\n  var validateMassage = function validateMassage(elem) {\n    elem.value = elem.value.replace(/[^а-я0-9 .,!?:;]/gi, '');\n  };\n\n  var validateEmail = function validateEmail(elem) {\n    elem.value = elem.value.replace(/[^a-z\\_@\\.!~\\*'-]/gi, '');\n  };\n\n  var validatePhone = function validatePhone(elem) {\n    elem.value = elem.value.replace(/[^+0-9]/, '');\n    if (elem.value.length > 12) elem.value = elem.value.substring(0, 12);\n  };\n\n  var getValidError = function getValidError(elem, text) {\n    var parent = elem.parentNode;\n    parent.style.cssText = 'position: relative;';\n    var validError = parent.querySelector('.error') || document.createElement('div');\n    validError.className = 'error';\n    validError.textContent = text;\n    parent.insertAdjacentElement('beforeend', validError);\n    validError.style.cssText = \"position: absolute;\\n    color: #fff;\\n    background-color: tomato;\\n    padding: 3px 10px;\\n    font-size: 1em;\\n    border-radius: 19px;\";\n    validError.style.left = \"\".concat(elem.offsetLeft + (elem.offsetWidth - validError.offsetWidth) / 2, \"px\");\n    validError.style.top = \"\".concat(elem.offsetTop - (document.documentElement.clientWidth > 991 && elem.closest('#form1') ? 57 : 17), \"px\");\n  };\n\n  var removeValidError = function removeValidError() {\n    var parent = elem.parentNode;\n    var error = parent.querySelector('.error');\n    if (error) error.remove();\n  };\n\n  var validateEnd = function validateEnd(elem) {\n    elem.value = elem.value.trim();\n    elem.value = elem.value.replace(/-+/g, '-');\n    elem.value = elem.value.replace(/ +/g, ' ');\n    elem.value = elem.value.replace(/^-/, '');\n    elem.value = elem.value.replace(/-$/, '');\n\n    if (elem.name === 'user_name') {\n      if (!/[а-я]{2,}/.test(elem.value.trim())) {\n        getValidError(elem, 'минимум 2 буквы');\n      } else {\n        removeValidError(elem);\n        var text = elem.value.split(' ');\n        text.forEach(function (item, i) {\n          text[i] = item[0].toUpperCase() + item.slice(1);\n        });\n        elem.value = text.join(' ');\n      }\n    }\n\n    if (elem.name === 'user_email') {\n      if (!/^[^@]{2,}@[^@]{2,}\\.\\w{2,}/.test(elem.value.trim())) {\n        getValidError(elem, 'неверный e.mail');\n      } else {\n        removeValidError(elem);\n      }\n    }\n\n    if (elem.name === 'user_phone') {\n      if (!/^\\+?([0-9]){6,13}$/.test(elem.value.trim())) {\n        getValidError(elem, 'неверный номер');\n      } else {\n        removeValidError(elem);\n      }\n    }\n  };\n\n  elem.addEventListener('input', function (e) {\n    var target = e.target;\n\n    if (target.name === 'user_name') {\n      validateCyrillic(target);\n    }\n\n    if (target.name === 'user_message') {\n      validateMassage(target);\n    }\n\n    if (target.name === 'user_email') {\n      validateEmail(target);\n    }\n\n    if (target.name === 'user_phone') {\n      validatePhone(target);\n    }\n  });\n  elem.addEventListener('blur', function (e) {\n    if (e.target.closest('input')) validateEnd(e.target);\n  }, true);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);\n\n//# sourceURL=webpack://timer/./src/modules/validate.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("996388a13747c30b254a")
/******/ })();
/******/ 
/******/ }
);
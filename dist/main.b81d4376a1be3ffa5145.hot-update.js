/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatetimer"]("main",{

/***/ "./src/modules/sendForms.js":
/*!**********************************!*\
  !*** ./src/modules/sendForms.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate */ \"./src/modules/validate.js\");\n\n\nvar sendForms = function sendForms() {\n  var preload = function preload() {\n    var preloader = document.createElement('div');\n    var bounce1 = document.createElement('div');\n    var bounce2 = document.createElement('div');\n    var bounce3 = document.createElement('div');\n    preloader.insertAdjacentElement('beforeend', bounce1);\n    preloader.insertAdjacentElement('beforeend', bounce2);\n    preloader.insertAdjacentElement('beforeend', bounce3);\n    preloader.style.cssText = 'display: flex; justify-content: center;';\n    var speed = 60;\n    var count1 = 0;\n    var count2 = speed / 3;\n    var count3 = speed * 2 / 3;\n    var way1 = 1;\n    var way2 = 1;\n    var way3 = 1;\n\n    var animate = function animate() {\n      count1 += way1;\n      if (count1 >= speed) way1 = -1;\n      if (count1 <= 0) way1 = 1;\n      count2 += way2;\n      if (count2 >= speed) way2 = -1;\n      if (count2 <= 0) way2 = 1;\n      count3 += way3;\n      if (count3 >= speed) way3 = -1;\n      if (count3 <= 0) way3 = 1;\n      bounce1.style.cssText = \"width: 20px;\\n        height: 20px;\\n        border-radius: 100px;\\n        background-color: rgb(25, 181, 254);\\n        margin-right: 5px;\\n        transform: scale(\".concat(count1 / speed, \");\");\n      bounce2.style.cssText = \"width: 20px;\\n        height: 20px;\\n        border-radius: 100px;\\n        background-color: rgb(25, 181, 254);\\n        margin-right: 5px;\\n        transform: scale(\".concat(count2 / speed, \");\");\n      bounce3.style.cssText = \"width: 20px;\\n        height: 20px;\\n        border-radius: 100px;\\n        background-color: rgb(25, 181, 254);\\n        transform: scale(\".concat(count3 / speed, \");\");\n      requestAnimationFrame(animate);\n    };\n\n    requestAnimationFrame(animate);\n    return preloader;\n  };\n\n  var errorMessage = 'Что-то пошло не так...',\n      successMesage = 'Спасибо! Мы скоро с вами свяжемся!',\n      formErrorMessage = 'Заполните все поля!';\n  var form1 = document.getElementById('form1');\n  var form2 = document.getElementById('form2');\n  var form3 = document.getElementById('form3');\n  (0,_validate__WEBPACK_IMPORTED_MODULE_0__.default)(form1);\n  (0,_validate__WEBPACK_IMPORTED_MODULE_0__.default)(form2);\n  (0,_validate__WEBPACK_IMPORTED_MODULE_0__.default)(form3);\n  var statusMessage = document.createElement('div');\n  statusMessage.style.cssText = 'font-size: 2rem; color: #fff';\n\n  var delMessage = function delMessage() {\n    setTimeout(function () {\n      statusMessage.remove();\n      statusMessage.textContent = '';\n    }, 3000);\n    setTimeout(function () {\n      document.querySelector('.popup').style.display = 'none';\n    }, 2000);\n  };\n\n  var validForm = function validForm(form) {\n    var result = true;\n    form.querySelectorAll('input').forEach(function (elem) {\n      if (elem.name === 'user_name' || elem.name === 'user_email' || elem.name === 'user_phone') {\n        if (elem.value.length === 0) {\n          result = false;\n        }\n\n        if (elem.parentNode.querySelector('.error')) {\n          result = false;\n        }\n      }\n    });\n    return result;\n  };\n\n  var postData = function postData(body) {\n    return fetch('./server.php', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(body)\n    });\n  };\n\n  var sendForm = function sendForm(form) {\n    form.appendChild(statusMessage);\n\n    if (!validForm(form)) {\n      statusMessage.textContent = formErrorMessage;\n    } else {\n      statusMessage.textContent = '';\n      statusMessage.insertAdjacentElement('beforeend', preload());\n      var formData = new FormData(form);\n      var body = {};\n      formData.forEach(function (val, key) {\n        body[key] = val;\n      });\n      postData(body).then(function (response) {\n        if (response.status !== 200) {\n          throw new Error('status network not 200');\n        }\n\n        statusMessage.textContent = successMesage;\n        delMessage();\n      })[\"catch\"](function (error) {\n        statusMessage.textContent = errorMessage;\n        console.error(error);\n        delMessage();\n      })[\"finally\"](form.querySelectorAll('input').forEach(function (input) {\n        return input.value = '';\n      }));\n    }\n  };\n\n  form1.addEventListener('submit', function (event) {\n    event.preventDefault();\n    sendForm(form1);\n  });\n  form2.addEventListener('submit', function (event) {\n    event.preventDefault();\n    sendForm(form2);\n  });\n  form3.addEventListener('submit', function (event) {\n    event.preventDefault();\n    sendForm(form3);\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendForms);\n\n//# sourceURL=webpack://timer/./src/modules/sendForms.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("26b909deacd13108c8a0")
/******/ })();
/******/ 
/******/ }
);
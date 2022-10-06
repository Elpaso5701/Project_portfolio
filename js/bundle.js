/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function calc() {
  // Формула расчета базовой нормы калорий:
  // для мужчин: BMR = 88.36 + (13.4 x вес, кг) + (4.8 х рост, см) – (5.7 х возраст, лет)
  // для женщин: BMR = 447.6 + (9.2 x вес, кг) + (3.1 х рост, cм) – (4.3 х возраст, лет)
  //Норма калорий = BMR x Уровень активности = 1333 х 1.725 = 2299 ккал
  //Calc
  const result = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio; //ratio - коефициент активности из data attribute 
  //Задаем функционал, когда при обновлении страницы в localStorage сохраняются значения по умолчанию
  //или передаюстя ранее выбранные значения

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem(sex); //если значение уже выбрано
  } else {
    sex = 'female'; // или устанавливаем значение по умолчанию если еще не выбрано

    localStorage.setItem('sex', 'female'); //записываем в localStorage
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem(ratio); //если значение уже выбрано 
  } else {
    // или устанавливаем значение по умолчанию если еще не выбрано
    ratio = '1.375';
    localStorage.setItem('ratio', '1.375'); //записываем в localStorage
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(item => {
      item.classList.remove(activeClass); //Если значение атрибута равно значению из localStorage, етому елементу(div) назначим класс активности 
      //как для блоков sex так и для блоков data-ratio

      if (item.getAttribute('id') == localStorage.getItem('sex')) {
        item.classList.add(activeClass);
      }

      if (item.getAttribute('data-ratio') == localStorage.getItem('ratio')) {
        item.classList.add(activeClass);
      }
    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcTotal() {
    //рассчитываем значение, только когда заполненны все данные 
    if (!sex || !height || !weight || !age || !ratio) {
      //если нет одного из значений 
      result.textContent = '....';
      return; //прерываем все дальнейшие действия после условия когда один из параметров не заполнен
    }

    if (sex === 'female') {
      result.textContent = +Math.trunc((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = +Math.trunc((88.36 + 13.4 * weight + 4.8 * height - 4.3 * age) * ratio);
    }
  }

  calcTotal(); //Создадим функцию дя получение статической информации со статических блоков. 
  //activeClass для изменения классов активности

  function getStaticInfo(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`); //получение всех div внутри родителя(parentSelector)
    //Отслеживание кликов по родительскому елементу

    elements.forEach(item => {
      item.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          //если кликнули по блоку c атрибутом data-ratio
          ratio = +e.target.getAttribute('data-ratio'); //переменной ratio присваиваем значение в ее атрибуте например data-ratio = '1.2

          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          //или мы кликаем по ячейкам "Ваш пол"
          sex = e.target.getAttribute('id'); //переменной sex присваиваем значение из id, например malr or female       

          localStorage.setItem('sex', e.target.getAttribute('id'));
        }

        elements.forEach(item => {
          item.classList.remove(activeClass); //удаляем activeClass вмем div
        });
        e.target.classList.add(activeClass); //div на который кликнули назначаем класс актиности

        calcTotal(); // нужно вызвать после того как присвоили новые значения для переменных(ratio, sex)    
      });
    });
  }

  getStaticInfo('#gender', 'calculating__choose-item_active');
  getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active'); //Функция для работы с input

  function getinputInfo(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/ig)) {
        //если в input введены не числа
        input.style.border = '1px solid red'; // делаем красную рамку
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case 'height':
          //если пользователь ввсел что-то в input с аттрибутом height
          height = +input.value; //в переменную height записываем значение

          break;

        case 'weight':
          //если пользователь ввсел что-то в input с аттрибутом weight
          weight = +input.value; //в переменную height записываем значение

          break;

        case 'age':
          //если пользователь ввсел что-то в input с аттрибутом age
          age = +input.value; //в переменную height записываем значение

          break;
      }

      calcTotal(); //нужно вызвать после того как присаоили новые значения для переменных(height, weight, age)
    });
  }

  getinputInfo('#height');
  getinputInfo('#weight');
  getinputInfo('#age');
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
  // использование классов для карточек
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      //classes - добавляем еще какието классы
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.parent = document.querySelector(parentSelector); //поместить елемент на страницу

      this.price = price;

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes; //еще какието классы в массиве(оператор REST)

      this.transfer = 40; //конвертация price

      this.changeToUAH(); //вызываем метод в конструкторе
    }

    changeToUAH() {
      //метод конвертации доллара в гривну
      this.price = Math.round(this.price * this.transfer);
    } //Задача
    //Создать елемент, 
    //поместить в елемен верстку, 
    //дополнить верстку данными из которых приходят как аргументы класса
    //поместить елемент на страницу


    render() {
      //метод для формирования верстки
      const element = document.createElement('div'); //Создать елемент
      //создадим условие в случае отсутствия классов, добавим их по умолчанию.Так как в Rest оператор приходит массив
      //то припишем следующее:

      if (this.classes.length === 0) {
        //если к-во елементов в массиве 0, добавляем класс по умолчанию
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className)); //добавление новых классов из шаблона MenuCard в верстку в div(element)
      }

      element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">${this.price}</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`; //поместить в елемент верстку

      this.parent.append(element); //поместить елемент div на страницу
    }

  } //Ф-ия для получения данных с сервера
  // Подставление карточек меню с сервера
  //  getResource('http://localhost:3000/menu')//адрес имитированного сервера
  //  .then(data => createCard(data));
  //  function createCard(data){
  //  data.forEach(({img, altimg, title, descr, price}) =>{
  //     const transfer = 42;
  // function FromUSDtoUAH(){
  //     price = price*transfer;
  // }   
  // FromUSDtoUAH();
  //     const element = document.createElement('div');
  //     element.classList.add('menu__item');
  //     element.innerHTML = `
  //             <img src=${img} alt=${altimg}>
  //             <h3 class="menu__item-subtitle">${title}</h3>
  //             <div class="menu__item-descr">${descr}</div>
  //             <div class="menu__item-divider"></div>
  //             <div class="menu__item-price">
  //                 <div class="menu__item-cost">${price}</div>
  //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
  //             </div>`;
  //             //поместить в елемент верстку
  //         document.querySelector('.menu .container').append(element);////поместить елемент div на страницу
  //         });
  //  }
  //     new MenuCard(
  //     "img/tabs/vegy.jpg", 
  //     "vegy", 
  //     'Меню "Фитнес"', 
  //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //     5,
  //     '.menu .container',
  //     ).render(); //применяем такой синтактсиc при разовом использовании метода
  // new MenuCard(
  // "img/tabs/elite.jpg", 
  // "elite", 
  // 'Меню “Премиум”', 
  // 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  // 7.6,
  // '.menu .container',
  // 'menu__item'
  // ).render(); 
  // new MenuCard(
  // "img/tabs/post.jpg", 
  // 'post',
  // 'Меню "Постное"', 
  // 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
  // 7,
  // '.menu .container',
  // 'menu__item'
  // ).render(); 


  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu') //адрес имитированного сервера
  .then(data => {
    //получаемая информация от сервера
    data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); //будет создаватся столько раз,
      //сколько будет объектов внутри массива на имит. сервере
    });
  }); //Получение информации от червера с помощью axios
  //     axios.get('http://localhost:3000/menu')
  //     .then(data => {//получаемая информация от сервера
  // data.data.forEach(({img, altimg, title, descr, price}) =>{//data.data - обращаемся к тем данным, которые получили а не к обьекту
  //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); //будет создаватся столько раз, сколько будет объектов внутри массива на имит. сервере
  //         });
  //     });
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

 // Получаем формы

function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Форма отправлена',
    failure: 'Ошибка отправки формы'
  };
  forms.forEach(item => {
    post(item);
  });

  function post(form) {
    form.addEventListener('submit', e => {
      e.preventDefault(); //отменить стандартное поведение браузера(перезагрузку страницы при оправке формы)

      let statusMessage = document.createElement('img'); //div
      // statusMessage.classList.add('status');//можно добавить css class, если конечно есть

      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement('afterend', statusMessage); //вместо form.append(statusMessage);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries())); // перевод в Json формат
      // let object = {};            
      // formData.forEach(function (value, key) {
      //     object[key] = value;
      // });

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json).then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  } // request.addEventListener('load', ()=>{
  //     if(request.status === 200){
  //         console.log(request.response);//проверка в консоли
  //         showThanksModal(message.success);
  //         form.reset();//очистка формы, после отправки данных
  //         // setTimeout(() =>{
  //             statusMessage.remove();
  //         // },3000);//убираем сообщение о статусе отправки данных из формы через 3 секунды
  //         }else{
  //         /*statusMessage.textContent*/showThanksModal(message.failure);
  //     }
  // });


  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog'); //получаем модальное окно

    prevModalDialog.classList.add('hide'); //скрыть div_modal__dialog(модальное окно) куда вводить данные

    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId); //открыть модальное окно

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog'); //добавим стили класса modal_dialog нашему новому елементу
    //добавим немного html кода

    thanksModal.innerHTML = `
                <div class="modal__content">
                        <div data-close class="modal__close">х</div>
                        <div class="modal__title">${message}</div>
            `;
    document.querySelector('.modal').append(thanksModal); //добавляем созданный div на страницу

    setTimeout(() => {
      thanksModal.remove(); //удаляем окно через 4 секунды

      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 4000);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": function() { return /* binding */ closeModal; },
/* harmony export */   "openModal": function() { return /* binding */ openModal; }
/* harmony export */ });
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector); // отдельный класс для показа и скрытия

  modal.classList.add('hide'); //спрятать модальное окно

  modal.classList.remove('show'); //удалить показ окна
  // document.body.style.overflow = '';// вернуть прокрутку после закрытия
}

function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector); // отдельный класс для показа и скрытия

  modal.classList.add('show'); //показать модальное окно

  modal.classList.remove('hide'); //удалить скрывание окна
  // document.body.style.overflow = 'hidden'; //убрать прокрутку страницы
  // console.log(modalTimerId);

  if (modalTimerId) {
    clearInterval(modalTimerId); //после открытия модального окна очищаем интервал, чтобы модальное окно больше не появлялось
  }
}

function modal(modalOpenBtnSelector, modalSelector, modalTimerId) {
  //Modal
  const modalOpenBtn = document.querySelectorAll(modalOpenBtnSelector),
        //первая кнопка, будем использовать для открытия .modal
  modal = document.querySelector(modalSelector); // отдельный класс для показа и скрытия

  modalOpenBtn.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); //при клике на кнопку, показать модальное окно
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      //при клике по елементу с классом modal(задний план) а также кнопка(пустой крестик)с атр. data-close
      closeModal(modalSelector);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      //Если нажата клавиша Escape и модальное окно открыто
      closeModal(modalSelector);
    }
  }); //Вывод модального окна при прокрутки вниз

  function showModalbyScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal(modalSelector, modalTimerId); //pageYOffset - прокрученая часть + clientHeight - видимая часть

      window.removeEventListener('scroll', showModalbyScroll);
    }
  }

  window.addEventListener('scroll', showModalbyScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/sliders.js":
/*!*******************************!*\
  !*** ./js/modules/sliders.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function slider(_ref) {
  let {
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
  } = _ref;
  //Slider - ваниант 2
  //в HTML создали доп. обертку для слайдеров  .offer__slider-inner, чтобы установить для .offer__slider-wrapper 
  //свойство overflow = hidden (все что не подходит под ширину етого блока будет скрыто)
  //Слайды в .offer__slider-inner будут передвигаться по отношению к .offer__slider-wrapper при помощи свойства transform 
  //для .offer__slider-inner
  //1 получение елементов: класса со слайдерами, класса со стрeлочкой previous, класса со стрелочкой next, елементов с 
  //цифрами(current, total), wrapper(окошко, через которое будем видеть слайды), slidesField(поле со слайдами),
  // width для получения размера wrapper(куда будут подставляться слайды) c помощью computed styles
  //2 Создания индекса для определения текущего положения в слайдере (slideIndex), и условий для current and total
  //3 Помещаем все слайды (sliders) вовнутрь (slidesField), и применяем доп. стили
  //4 на случай если блоки со слайдам разной ширины, приведем их к одной ширине;
  //5 скрываем все елементы которые не попадают в область видимости
  //6 Создадим переменную offset для измерения отступа sliders при подстановке в slidesField
  //7 Назначаем обработчики событий.Трансформируем сдвигаем вправо/влево slidesField для показа sliders (слайдов)

  /*1*/
  const sliders = document.querySelectorAll(slide),
        //получение слайдеров в псевдомассиве
  slider = document.querySelector(container),
        //получим етот div и установим етому елементу position relative
  prev = document.querySelector(prevArrow),
        //стрелочка previous
  next = document.querySelector(nextArrow),
        //стрелочка next
  current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;
  /*2*/

  let slidesIndex = 1;
  /*2*/

  if (sliders.length > 10) {
    total.textContent = sliders.length;
    current.textContent = slidesIndex;
  } else {
    total.textContent = `0${sliders.length}`;
    current.textContent = `0${slidesIndex}`;
  }
  /*3*/


  slidesField.style.width = 100 * sliders.length + '%'; //sliders.lenght - к-во слайдов

  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';
  /*4*/

  sliders.forEach(item => {
    item.style.width = width;
  });
  /*5*/

  slidesWrapper.style.overflow = 'hidden'; //все что не подходит под ширину slidesWrapper будет скрыто

  /*6*/

  let offset = 0;
  slider.style.position = 'relative';
  const indicators = document.createElement('ol'); //создаем обертку для всех точек

  let dots = []; //создаем массив, чтобы добавить dot в массив

  indicators.classList.add('carousel-indicators'); //добавили class(можно добавить в css или задать стили как в примере ниже)

  indicators.style.cssText = `
position: absolute;
right: 0;
bottom: 0;
left: 0;
z-index: 15;
display: flex;
justify-content: center;
margin-right: 15%;
margin-left: 15%;
list-style: none;`;
  slider.append(indicators); //поместим обертку вовнутрь слайдера
  //Основываясь на количестве слайдов, создаем определенное к-во точек

  for (let i = 0; i < sliders.length; i++) {
    //пока i меньше к-ва слайдов увеличивам i на единицу//цыкл сделан для того,
    //чтобы установить нумерацию атрибута, первая точка идет у первому слайду data-slide-to(data-slide-to = 1, data-slide-to = 1 
    //и до четырех... ) а также для создания нужного количества точек.
    const dot = document.createElement('li'); //создаем li(list items), которые и будут точками// на сайт 
    //добавится 4 точки

    dot.setAttribute('data-slide-to', i + 1); //устанавливаем точкам атрибут и нумерацию, начиная с 1

    dot.style.cssText = `
box-sizing: content-box;
flex: 0 1 auto;
width: 30px;
height: 6px;
margin-right: 3px;
margin-left: 3px;
cursor: pointer;
background-color: #fff;
background-clip: padding-box;
border-top: 10px solid transparent;
border-bottom: 10px solid transparent;
opacity: .5;
transition: opacity .6s ease;
`;

    if (i == 0) {
      //если sliders.length = 0, тоесть 1й слайдер// увеличим прозрачность первой точке
      dot.style.opacity = 1;
    } //устанавливаеи атрибут, который будет говорить, что первая точка идет к первому слайду


    indicators.append(dot);
    dots.push(dot); // заполняем массив точками
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }
  /*7*/


  next.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (sliders.length - 1)) {
      //если отступ равен ширине одного 
      //слайда умноженной на к-во слайдов -1 
      //значит мы долистали до конца//получим число с px. К примеру 500px. Приведем результат к числу(+) 
      //и уберем два последних символа px;
      offset = 0; //установим offset (отступ) в 0. //возвращаемся в начало показа слайдов
    } else {
      offset += deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`; //перемещает элемент по горизонтали(ось X)

    if (slidesIndex == sliders.length) {
      //если дошли до конца страницы
      slidesIndex = 1; //идем в начало
    } else {
      slidesIndex++;
    }

    if (sliders.length < 10) {
      current.textContent = `0${slidesIndex}`;
    } else {
      current.textContent = slidesIndex;
    }

    dots.forEach(item => item.style.opacity = '0.2'); //устанавливаем всем точкам прозрачность 0.2

    dots[slidesIndex - 1].style.opacity = 1; //точки которая соответствует слайду меняем прозрачность
  });
  prev.addEventListener('click', () => {
    if (offset == 0) {
      //когда дошли до первого слайда и нажимаем prev
      offset = deleteNotDigits(width) * (sliders.length - 1); //перемещаемся в самый конец
    } else {
      //если не дошли до первого слайда при нажатии prev
      offset -= deleteNotDigits(width); //от текущего отступа отнимаем текущее значение ширины слайда
    }

    slidesField.style.transform = `translateX(-${offset}px)`; //перемещает элемент по горизонтали(ось X)

    if (slidesIndex == 1) {
      //если дошли до начального слайдера
      slidesIndex = sliders.length; //идем в конец
    } else {
      slidesIndex--;
    }

    if (sliders.length < 10) {
      current.textContent = `0${slidesIndex}`;
    } else {
      current.textContent = slidesIndex;
    }

    dots.forEach(item => item.style.opacity = '0.2'); //устанавливаем всем точкам прозрачность 0.5

    dots[slidesIndex - 1].style.opacity = 1; //точки которая соответствует слайду меняем прозрачность
  });
  dots.forEach(item => {
    item.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      slidesIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`; //перемещает элемент по горизонтали(ось X)

      if (sliders.length < 10) {
        current.textContent = `0${slidesIndex}`;
      } else {
        current.textContent = slidesIndex;
      }

      dots.forEach(item => item.style.opacity = '0.2'); //устанавливаем всем точкам прозрачность 0.5

      dots[slidesIndex - 1].style.opacity = 1;
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  // //1 задача. Скрыть ненужные табы(с помощью функции)
  // //2 задача. Показать нужные табы(с пом. функции)
  // //3 задача. Назначить обработчик событий на меню, которое будет манипулировать функциями.
  const tabs = document.querySelectorAll(tabsSelector),
        //получаем доступ а табам
  tabsContent = document.querySelectorAll(tabsContentSelector),
        //получение доступа к контенту табов
  tabsParent = document.querySelector(tabsParentSelector); //получение доступа к родительскому елементу табов
  // //Задача 1

  function hideTabContent() {
    //функция для скрытия контента табов
    tabsContent.forEach(element => {
      element.classList.add('hide'); //не показывать елемент

      element.classList.remove('show', 'fade');
    });
    tabs.forEach(element => {
      //делаем все табы неактивными(удаляем класс активности у всех табов)
      element.classList.remove(activeClass);
    });
  } //Задача 2


  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    // i = 0, параметр по умолчанию, если ф-ия вызывается без аргуметов в i по умолчанию подставляется 0
    tabsContent[i].classList.add('show', 'fade'); //показывать елемент

    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass); //добавить класс активности для таба
  }

  hideTabContent();
  showTabContent(); //передаем контент первого таба(в верстке класс активности стоит на нем)
  // //Задача 3// делегирование событий, назначение события клика

  tabsParent.addEventListener('click', event => {
    const target = event.target; //так как будем использовать часто event target, создадим для нее переменную

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      //при клике на кнопку с классом tabheader__item, 
      //tabsSelector.slice(1) - У .tabheader__item  из script.js убираем точку и подствляем 
      //перебор табов в переменной tabs. Если елемент в массиве сопадает с елементом по которому кликнул пользователь то берем номер и 
      //показываем елемент на странице
      tabs.forEach((item, i) => {
        if (target == item) {
          //target елемент по которому кликают
          hideTabContent(); //прячем все табы(контент)

          showTabContent(i); //показываем тот таб(контент) по которому кликнули
        }
      });
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          seconds = Math.floor(t / 1000 % 60),
          minutes = Math.floor(t / 1000 / 60 % 60),
          hours = Math.floor(t / (1000 * 60 * 60) % 24);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  } //установка таймера на страницу


  function setClockOnPage(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000); //обновление таймера(ф-ии updateClock) каждую секунду(1000мс.))

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime); //возвращает объект со всеми данными 
      //помещаем расчетные величины на страницу

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds); //Остановка таймера

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClockOnPage(id, deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": function() { return /* binding */ getResource; },
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
//postData- функция с параметрами постинга данных
const postData = async (url, data) => {
  //url - url который передается в fetch, data-данные которые постит ф-ия 
  let res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  });
  return await res.json(); //Промис, результат работы ф-ии 
};

const getResource = async url => {
  const res = await fetch(url); //делаем запрос, дожидаемся его окончания(await)

  if (!res.ok) {
    throw new Error(); //выкидываем новую ошибку
  }

  return await res.json(); //трансформируем данные в Json
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/sliders */ "./js/modules/sliders.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");








window.addEventListener('DOMContentLoaded', () => {
  //назначение глобального обработчика событий
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 4000); // через 4 секунды запустится ф-ия openModal; 

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-09-27');
  (0,_modules_form__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimerId);
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_5__["default"])({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    slide: '.offer__slide',
    currentCounter: '#current',
    totalCounter: '#total',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner '
  });
}); // fetch('db.json')//получаем Promise используем then
// .then(data=>data.json())//ответ от сервера превращаем в js объект, так как база данных js
// .then(res=>console.log(res));//выводим данные в консоль
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map
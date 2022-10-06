
import tabs from'./modules/tabs';
import modal from'./modules/modal';
import timer from './modules/timer';
import form from'./modules/form';
import cards from'./modules/cards';
import sliders from'./modules/sliders';
import calc from'./modules/calc';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', ()=>{//назначение глобального обработчика событий
const modalTimerId = setTimeout(()=> openModal('.modal', modalTimerId), 4000);// через 4 секунды запустится ф-ия openModal; 

tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
modal('[data-modal]', '.modal', modalTimerId);
timer('.timer', '2022-09-27');
form('form', modalTimerId);
cards();
calc();
sliders({
    container: '.offer__slider',
    nextArrow:'.offer__slider-next',
    prevArrow:'.offer__slider-prev',
    slide: '.offer__slide',
    currentCounter: '#current',
    totalCounter: '#total',
    wrapper:'.offer__slider-wrapper',
    field:'.offer__slider-inner ',
});



});


// fetch('db.json')//получаем Promise используем then
// .then(data=>data.json())//ответ от сервера превращаем в js объект, так как база данных js
// .then(res=>console.log(res));//выводим данные в консоль
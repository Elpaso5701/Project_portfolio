function closeModal(modalSelector){
    const modal = document.querySelector(modalSelector);// отдельный класс для показа и скрытия
    modal.classList.add('hide');//спрятать модальное окно
    modal.classList.remove('show');//удалить показ окна
    // document.body.style.overflow = '';// вернуть прокрутку после закрытия
}

function openModal(modalSelector, modalTimerId){
    const modal = document.querySelector(modalSelector);// отдельный класс для показа и скрытия
    modal.classList.add('show');//показать модальное окно
    modal.classList.remove('hide');//удалить скрывание окна
    // document.body.style.overflow = 'hidden'; //убрать прокрутку страницы
    // console.log(modalTimerId);
    if(modalTimerId){
    clearInterval(modalTimerId);//после открытия модального окна очищаем интервал, чтобы модальное окно больше не появлялось
    }
}

function modal(modalOpenBtnSelector, modalSelector, modalTimerId){
//Modal
const modalOpenBtn = document.querySelectorAll(modalOpenBtnSelector),//первая кнопка, будем использовать для открытия .modal
modal = document.querySelector(modalSelector);// отдельный класс для показа и скрытия

modalOpenBtn.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); //при клике на кнопку, показать модальное окно

});

    

    modal.addEventListener('click', (e)=>{
    if (e.target === modal || e.target.getAttribute('data-close') == '') {//при клике по елементу с классом modal(задний план) а также кнопка(пустой крестик)с атр. data-close
       closeModal(modalSelector);

}
});
    document.addEventListener('keydown', (e)=>{
    if(e.code === 'Escape' && modal.classList.contains('show')){//Если нажата клавиша Escape и модальное окно открыто
      closeModal(modalSelector);
}
});


//Вывод модального окна при прокрутки вниз
function showModalbyScroll(){

if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
    openModal(modalSelector, modalTimerId);//pageYOffset - прокрученая часть + clientHeight - видимая часть
    window.removeEventListener('scroll', showModalbyScroll);
}  
}
window.addEventListener('scroll', showModalbyScroll);
}
export default modal;
export {closeModal};
export {openModal};
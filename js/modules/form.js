import { closeModal, openModal } from './modal';
import { postData } from '../services/services';

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
        form.addEventListener('submit', (e) => {
            e.preventDefault();//отменить стандартное поведение браузера(перезагрузку страницы при оправке формы)

            let statusMessage = document.createElement('img');//div
            // statusMessage.classList.add('status');//можно добавить css class, если конечно есть
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);//вместо form.append(statusMessage);


            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));// перевод в Json формат

            // let object = {};            
            // formData.forEach(function (value, key) {
            //     object[key] = value;
            // });

            postData("http://localhost:3000/requests", json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
         
        });
      
    }



// request.addEventListener('load', ()=>{
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
    const prevModalDialog = document.querySelector('.modal__dialog');//получаем модальное окно

    prevModalDialog.classList.add('hide');//скрыть div_modal__dialog(модальное окно) куда вводить данные
    openModal('.modal', modalTimerId);//открыть модальное окно

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');//добавим стили класса modal_dialog нашему новому елементу
    //добавим немного html кода
    thanksModal.innerHTML = `
                <div class="modal__content">
                        <div data-close class="modal__close">х</div>
                        <div class="modal__title">${message}</div>
            `;
    document.querySelector('.modal').append(thanksModal);//добавляем созданный div на страницу
    setTimeout(() => {

        thanksModal.remove();//удаляем окно через 4 секунды
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');

        closeModal('.modal');
    }, 4000);
}
}
export default forms;
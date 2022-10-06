import {getResource} from '../services/services';

function cards(){
// использование классов для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {//classes - добавляем еще какието классы
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.parent = document.querySelector(parentSelector);//поместить елемент на страницу
            this.price = price;
            this.classes = classes;//еще какието классы в массиве(оператор REST)
            this.transfer = 40;//конвертация price
            this.changeToUAH();//вызываем метод в конструкторе
        }

        changeToUAH() {//метод конвертации доллара в гривну
            this.price = Math.round(this.price * this.transfer);
        }

        //Задача
        //Создать елемент, 
        //поместить в елемен верстку, 
        //дополнить верстку данными из которых приходят как аргументы класса
        //поместить елемент на страницу

        render() {//метод для формирования верстки
            const element = document.createElement('div');//Создать елемент
            //создадим условие в случае отсутствия классов, добавим их по умолчанию.Так как в Rest оператор приходит массив
            //то припишем следующее:

            if (this.classes.length === 0) {//если к-во елементов в массиве 0, добавляем класс по умолчанию
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
            </div>`;
            //поместить в елемент верстку
            this.parent.append(element);//поместить елемент div на страницу
        }
    }


    //Ф-ия для получения данных с сервера

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

    

    getResource('http://localhost:3000/menu')//адрес имитированного сервера
        .then(data => {//получаемая информация от сервера
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); //будет создаватся столько раз,
                //сколько будет объектов внутри массива на имит. сервере
            });
        });
//Получение информации от червера с помощью axios
//     axios.get('http://localhost:3000/menu')
//     .then(data => {//получаемая информация от сервера
// data.data.forEach(({img, altimg, title, descr, price}) =>{//data.data - обращаемся к тем данным, которые получили а не к обьекту
//     new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); //будет создаватся столько раз, сколько будет объектов внутри массива на имит. сервере
//         });
//     });
}

export default cards;
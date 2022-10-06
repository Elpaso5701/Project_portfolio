function calc(){
    // Формула расчета базовой нормы калорий:

    // для мужчин: BMR = 88.36 + (13.4 x вес, кг) + (4.8 х рост, см) – (5.7 х возраст, лет)
    // для женщин: BMR = 447.6 + (9.2 x вес, кг) + (3.1 х рост, cм) – (4.3 х возраст, лет)
    //Норма калорий = BMR x Уровень активности = 1333 х 1.725 = 2299 ккал
    //Calc
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;//ratio - коефициент активности из data attribute 
    //Задаем функционал, когда при обновлении страницы в localStorage сохраняются значения по умолчанию
    //или передаюстя ранее выбранные значения
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem(sex);//если значение уже выбрано
    } else {
        sex = 'female';// или устанавливаем значение по умолчанию если еще не выбрано
        localStorage.setItem('sex', 'female');//записываем в localStorage
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem(ratio);//если значение уже выбрано 
    } else {// или устанавливаем значение по умолчанию если еще не выбрано
        ratio = '1.375';
        localStorage.setItem('ratio', '1.375');//записываем в localStorage
    }
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(item => {
            item.classList.remove(activeClass);
            //Если значение атрибута равно значению из localStorage, етому елементу(div) назначим класс активности 
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
        if (!sex || !height || !weight || !age || !ratio) {//если нет одного из значений 
            result.textContent = '....';
            return;//прерываем все дальнейшие действия после условия когда один из параметров не заполнен
        }
        if (sex === 'female') {
            result.textContent = +Math.trunc((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = +Math.trunc((88.36 + (13.4 * weight) + (4.8 * height) - (4.3 * age)) * ratio);
        }

    }
    calcTotal();
    //Создадим функцию дя получение статической информации со статических блоков. 
    //activeClass для изменения классов активности
    function getStaticInfo(parentSelector, activeClass) {

        const elements = document.querySelectorAll(`${parentSelector} div`);//получение всех div внутри родителя(parentSelector)

        //Отслеживание кликов по родительскому елементу
        elements.forEach(item => {
            item.addEventListener('click', (e) => {

                if (e.target.getAttribute('data-ratio')) {   //если кликнули по блоку c атрибутом data-ratio
                    ratio = +e.target.getAttribute('data-ratio');//переменной ratio присваиваем значение в ее атрибуте например data-ratio = '1.2
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {//или мы кликаем по ячейкам "Ваш пол"
                    sex = e.target.getAttribute('id');//переменной sex присваиваем значение из id, например malr or female       
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(item => {
                    item.classList.remove(activeClass);//удаляем activeClass вмем div

                });
                e.target.classList.add(activeClass);//div на который кликнули назначаем класс актиности

                calcTotal(); // нужно вызвать после того как присвоили новые значения для переменных(ratio, sex)    
            });
        });
    }

    getStaticInfo('#gender', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

    //Функция для работы с input

    function getinputInfo(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {

            if (input.value.match(/\D/ig)) {//если в input введены не числа
                input.style.border = '1px solid red';// делаем красную рамку
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':  //если пользователь ввсел что-то в input с аттрибутом height
                    height = +input.value; //в переменную height записываем значение
                    break;
                case 'weight': //если пользователь ввсел что-то в input с аттрибутом weight
                    weight = +input.value; //в переменную height записываем значение
                    break;
                case 'age': //если пользователь ввсел что-то в input с аттрибутом age
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

export default calc;
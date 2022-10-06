function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // //1 задача. Скрыть ненужные табы(с помощью функции)
    // //2 задача. Показать нужные табы(с пом. функции)
    // //3 задача. Назначить обработчик событий на меню, которое будет манипулировать функциями.

    const tabs = document.querySelectorAll(tabsSelector),//получаем доступ а табам
        tabsContent = document.querySelectorAll(tabsContentSelector),//получение доступа к контенту табов
        tabsParent = document.querySelector(tabsParentSelector);//получение доступа к родительскому елементу табов


    // //Задача 1
    function hideTabContent() { //функция для скрытия контента табов

        tabsContent.forEach(element => {
            element.classList.add('hide');//не показывать елемент
            element.classList.remove('show', 'fade');
        });

        tabs.forEach(element => { //делаем все табы неактивными(удаляем класс активности у всех табов)
            element.classList.remove(activeClass);
        });
    }
    //Задача 2

    function showTabContent(i = 1) {// i = 0, параметр по умолчанию, если ф-ия вызывается без аргуметов в i по умолчанию подставляется 0
        tabsContent[i].classList.add('show', 'fade');//показывать елемент
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);//добавить класс активности для таба
    }
    hideTabContent();
    showTabContent();//передаем контент первого таба(в верстке класс активности стоит на нем)

    // //Задача 3// делегирование событий, назначение события клика
    tabsParent.addEventListener('click', (event) => {
        const target = event.target; //так как будем использовать часто event target, создадим для нее переменную
        if (target && target.classList.contains(tabsSelector.slice(1))) {//при клике на кнопку с классом tabheader__item, 
            //tabsSelector.slice(1) - У .tabheader__item  из script.js убираем точку и подствляем 

            //перебор табов в переменной tabs. Если елемент в массиве сопадает с елементом по которому кликнул пользователь то берем номер и 
            //показываем елемент на странице
            tabs.forEach((item, i) => {
                if (target == item) {//target елемент по которому кликают
                    hideTabContent();//прячем все табы(контент)
                    showTabContent(i);//показываем тот таб(контент) по которому кликнули
                }
            });
        }
    });
}
export default tabs;
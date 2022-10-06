function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
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

/*1*/ const sliders = document.querySelectorAll(slide),//получение слайдеров в псевдомассиве
    slider = document.querySelector(container),//получим етот div и установим етому елементу position relative
    prev = document.querySelector(prevArrow),//стрелочка previous
    next = document.querySelector(nextArrow),//стрелочка next
    current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;


/*2*/   let slidesIndex = 1;


/*2*/   if (sliders.length > 10) {
    total.textContent = sliders.length;
    current.textContent = slidesIndex;
} else {
    total.textContent = `0${sliders.length}`;
    current.textContent = `0${slidesIndex}`;
}

/*3*/    slidesField.style.width = 100 * sliders.length + '%'; //sliders.lenght - к-во слайдов
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

/*4*/    sliders.forEach(item => {
    item.style.width = width;
});

/*5*/    slidesWrapper.style.overflow = 'hidden'; //все что не подходит под ширину slidesWrapper будет скрыто
/*6*/    let offset = 0;

slider.style.position = 'relative';

const indicators = document.createElement('ol');//создаем обертку для всех точек
let dots = [];//создаем массив, чтобы добавить dot в массив
indicators.classList.add('carousel-indicators');//добавили class(можно добавить в css или задать стили как в примере ниже)
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
slider.append(indicators);//поместим обертку вовнутрь слайдера

//Основываясь на количестве слайдов, создаем определенное к-во точек

for (let i = 0; i < sliders.length; i++) {   //пока i меньше к-ва слайдов увеличивам i на единицу//цыкл сделан для того,
    //чтобы установить нумерацию атрибута, первая точка идет у первому слайду data-slide-to(data-slide-to = 1, data-slide-to = 1 
    //и до четырех... ) а также для создания нужного количества точек.
    const dot = document.createElement('li');   //создаем li(list items), которые и будут точками// на сайт 
    //добавится 4 точки
    dot.setAttribute('data-slide-to', i + 1);//устанавливаем точкам атрибут и нумерацию, начиная с 1
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
    if (i == 0) {//если sliders.length = 0, тоесть 1й слайдер// увеличим прозрачность первой точке
        dot.style.opacity = 1;
    }
    //устанавливаеи атрибут, который будет говорить, что первая точка идет к первому слайду

    indicators.append(dot);
    dots.push(dot);// заполняем массив точками
}

function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
}



/*7*/   next.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (sliders.length - 1)) {//если отступ равен ширине одного 
        //слайда умноженной на к-во слайдов -1 
        //значит мы долистали до конца//получим число с px. К примеру 500px. Приведем результат к числу(+) 
        //и уберем два последних символа px;
        offset = 0;//установим offset (отступ) в 0. //возвращаемся в начало показа слайдов
    } else {
        offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;//перемещает элемент по горизонтали(ось X)
    if (slidesIndex == sliders.length) {//если дошли до конца страницы
        slidesIndex = 1;//идем в начало
    } else {
        slidesIndex++;
    }
    if (sliders.length < 10) {
        current.textContent = `0${slidesIndex}`;
    } else {
        current.textContent = slidesIndex;
    }
    dots.forEach(item => item.style.opacity = '0.2');//устанавливаем всем точкам прозрачность 0.2
    dots[slidesIndex - 1].style.opacity = 1;//точки которая соответствует слайду меняем прозрачность

});



prev.addEventListener('click', () => {
    if (offset == 0) {//когда дошли до первого слайда и нажимаем prev
        offset = deleteNotDigits(width) * (sliders.length - 1);//перемещаемся в самый конец
    } else {//если не дошли до первого слайда при нажатии prev
        offset -= deleteNotDigits(width);//от текущего отступа отнимаем текущее значение ширины слайда
    }
    slidesField.style.transform = `translateX(-${offset}px)`;//перемещает элемент по горизонтали(ось X)

    if (slidesIndex == 1) {//если дошли до начального слайдера
        slidesIndex = sliders.length;//идем в конец
    } else {
        slidesIndex--;
    }
    if (sliders.length < 10) {
        current.textContent = `0${slidesIndex}`;
    } else {
        current.textContent = slidesIndex;
    }
    dots.forEach(item => item.style.opacity = '0.2');//устанавливаем всем точкам прозрачность 0.5
    dots[slidesIndex - 1].style.opacity = 1;//точки которая соответствует слайду меняем прозрачность
});
dots.forEach(item => {
    item.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slidesIndex = slideTo;

        offset = +width.slice(0, width.length - 2) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;//перемещает элемент по горизонтали(ось X)

        if (sliders.length < 10) {
            current.textContent = `0${slidesIndex}`;
        } else {
            current.textContent = slidesIndex;
        }

        dots.forEach(item => item.style.opacity = '0.2');//устанавливаем всем точкам прозрачность 0.5
        dots[slidesIndex - 1].style.opacity = 1;
    });
});
}
export default slider;
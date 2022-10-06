function timer(id, deadline){

    
function getTimeRemaining(endtime) {
   
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor( (t/(1000*60*60*24)) ),
        seconds = Math.floor( (t/1000) % 60 ),
        minutes = Math.floor( (t/1000/60) % 60 ),
        hours = Math.floor( (t/(1000*60*60) % 24) );


        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }
    //установка таймера на страницу
    function setClockOnPage(selector, endtime){

    const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);//обновление таймера(ф-ии updateClock) каждую секунду(1000мс.))


        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);//возвращает объект со всеми данными 
            //помещаем расчетные величины на страницу
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            //Остановка таймера
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClockOnPage(id, deadline);
}
export default timer;




function timer (id, deadline) {
    /* ТАЙМЕР */

/*     создаем отправную точку */

/*     const deadline = '2022-09-18'; */

/*     создаем ф-цию, которая будет определять разницу между
    отправной точкой и текущем временем */

    function getTimeRemaining (endtime) {
        /* получаем кол-во миллисекунд, во времени 2020-05-11 
        и отнимаем текущую дату в мс*/
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t/(1000*60*60*24)),
            hours = Math.floor((t/(1000*60*60)%24)),
            minutes = Math.floor((t/(1000*60)%60)),
            seconds = Math.floor((t/1000)%60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function zero (num) {
        if (num>=0 && num<10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    /* создаем ф-цию, которая поместит цифры на страницу */
    
    function setClock (selector, endtime) {
        /* получаем элементы со страницы */
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(upDateClock, 1000);
        
        upDateClock ();

        function upDateClock () {
            const t = getTimeRemaining(endtime);
            /* помещаем данные на страницу */
            days.innerHTML = zero(t.days);
            hours.innerHTML = zero(t.hours);
            minutes.innerHTML = zero(t.minutes);
            seconds.innerHTML = zero(t.seconds);
            /* условие остановки таймера */
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);

}


/* Экспорт Command.js */
/* module.exports = timer; */


/* Экспорт ES6 */
export default timer;
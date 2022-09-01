

function calc () {
    //Calculator of calories

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age,
        ratio = 1.375;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSet (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSet('#gender div', 'calculating__choose-item_active');
    initLocalSet('.calculating__choose_big div', 'calculating__choose-item_active');

    // создаем общую ф-цию для подсчета кол-ва коллорий

    function calcTotal () {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "Введите все данные!";
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio);
        }
    }
    calcTotal ();

    // функция для статичного блока (где не нужно ничего вводить)

    function getStaticInf (selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal ();
            });
        });
    }

    getStaticInf('#gender div', 'calculating__choose-item_active');
    getStaticInf('.calculating__choose_big div', 'calculating__choose-item_active');

    // функция для обработки инпута

    function getDinamicInf (selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal ();
        });
    }
    getDinamicInf ('#height');
    getDinamicInf ('#weight');
    getDinamicInf ('#age');
}
/* Экспорт Command.js */
/* module.exports = calc; */


/* Экспорт ES6 */
export default calc;

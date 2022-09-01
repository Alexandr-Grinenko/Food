
import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms (formSelector, modalTimerId) {
    //Формы отправки данных

    // получаем переменную для всех форм по тегу form

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Мы скоро свяжемся с Вами!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });


    // создаем ф-цию которая отвечает за постинг данных

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            //form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);



/*             const request = new XMLHttpRequest();
            request.open('POST', 'server.php'); */

/*             request.setRequestHeader('Content-type', 'application/json'); */
            const formData = new FormData(form);



            //конвертация formData в формат JSON

/*             const obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            }); */

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

/*             fetch('server1.php', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            }) */
            postData ('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            }).finally (() => {
                form.reset();
            });

/*             request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            }); */
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>×</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() =>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

/*     fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        body: JSON.stringify({name: 'Alex'}),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => console.log(json)); */

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

/*     //Создание слайдерра ВАРИАНТ 1
    //получение элементов со страницы
    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current');
    //присваиваем индекс к слайду
    let slideIndex = 1;
    //задаем начальное значение для функции
    showSlides(slideIndex);

    //общее количество слайдов на счетчике
    if (slides.length<10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    //создаем функцию
    function showSlides(n) {
        if (n>slides.length) {
            slideIndex = 1;
        }
        if (n<1) {
            slideIndex = slides.length;
        }
        slides.forEach(item => item.style.display = 'none');
        slides[slideIndex - 1].style.display = 'block';
        //текущее количество слайдов на счетчике
        if (slides.length<10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    prev.addEventListener('click', () => {
        plusSlides(-1);
    });
    next.addEventListener('click', () => {
        plusSlides(1);
    }); */
}


/* Экспорт Command.js */
/* module.exports = forms; */


/* Экспорт ES6 */
export default forms;

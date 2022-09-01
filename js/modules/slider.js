

function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
        //Создание слайдерра ВАРИАНТ 2 - КАРУСЕЛЬ
    //получение элементов со страницы
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;
    //присваиваем индекс к слайду
    let slideIndex = 1;
    let offset = 0;
    //общее количество слайдов на счетчике
    if (slides.length<10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }
    //устанавливаем блоку inner ширину и параметры css
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '1s, all';
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width;
    });
    //устанавливаием position relative для всего слайдера
    slider.style.position = 'relative';
    //создаем большую обертку для точек
    const dotsWraper = document.createElement('ol'),
        dots = [];
    dotsWraper.classList.add('carousel-indicators');
    dotsWraper.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(dotsWraper);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: rgb(28, 200, 223);
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dotsWraper.append(dot);
        dots.push(dot);
    }

    function num() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function dotts() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex -1].style.opacity = '1';
    }

    function deleteNoteDigits(str) {
        return +str.replace(/\D/g, '');
    }

    
    //назначаем обработчики событий
    next.addEventListener('click', () => {
        if (offset == deleteNoteDigits(width)*(slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNoteDigits(width);
        }
        slidesField.style.transform =`translateX(-${offset}px)`;
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex ++;
        }
        num(slides.length);
        //для точек
        dotts(dots);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNoteDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNoteDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex --;
        }
        num(slides.length);
        //для точек
        dotts(dots);
    });
    //функционал для точек
    dots.forEach(dot => {
        dot.addEventListener('click', (e) =>{
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;

            offset = deleteNoteDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            num(slides.length);

            dotts(dots);
        });
    });
}


/* Экспорт Command.js */
/* module.exports = slider; */


/* Экспорт ES6 */
export default slider;
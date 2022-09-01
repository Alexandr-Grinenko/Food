
function tabs (tabsSelector, tabsContentSelector, tabsParrentSelector, activeClass) {
    /* ТАБЫ */
    /* создаем неоходимые переменные */ 
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParrentSelector);
    /* скрываем весь контент (все табы) */
    function hideTabsContent () {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });
        /* удаляем класс активности у элементов */
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }
    /* показываем контент по умолчанию ("0" - это первый контент)*/
    function showTabContent (i = 0) {
        tabsContent[i].style.display = 'block';
    /*     добавляем класс к нужному объекту */
        tabs[i].classList.add(activeClass);
    }
    /* вызываем функции */
    hideTabsContent ();
    showTabContent ();
/*     делегируем события и назн обработчик соб "click" */
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
/*         проверка на то что клик по нужному месту */
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabsContent ();
                    showTabContent (i);
                }
            }); 
        }
    });
}

/* Экспорт Command.js */
/* module.exports = tabs; */


/* Экспорт ES6 */
export default tabs;

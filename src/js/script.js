window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(el => {
            el.style.display = 'none';
        });

        tabs.forEach(el => {
            el.classList.remove('tabheader__item_active');
        })
    }

    function showTabsContent(i = 0) {
        tabsContent[i].style.display = 'block';

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabsContent();

    tabsParent.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('tabheader__item')) {
            tabs.forEach((el, i) => {
                if (el == event.target) {
                    hideTabContent();
                    showTabsContent([i]);
                }
            });
        }
    });


    const deadline = '2023-06-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60) % 24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);



    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('[data-close]');

    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTymerId);
    }


    modalTrigger.forEach(el => {
        el.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal)


    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display == 'block') {
            closeModal();
        }
    });


    const modalTymerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll);



    class MenuCard {
        constructor(src, alt, title, text, price, parentSelect) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.transf = 27;
            this.parent = document.querySelector(parentSelect);
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transf;
        }

        render() {
            const el = document.createElement('div');
            el.innerHTML =
                `<div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                     <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            </div>`;

            this.parent.append(el)
        }

    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню 'Фитнес'",
        "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        9,
        '.menu .container'
    ).render()

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        "Меню 'Премиум'",
        "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        14,
        '.menu .container'
    ).render()

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        "Меню 'Постное'",
        "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        21,
        '.menu .container'
    ).render()



});
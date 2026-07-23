    // ========================================================
    // 2. ВТОРОЙ СЛАЙДЕР (Карусель "Нам доверяют" с плавным сдвигом)
    // ========================================================
    const track = document.getElementById("trustSliderTrack");
    const trustPrevBtn = document.getElementById("trustPrevBtn");
    const trustNextBtn = document.getElementById("trustNextBtn");

    // Проверяем, существуют ли элементы карусели на этой странице
    if (track && trustPrevBtn && trustNextBtn) {

        let currentPosition = 0; // Текущий сдвиг в пикселях
        const slideStep = 181 + 29; // Ширина слайда (181px) + отступ gap (29px) = 210px
        const totalSlides = track.children.length; // Всего слайдов 12

        function getVisibleSlidesCount() {
            // Вычисляем, сколько слайдов сейчас физически помещается на экране пользователя
            const viewportWidth = track.parentElement.clientWidth;
            return Math.floor(viewportWidth / slideStep) || 1;
        }

        trustNextBtn.addEventListener("click", function () {
            const visibleSlides = getVisibleSlidesCount();
            const maxScroll = (totalSlides - visibleSlides) * slideStep;

            // Сдвигаем ленту влево
            currentPosition += slideStep;

            // Если дошли до самого конца ленты — плавно возвращаемся в начало
            if (currentPosition > maxScroll) {
                currentPosition = 0;
            }

            track.style.transform = `translateX(-${currentPosition}px)`;
        });

        trustPrevBtn.addEventListener("click", function () {
            const visibleSlides = getVisibleSlidesCount();
            const maxScroll = (totalSlides - visibleSlides) * slideStep;

            // Сдвигаем ленту вправо
            currentPosition -= slideStep;

            // Если крутим назад в самом начале — плавно перемещаемся к концу ленты
            if (currentPosition < 0) {
                currentPosition = maxScroll;
            }

            track.style.transform = `translateX(-${currentPosition}px)`;
        });
    }

}); // Конец главной функции DOMContentLoaded


document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slider-track img");
    const btnPrev = document.querySelector(".btn-prev");
    const btnNext = document.querySelector(".btn-next");

    if (!track || slides.length === 0) return;

    let currentIndex = 0;

    function moveSlider(index) {
        // Рассчитываем ширину одной картинки + отступ (margin-right)
        const slideStyle = window.getComputedStyle(slides[0]);
        const slideWidth = slides[0].offsetWidth;
        const slideMargin = parseFloat(slideStyle.marginRight) || 0;
        const step = slideWidth + slideMargin;

        // Ограничиваем индекс, чтобы не листать в пустоту
        // (slides.length - 2), если на экране должно быть видно сразу 2 картинки
        // Если на экране видна только 1 картинка, замените на: slides.length - 1
        const maxIndex = slides.length - 2;

        if (index < 0) {
            currentIndex = 0; // Стоп на первом слайде
        } else if (index > maxIndex) {
            currentIndex = maxIndex; // Стоп на последнем возможном слайде
        } else {
            currentIndex = index;
        }

        // Сдвигаем ленту влево
        track.style.transform = `translateX(-${currentIndex * step}px)`;
    }

    // Навешиваем события на кнопки
    btnPrev.addEventListener("click", () => moveSlider(currentIndex - 1));
    btnNext.addEventListener("click", () => moveSlider(currentIndex + 1));

    // Пересчитываем шаг при изменении размера экрана, чтобы слайдер не ломался
    window.addEventListener("resize", () => moveSlider(currentIndex));
});



///для дизайна\\\\\

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slider-track img");
    const btnPrev = document.querySelector(".btn-prev");
    const btnNext = document.querySelector(".btn-next");
    const counter = document.querySelector(".slider-counter");

    if (!track || slides.length === 0) return;

    let currentPage = 0; // Начинаем с 0-й страницы (первая тройка)

    // Считаем, сколько полных страниц по 3 картинки у нас есть
    const slidesPerPage = 3;
    const totalPages = Math.ceil(slides.length / slidesPerPage); // Для 6 картинок это будет 2

    function moveSlider(page) {
        // Ограничиваем перелистывание рамками доступных страниц
        if (page < 0) {
            currentPage = 0;
        } else if (page >= totalPages) {
            currentPage = totalPages - 1;
        } else {
            currentPage = page;
        }

        // Рассчитываем шаг сдвига: ширина картинки + отступ
        const slideStyle = window.getComputedStyle(slides[0]);
        const slideWidth = slides[0].offsetWidth;
        const slideMargin = parseFloat(slideStyle.marginRight) || 0;
        const step = slideWidth + slideMargin;

        // Сдвигаем ленту сразу на 3 картинки (currentPage * 3)
        const slidesToScroll = currentPage * slidesPerPage;
        track.style.transform = `translateX(-${slidesToScroll * step}px)`;

        // Обновляем счетчик, чтобы он корректно показывал 1/2 или 2/2
        if (counter) {
            counter.textContent = `${currentPage + 1}/${totalPages}`;
        }
    }

    // Перелистываем сразу на целую страницу вперед/назад
    btnPrev.addEventListener("click", () => moveSlider(currentPage - 1));
    btnNext.addEventListener("click", () => moveSlider(currentPage + 1));

    window.addEventListener("resize", () => moveSlider(currentPage));

    // Стартовое состояние
    if (counter) {
        counter.textContent = `1/${totalPages}`;
    }
});


// СМЕНА КАРТИНОК ДЛЯ ПОРТФОЛИО

document.addEventListener("DOMContentLoaded", () => {
    // Находим все карточки портфолио на странице
    const portfolioCards = document.querySelectorAll(".portfolio-card");

    portfolioCards.forEach(card => {
        // Внутри каждой карточки находим главную картинку и список миниатюр
        const largeImg = card.querySelector(".img-large");
        const thumbs = card.querySelectorAll(".img-thumb-column img");

        if (!largeImg || thumbs.length === 0) return;

        // Навешиваем клик на каждую маленькую картинку
        thumbs.forEach(thumb => {
            thumb.addEventListener("click", () => {
                // Запоминаем текущий адрес большой картинки
                const currentLargeSrc = largeImg.getAttribute("src");
                // Запоминаем текущий адрес маленькой картинки, на которую нажали
                const currentThumbSrc = thumb.getAttribute("src");

                // Делаем рокировку путей (src)
                largeImg.setAttribute("src", currentThumbSrc);
                thumb.setAttribute("src", currentLargeSrc);
            });
        });
    });
});
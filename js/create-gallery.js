import images from "./gallery-items.js"

const portfolioContainer = document.querySelector(".js-gallery");
const cardsEl = createColorCardsMarkup(images);
portfolioContainer.insertAdjacentHTML('beforeend', cardsEl);

function createColorCardsMarkup(images) {
    return images.map(({ preview, original, description }) => {
        return `
    <li class="gallery__item">
    <a
        class="gallery__link"
        href="${original}"
    ><img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
    </a>
    </li>
        `;
    }).join(" ");
}
const lightBoxImg = document.querySelector('.lightbox__image');
const closeBtnModal = document.querySelector("[data-action=close-lightbox]");
const lightBox = document.querySelector(".js-lightbox");
const lightBoxOverlay = document.querySelector(".lightbox__overlay");

portfolioContainer.addEventListener('click', onPalletContainerClick);
portfolioContainer.addEventListener('click', onOpenModalBtn);
closeBtnModal.addEventListener('click', onCloseModalBtn);
lightBoxOverlay.addEventListener('click', onBackdropClick);

function onPalletContainerClick(event) {
    event.preventDefault();
    if (!event.target.classList.contains('gallery__image')) {
        return 
    }
    const imgDataSource = event.target.dataset.source;
    const imgAlt = event.target.getAttribute('alt');
    lightBoxImg.src = imgDataSource;
    lightBoxImg.alt = imgAlt;
    onOpenModalBtn();
}

function onOpenModalBtn() {
    window.addEventListener('keydown', onEscKeyPress)
    lightBox.classList.add("is-open");
}

function onCloseModalBtn() {
    window.removeEventListener('keydown', onEscKeyPress)
    lightBox.classList.remove("is-open");
    lightBoxImg.src = "";
    lightBoxImg.alt = "";
}

function onBackdropClick() {
    onCloseModalBtn()
}

function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    if (event.code === ESC_KEY_CODE) {
        onCloseModalBtn()
    }
}

//                 Разбей задание на несколько подзадач:

// -------Создание и рендер разметки по массиву данных и предоставленному шаблону.
// -------Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// -------Открытие модального окна по клику на элементе галереи.
// -------Подмена значения атрибута src элемента img.lightbox__image.
// -------Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// -------Очистка значения атрибута src элемента img.lightbox__image.
// -------Это необходимо для того, чтобы при следующем открытии модального окна,
//               пока грузится изображение, мы не видели предыдущее.

//                       Дополнительно

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { createCard, deleteCard, renderCards } from './cards.js';
import { openPopup, closePopup } from './modal.js';


const places = document.querySelector('.places__list');

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImg = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const editProfileForm = document.getElementById('edit-profile');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = document.getElementById('name');
const profileJobInput = document.getElementById('description');

const addCardForm = document.getElementById('new-place');
const placeNameInput = document.getElementById('place-name');
const placeUrlInput = document.getElementById('link');

// Обработчик клика по кнопке редактировать профиль
editButton.addEventListener('click', () => {
  profileNameInput.value = profileTitle.textContent.trim();
  profileJobInput.value = profileDescription.textContent.trim();
  openPopup(popupEditProfile);
});

//Обработчик отправки формы редактирования профиля
editProfileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileTitle.textContent = profileNameInput.value.trim();
  profileDescription.textContent = profileJobInput.value.trim();
  closePopup(popupEditProfile);
});

//Обработчик клика по кнопке +
addButton.addEventListener('click', () => openPopup(popupAdd));

// Обработчик отправки формы добавления карточки
addCardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = placeNameInput.value.trim();
  const link = placeUrlInput.value.trim();

  if (name && link) {
      const newCard = createCard({ name, link }, deleteCard);

      // Обработчик клика по popup новой карточки
      newCard.querySelector('.card__image').addEventListener('click', () => {
        popupImg.src = link;
        popupImg.alt = `Изображение места: ${name}`;
        popupCaption.textContent = name;
        openPopup(popupImage);
      });

      places.prepend(newCard);
      closePopup(popupAdd);
      addCardForm.reset();
  }
});

// Обработчик клика по popup с изображением
places.addEventListener('click', (event) => {
  if (event.target.classList.contains('card__image')) {
    const card = event.target.closest('.card');
    const title = card.querySelector('.card__title').textContent;
    const imgLink = event.target.src;
    popupImg.src = imgLink;
    popupImg.alt = `Изображение места: ${title}`;
    popupCaption.textContent = title;
    openPopup(popupImage);
  }
   });

// Общий обработчик закрытия popup по кнопке крестик
document.querySelectorAll('.popup__close').forEach(closeButton => {
  closeButton.addEventListener('click', (event) => {
      closePopup(event.target.closest('.popup'));
  });
});

// Общий обработчик закрытия popup по клику на оверлей
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
        closePopup(popup);
    }
});
});

// закрытие popup по клавише esc
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
          closePopup(openedPopup);
      }
  }
});

// Плавное открытие и закрытие popup
popups.forEach(popup => popup.classList.add('popup_is-animated'));

// Вывод карточек на страницу
renderCards(places);




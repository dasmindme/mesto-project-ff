// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { initialCards } from '../scripts/cards.js';

const places = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template') .content;
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const editProfileForm = document.getElementById('edit-profile');
const addCardForm = document.getElementById('new-place');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileNameInput = document.getElementById('name');
const profileJobInput = document.getElementById('description');

const placeNameInput = document.getElementById('place-name');
const placeUrlInput = document.getElementById('link');

const popupImg = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Функция для создания карточек через template эдемент

function createCard(data, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector('.places__item');
  const img = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const button = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');

  img.src = data.link;
  cardTitle.textContent = data.name;
  img.alt = `Изображение места: ${data.name}`;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active"); // Добавляем/удаляем класс "liked"
});

  button.addEventListener('click', () => deleteCard(card));

  img.addEventListener("click", () => {
  popupImg.src = data.link;
  popupImg.alt = `Изображение места: ${data.name}`;
  popupCaption.textContent = data.name;
  openPopup(popupImage);
   });

  return card;
}

// Функция удаления карточки

function deleteCard(card) {
  card.remove();  
}

// Функция закрытия popup

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose)
}

// Функция откртия popup

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия popup по клавише esc

function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened"); // Находим открытый popup
        closePopup(openedPopup);
  }
  }

//Функция закрытия popup по клику на overlay

function handleOverlayClick(event) {
  if (event.target.classList.contains('popup')) {
      closePopup(event.target);
  }
}

//Обработчик клика по кнопке +

addButton.addEventListener('click', () => openPopup(popupAdd));

// Обработчик отправки формы добавления карточки
addCardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = placeNameInput.value.trim();
  const link = placeUrlInput.value.trim();

  if (name && link) {
      const newCard = createCard({ name, link }, deleteCard);
      places.prepend(newCard);
      closePopup(popupAdd);
      addCardForm.reset();
  }
});

function openEditProfilePopup() {
  profileNameInput.value = profileTitle.textContent; // Заполняем поле "Имя"
  profileJobInput.value = profileDescription.textContent;   // Заполняем поле "Занятие"
  popupEditProfile.classList.add('popup_is-opened');   // Открываем popup
}

function handleProfileFormSubmit(event) {
  event.preventDefault(); // Предотвращаем стандартную отправку формы

  profileTitle.textContent = profileNameInput.value.trim(); // Обновляем имя
  profileDescription.textContent = profileJobInput.value.trim();   // Обновляем занятие

  closePopup(popupEditProfile); // Закрываем popup после сохранения
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

// Обработчик кнопки редактировать профиль
editButton.addEventListener('click', () => openPopup(popupEditProfile));

// Обработчик отправеи формы редаетирования профиля
editProfileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  closePopup(popupEditProfile);
});

// Общий обработчик закрытия popup по кнопке крестик
document.querySelectorAll('.popup__close').forEach(closeButton => {
  closeButton.addEventListener('click', (event) => {
      closePopup(event.target.closest('.popup'));
  });
});

// Общий обработчик закрытия popup по клику на оверлей
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', handleOverlayClick);
});

// Вывод карточек на страницу

initialCards.forEach(data => {
  const card = createCard(data, deleteCard);
  places.append(card);
});




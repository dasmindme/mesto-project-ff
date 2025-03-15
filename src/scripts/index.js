// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { initialCards } from "../scripts/cards.js";

const places = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template') .content;
const addButton = document.querySelector('.profile__add-button');
if (!addButton) {
  console.error("Ошибка: кнопка добавления не найдена!");
}
const editButton = document.querySelector('.profile__edit-button');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
if (!popupAdd) {
  console.error("Ошибка: popup_add не найден в DOM!");
}
const popupImage = document.querySelector('.popup_type_image');

const editProfileForm = document.getElementsByName('edit-profile');
const addCardForm = document.getElementsByName('new-place');

const profileNameInput = document.getElementsByName('name');
const profileJobInput = document.getElementsByName('description');

const placeNameInput = document.getElementsByName('place-name');
const placeUrlInput = document.getElementsByName('link');

const popupImg = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Функция для создания карточек через template эдемент

function createCard(data, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector('.places__item');
  const img = cardElement.querySelector('.card__image');
  const button = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');

  img.src = data.link;
  cardTitle.textContent = data.name;
  img.alt = `Изображение места: ${data.name}`;

  button.addEventListener('click', () => deleteCard(card));

  img.addEventListener("click", () => {
    popupImg.src = data.url;
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
  if (!popup) {
    console.error("Ошибка: popup не найден!");
    return;
}
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия popup по клавише esc

function handleEscClose(event) {
  if (event.key === 'Escape') {
    closePopup();
  }
}

//Функция закрытия popup по клику на overlay

function handleOverlayClick(event) {
  if (event.target.classList.contains("popup")) {
      closePopup(event.target);
  }
}

//Обработчик клика по кнопке +

addButton.addEventListener("click", () => openPopup(popupAdd));

// Обработчик отправки формы добавления карточки
addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = placeNameInput.value.trim();
  const url = placeUrlInput.value.trim();

  if (name && url) {
      const newCard = createCard({ name, url }, deleteCard);
      cardsContainer.prepend(newCard);
      closePopup(popupAdd);
      addCardForm.reset();
  }
});

editButton.addEventListener("click", () => openPopup(popupEditProfile));

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Здесь можно добавить логику обновления профиля
  closePopup(popupEditProfile);
});

// Общий обработчик закрытия popup по кнопке крестик
document.querySelectorAll(".popup__close").forEach(closeButton => {
  closeButton.addEventListener("click", (event) => {
      closePopup(event.target.closest(".popup"));
  });
});

// Общий обработчик закрытия popup по клику на оверлей
document.querySelectorAll(".popup").forEach(popup => {
  popup.addEventListener("click", handleOverlayClick);
});

// Вывод карточек на страницу

initialCards.forEach(data => {
  const card = createCard(data, deleteCard);
  places.append(card);
});

// const numbers = [2, 3, 5];

// // Стрелочная функция. Не запнётся ли на ней Internet Explorer?
// const doubledNumbers = numbers.map(number => number * 2);

// console.log(doubledNumbers); // 4, 6, 10




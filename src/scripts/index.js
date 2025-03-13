// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { initialCards } from "../scripts/cards.js";

const places = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template') .content;
const popup = document.querySelector('.popup');
const addButton = document.querySelector('.profile__add-button');
const popupClose = document.querySelector('popup__close');
const form = document

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

  return card;
}

// Функция удаления карточки

function deleteCard(card) {
  card.remove();
}

// Функция откртия popup

function openPopup() {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия popup

function closePopup() {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose)
}

// Функция закрытия popup по клавише esc

function handleEscClose(event) {
  if (event.key === 'Escape') {
    closePopup();
  }
}

//Функция закрытия popup по клику на overlay

function handleOverlayClick(event) {
  if (event.target === popup) {
    closePopup();
  }
}

//Обработчик клика по кнопке +

addButton.addEventListener('click', openPopup);

// Обработчик клика по кнопке закрытия popup

// popupClose.addEventListener('click', closePopup);

// Вывод карточек на страницу

initialCards.forEach(data => {
  const card = createCard(data, deleteCard);
  places.append(card);
});

// const numbers = [2, 3, 5];

// // Стрелочная функция. Не запнётся ли на ней Internet Explorer?
// const doubledNumbers = numbers.map(number => number * 2);

// console.log(doubledNumbers); // 4, 6, 10




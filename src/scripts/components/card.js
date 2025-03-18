import { openImagePopup } from "..";
const cardTemplate = document.querySelector('#card-template') .content;

// Функция созданя карточки
export function createCard(data, deleteCard, likeCard, onOpenImagePopup) {
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector('.places__item');
  const img = cardElement.querySelector('.card__image');
  const buttonDeleteCard = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');

  img.src = data.link;
  cardTitle.textContent = data.name;
  img.alt = `Изображение места: ${data.name}`;

  img.addEventListener('click', () => {
    onOpenImagePopup(data);
  });

  // Обработчик клика по лайку
  likeButton.addEventListener('click', () => likeCard(likeButton));

  buttonDeleteCard.addEventListener('click', () => deleteCard(card));

  return card;
}

// Функция удаления карточки
export function deleteCard(card) {
  card.remove();  
}

//Функция добавления лайка
export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}
import { container } from "webpack";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardTemplate = document.querySelector('#card-template') .content;

export function createCard(data, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector('.places__item');
  const img = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const button = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');

  img.src = data.link;
  cardTitle.textContent = data.name;
  img.alt = `Изображение места: ${data.name}`;

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
});

  button.addEventListener('click', () => deleteCard(card));

  return card;
}

export function deleteCard(card) {
  card.remove();  
}

export function renderCards(container) {
  initialCards.forEach(data => {
    const card = createCard(data, deleteCard);
    container.appendChild(card);
  });
}

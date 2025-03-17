const cardTemplate = document.querySelector('#card-template') .content;

// Функция созданя карточки
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

  // Обработчик клика по лайку
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
});

  button.addEventListener('click', () => deleteCard(card));

  return card;
}

// Функция удаления карточки
export function deleteCard(card) {
  card.remove();  
}
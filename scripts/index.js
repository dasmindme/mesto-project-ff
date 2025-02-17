// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const places = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template') .content;

function createCard(data, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector('.places__item');
  const img = cardElement.querySelector('.card__image');
  const button = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');

  img.src = data.link;
  cardTitle.textContent = data.name;

  button.addEventListener('click', () => deleteCard(card));

  return card;
}

function deleteCard(card) {
  card.remove();
}

initialCards.forEach(data => {
  const card = createCard(data, deleteCard);
  places.append(card);
});


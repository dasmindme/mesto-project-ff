// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '/pages/index.css';

const places = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template') .content;

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

// Вывод карточек на страницу

initialCards.forEach(data => {
  const card = createCard(data, deleteCard);
  places.append(card);
});

const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10


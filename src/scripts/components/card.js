import { deleteUserCard, likeCard, unlikeCard } from './api.js';

const cardTemplate = document.querySelector('#card-template') .content;

// Функция созданя карточки
export function createCard(data, currentUserId, onOpenImagePopup) {
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector('.places__item');
  const img = cardElement.querySelector('.card__image');
  const buttonDeleteCard = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = card.querySelector('.number-of-likes');

  img.src = data.link;
  cardTitle.textContent = data.name;
  img.alt = `Изображение места: ${data.name}`;
  likeCount.textContent = data.likes.length;

  img.addEventListener('click', () => {
    onOpenImagePopup(data);
  });

  if (data.likes.some(user => user._id === currentUserId)) {
    likeButton.classList.add('card__like-button_active');
  }

  // Обработчик клика по лайку
  likeButton.addEventListener('click', () => {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const checkLikeStage = isLiked ? unlikeCard : likeCard;
    
    checkLikeStage(data._id)
      .then(updatedCard => {
        console.log('Обновлённая карточка:', updatedCard);
        likeCount.textContent = updatedCard.likes.length;

        if (updatedCard.likes.some(user => user._id === currentUserId)) {
          likeButton.classList.add('card__like-button_is-active');
        } else {
          likeButton.classList.remove('card__like-button_is-active');
        }
      })
      .catch(err => console.error('Ошибка при обновлении лайка:', err));
    });

  if (data.owner._id !== currentUserId) {
    buttonDeleteCard.remove();
  } else {
    buttonDeleteCard.addEventListener('click', () => {
      deleteUserCard(data._id)
      .then(() => card.remove())
      .catch(err => 
        console.log('Ошибка при удалении карточки:', err)
      );
    });
  }

  return card;
}
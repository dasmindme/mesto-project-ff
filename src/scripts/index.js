import '../pages/index.css';
import { createCard, likeCard, deleteCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { initialCards } from './components/cards.js';
<<<<<<< HEAD
import { enableValidation } from './components/validation.js';
=======

>>>>>>> e8d558ac2a0ef0d43b59ad711b7326ad5a15169f

const places = document.querySelector('.places__list');

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupOpenImage = document.querySelector('.popup_type_image');
const imageOfPlace = document.querySelector('.popup__image');
const captionOfPlace = document.querySelector('.popup__caption');

const editProfileForm = popupEditProfile.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileJobInput = document.querySelector('.popup__input_type_description');

const addCardForm = popupAddNewCard.querySelector('.popup__form');
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeUrlInput = document.querySelector('.popup__input_type_url');

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
addButton.addEventListener('click', () => openPopup(popupAddNewCard));

// Функция обработчика клика по изображению
export function openImagePopup(data) {
  imageOfPlace.src = data.link;
  imageOfPlace.alt = `На данной картинке ${data.name}`;
  captionOfPlace.textContent = data.name;
  openPopup(popupOpenImage);
}

// Обработчик отправки формы добавления карточки
addCardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = placeNameInput.value.trim();
  const link = placeUrlInput.value.trim();

  if (name && link) {
      const newCard = createCard({ name, link }, deleteCard, likeCard, openImagePopup);

      places.prepend(newCard);
      closePopup(popupAddNewCard);
      addCardForm.reset();
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

// Плавное открытие и закрытие popup
popups.forEach(popup => popup.classList.add('popup_is-animated'));

// Вывод карточек на страницу
initialCards.forEach(data => {
  const card = createCard(data, deleteCard, likeCard, openImagePopup);
  places.appendChild(card);
});

enableValidation();




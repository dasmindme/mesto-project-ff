// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';
import { createCard, deleteCard, renderCards } from './cards.js';
import { openPopup, closePopup } from './modal.js';


const places = document.querySelector('.places__list');

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImg = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const editProfileForm = document.getElementById('edit-profile');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = document.getElementById('name');
const profileJobInput = document.getElementById('description');

const addCardForm = document.getElementById('new-place');
const placeNameInput = document.getElementById('place-name');
const placeUrlInput = document.getElementById('link');

// Функция для создания карточек через template эдемент

// function createCard(data, deleteCard) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const card = cardElement.querySelector('.places__item');
//   const img = cardElement.querySelector('.card__image');
//   const likeButton = cardElement.querySelector('.card__like-button');
//   const button = cardElement.querySelector('.card__delete-button');
//   const cardTitle = cardElement.querySelector('.card__title');

//   img.src = data.link;
//   cardTitle.textContent = data.name;
//   img.alt = `Изображение места: ${data.name}`;

//   likeButton.addEventListener('click', () => {
//     likeButton.classList.toggle('card__like-button_is-active');
// });

//   button.addEventListener('click', () => deleteCard(card));

//   img.addEventListener('click', () => {
//   popupImg.src = data.link;
//   popupImg.alt = `Изображение места: ${data.name}`;
//   popupCaption.textContent = data.name;
//   openPopup(popupImage);
//    });

//   return card;
// }

// Функция удаления карточки

// function deleteCard(card) {
//   card.remove();  
// }

// popups.forEach(popup => popup.classList.add('popup_is-animated'));

// Функция закрытия popup

// function closePopup(popup) {
//   popup.classList.remove('popup_is-opened');
//   document.removeEventListener('keydown', handleEscClose)
// }

// // Функция открытия popup

// function openPopup(popup) {
//   popup.classList.add('popup_is-opened');
//   document.addEventListener('keydown', handleEscClose);
// }

// // Функция закрытия popup по клавише esc

// function handleEscClose(event) {
//   if (event.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_is-opened');
//         closePopup(openedPopup);
//   }
//   }

// //Функция закрытия popup по клику на overlay

// function handleOverlayClick(event) {
//   if (event.target.classList.contains('popup')) {
//       closePopup(event.target);
//   }
// }

// Обработчик клика по кнопке редактировать профиль
editButton.addEventListener('click', () => {
  profileNameInput.value = profileTitle.textContent.trim();
  profileJobInput.value = profileDescription.textContent.trim();
  openPopup(popupEditProfile);
});

//Обработчик отправки формы редактирования профиля
editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = profileNameInput.value.trim();
  profileJob.textContent = profileJobInput.value.trim();
  closePopup(popupEditProfile);
});

//Обработчик клика по кнопке +

addButton.addEventListener('click', () => openPopup(popupAdd));

// Обработчик отправки формы добавления карточки
addCardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = placeNameInput.value.trim();
  const link = placeUrlInput.value.trim();

  if (name && link) {
      const newCard = createCard({ name, link }, deleteCard);

      newCard.querySelector('.card__image').addEventListener('click', () => {
        popupImg.src = data.link;
        popupImg.alt = `Изображение места: ${data.name}`;
        popupCaption.textContent = data.name;
        openPopup(popupImage);
      });

      places.prepend(newCard);
      closePopup(popupAdd);
      addCardForm.reset();
  }
});

places.addEventListener('click', (event) => {
  if (event.target.classList.contains('.card__image')) {
    const card = event.target.closest(".card");
    const title = card.querySelector(".card__title").textContent;
    const imgSrc = event.target.link;
    popupImg.src = imgSrc;
    popupImg.alt = `Изображение места: ${title}`;
    popupCaption.textContent = title;
    openPopup(popupImage);
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

// закрытие popup по клавише esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      if (openedPopup) {
          closePopup(openedPopup);
      }
  }
});

popups.forEach(popup => popup.classList.add('popup_is-animated'));

// Вывод карточек на страницу

renderCards(places);

// initialCards.forEach(data => {
//   const card = createCard(data, deleteCard);
//   places.append(card);
// });




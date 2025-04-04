import '../pages/index.css';
import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getAllCards, updateUserData, addNewPlaceCard, getUserData, updateAvatar } from './components/api.js';

const places = document.querySelector('.places__list');

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const avatarButton = document.querySelector('.profile__avatar-container');

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupUpdateAvatar = document.querySelector('.popup_type_avatar');
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

const avatarUpdateForm = popupUpdateAvatar.querySelector('.popup__form');
const avatarUrlInput = document.querySelector('.popup__input_type_url_avatar');
const profileImage = document.querySelector('.profile__image');

const saveAvatarButton = avatarUpdateForm.querySelector('.popup__button');
const saveProfileButton = editProfileForm.querySelector('.popup__button');
const createCardButton = addCardForm.querySelector('.popup__button');

const validationConfig  = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let currentUserId = null;

// Валидация форм
enableValidation(validationConfig);

// Обработчик клика по кнопке редактировать профиль
editButton.addEventListener('click', () => {
  profileNameInput.value = profileTitle.textContent.trim();
  profileJobInput.value = profileDescription.textContent.trim();
  clearValidation(popupEditProfile, validationConfig);
  openPopup(popupEditProfile);
});

//Обработчик отправки формы редактирования профиля
editProfileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = profileNameInput.value.trim();
  const about = profileJobInput.value.trim();

  renderLoading(true, saveProfileButton);

  updateUserData(name, about)
  .then((userData) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    closePopup(popupEditProfile);
  })
  .catch((err) => {
    console.error('Ошибка при обновлении профиля:', err);
  })
  .finally(() => {
    renderLoading(false, saveProfileButton);
  });
});

// Обработчик отправки формы аватара
avatarUpdateForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const link = avatarUrlInput.value.trim();

  renderLoading(true, saveAvatarButton);

  updateAvatar(link)
  .then((data) => {
    profileImage.style.backgroundImage = `url(${data.avatar})`;;
    closePopup(popupUpdateAvatar);
  })
  .catch((err) => {
    console.error('Ошибка при обновлении аватара:', err);
  })
  .finally(() => {
    renderLoading(false, saveAvatarButton);
  });
})

// Обработчик клика по аватару
avatarButton.addEventListener('click', () => {
  avatarUpdateForm.reset();
  clearValidation(avatarUpdateForm, validationConfig);
  openPopup(popupUpdateAvatar)
})

//Обработчик клика по кнопке +
addButton.addEventListener('click', () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openPopup(popupAddNewCard)
});

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

  renderLoading(true, createCardButton);

  addNewPlaceCard(name, link)
.then((data) => {
    const newCard = createCard(data, currentUserId, openImagePopup);

    places.prepend(newCard);
    closePopup(popupAddNewCard);
    addCardForm.reset();
})
.catch((err) => {
  console.error('Ошибка при добавлении карточки:', err);
})
.finally(() => {
  renderLoading(false, createCardButton);
});
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

// Инициализация карточек при загрузке страницы и получение данных пользователя
Promise.all([getUserData(), getAllCards()])
.then(([userData, cards]) => {
  currentUserId = userData._id;
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`

  cards.forEach(data => {
    const card = createCard(data, currentUserId, openImagePopup);
    places.appendChild(card);
  });
})
.catch(err => {
  console.error('Не удалось загрузить карточки:', err);
});

// Функция отображения загрузки
function renderLoading(isLoading, buttonElement, defaultText = 'Сохранить') {
  buttonElement.textContent = isLoading ? 'Сохранение...' : defaultText;
}






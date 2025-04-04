/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

// UNUSED EXPORTS: openImagePopup

;// ./src/scripts/components/api.js
var config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
  headers: {
    authorization: 'f2e429fe-92b5-47a5-ab94-e1904181ead7',
    'Content-Type': 'application/json'
  }
};

// Получение карточек с сервера
var getAllCards = function getAllCards() {
  return fetch("".concat(config.baseUrl, "/cards"), {
    method: 'GET',
    headers: config.headers
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
  });
};

// Обновление данных пользователя
var updateUserData = function updateUserData(name, about) {
  return fetch("".concat(config.baseUrl, "/users/me"), {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
  });
};

// Добавление новой карточки на серер
var addNewPlaceCard = function addNewPlaceCard(name, link) {
  return fetch("".concat(config.baseUrl, "/cards"), {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
  });
};

// Получение данных пользователя 
var getUserData = function getUserData() {
  return fetch("".concat(config.baseUrl, "/users/me"), {
    headers: config.headers
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
  });
};

// Удаление карточки созданной пользователем
var deleteUserCard = function deleteUserCard(cardId) {
  return fetch("".concat(config.baseUrl, "/cards/").concat(cardId), {
    method: 'DELETE',
    headers: config.headers
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
  });
};

// Лайк карточки
var likeCard = function likeCard(cardId) {
  return fetch("".concat(config.baseUrl, "/cards/likes/").concat(cardId), {
    method: 'PUT',
    headers: config.headers
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
  });
};

// Удаление лайка с карточки
var unlikeCard = function unlikeCard(cardId) {
  return fetch("".concat(config.baseUrl, "/cards/likes/").concat(cardId), {
    method: 'DELETE',
    headers: config.headers
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
  });
};

// Обновление аватара пользователя
var updateAvatar = function updateAvatar(avatar) {
  return fetch("".concat(config.baseUrl, "/users/me/avatar"), {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
  });
};
;// ./src/scripts/components/card.js

var cardTemplate = document.querySelector('#card-template').content;

// Функция созданя карточки
function createCard(data, currentUserId, onOpenImagePopup) {
  var cardElement = cardTemplate.cloneNode(true);
  var card = cardElement.querySelector('.places__item');
  var img = cardElement.querySelector('.card__image');
  var buttonDeleteCard = cardElement.querySelector('.card__delete-button');
  var cardTitle = cardElement.querySelector('.card__title');
  var likeButton = cardElement.querySelector('.card__like-button');
  var likeCount = card.querySelector('.number-of-likes');
  img.src = data.link;
  cardTitle.textContent = data.name;
  img.alt = "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043C\u0435\u0441\u0442\u0430: ".concat(data.name);
  likeCount.textContent = data.likes.length;
  img.addEventListener('click', function () {
    onOpenImagePopup(data);
  });
  if (data.likes.some(function (user) {
    return user._id === currentUserId;
  })) {
    likeButton.classList.add('card__like-button_active');
  }

  // Обработчик клика по лайку
  likeButton.addEventListener('click', function () {
    var isLiked = likeButton.classList.contains('card__like-button_is-active');
    var checkLikeStage = isLiked ? unlikeCard : likeCard;
    checkLikeStage(data._id).then(function (updatedCard) {
      console.log('Обновлённая карточка:', updatedCard);
      likeCount.textContent = updatedCard.likes.length;
      if (updatedCard.likes.some(function (user) {
        return user._id === currentUserId;
      })) {
        likeButton.classList.add('card__like-button_is-active');
      } else {
        likeButton.classList.remove('card__like-button_is-active');
      }
    }).catch(function (err) {
      return console.error('Ошибка при обновлении лайка:', err);
    });
  });
  if (data.owner._id !== currentUserId) {
    buttonDeleteCard.remove();
  } else {
    buttonDeleteCard.addEventListener('click', function () {
      deleteUserCard(data._id).then(function () {
        return card.remove();
      }).catch(function (err) {
        return console.log('Ошибка при удалении карточки:', err);
      });
    });
  }
  return card;
}
;// ./src/scripts/components/modal.js
// Функция закрытия popup

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEscPopup);
}

// Функция открытия popup

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEscPopup);
}
function closeEscPopup(e) {
  if (e.key === 'Escape') {
    var popup = document.querySelector('.popup_is-opened');
    closePopup(popup);
  }
}
;// ./src/scripts/components/validation.js
var allowedTextRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;

// Функция для отображения ошибки
var showInputError = function showInputError(formElement, inputElement, validationConfig) {
  var errorElement = formElement.querySelector(".".concat(inputElement.id, "-error"));
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = getErrorMessage(inputElement);
  errorElement.classList.add(validationConfig.errorClass);
};

// Функция для скрытия ошибки
var hideInputError = function hideInputError(formElement, inputElement, validationConfig) {
  var errorElement = formElement.querySelector(".".concat(inputElement.id, "-error"));
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

// Функция получения ошибки
var getErrorMessage = function getErrorMessage(input) {
  var value = input.value.trim();
  if (input.name === 'name' && (value.length < 2 || value.length > 40)) {
    return 'Имя должно быть от 2 до 40 символов.';
  }
  if (input.name === 'description' && (value.length < 2 || value.length > 200)) {
    return 'О себе должно быть от 2 до 200 символов.';
  }
  if (input.name === 'place-name' && (value.length < 2 || value.length > 30)) {
    return 'О себе должно быть от 2 до 30 символов.';
  }
  if (input.type === 'text') {
    if (!allowedTextRegex.test(value)) {
      return 'Разрешены только буквы, пробел и дефис.';
    }
  }
  return input.validationMessage;
};

// Функция проверки валидности поля
var checkInputValidity = function checkInputValidity(formElement, inputElement, validationConfig) {
  if (!inputElement.validity.valid || !allowedTextRegex.test(inputElement.value.trim())) {
    showInputError(formElement, inputElement, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// Функция для поиска невалидного поля
var hasInvalidInput = function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    var errorMessage = getErrorMessage(inputElement);
    return !!errorMessage;
  });
};

// Функция деактивации кнопки
var toggleButtonState = function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// Обработчики событий для полей
var setEventListeners = function setEventListeners(formElement, validationConfig) {
  var inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  var buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// Функция очистки ошибок валидации
var clearValidation = function clearValidation(formElement, validationConfig) {
  var inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  var buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach(function (inputElement) {
    hideInputError(formElement, inputElement, validationConfig);
  });
  toggleButtonState(inputList, buttonElement, validationConfig);
};

// Функция активации валидации
var enableValidation = function enableValidation(validationConfig) {
  var formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
};
;// ./src/scripts/index.js
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var places = document.querySelector('.places__list');
var addButton = document.querySelector('.profile__add-button');
var editButton = document.querySelector('.profile__edit-button');
var avatarButton = document.querySelector('.profile__avatar-container');
var popups = document.querySelectorAll('.popup');
var popupEditProfile = document.querySelector('.popup_type_edit');
var popupAddNewCard = document.querySelector('.popup_type_new-card');
var popupUpdateAvatar = document.querySelector('.popup_type_avatar');
var popupOpenImage = document.querySelector('.popup_type_image');
var imageOfPlace = document.querySelector('.popup__image');
var captionOfPlace = document.querySelector('.popup__caption');
var editProfileForm = popupEditProfile.querySelector('.popup__form');
var profileTitle = document.querySelector('.profile__title');
var profileDescription = document.querySelector('.profile__description');
var profileNameInput = document.querySelector('.popup__input_type_name');
var profileJobInput = document.querySelector('.popup__input_type_description');
var addCardForm = popupAddNewCard.querySelector('.popup__form');
var placeNameInput = document.querySelector('.popup__input_type_card-name');
var placeUrlInput = document.querySelector('.popup__input_type_url');
var avatarUpdateForm = popupUpdateAvatar.querySelector('.popup__form');
var avatarUrlInput = document.querySelector('.popup__input_type_url_avatar');
var profileImage = document.querySelector('.profile__image');
var saveAvatarButton = avatarUpdateForm.querySelector('.popup__button');
var saveProfileButton = editProfileForm.querySelector('.popup__button');
var createCardButton = addCardForm.querySelector('.popup__button');
var validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
var currentUserId = null;

// Валидация форм
enableValidation(validationConfig);

// Обработчик клика по кнопке редактировать профиль
editButton.addEventListener('click', function () {
  profileNameInput.value = profileTitle.textContent.trim();
  profileJobInput.value = profileDescription.textContent.trim();
  clearValidation(popupEditProfile, validationConfig);
  openPopup(popupEditProfile);
});

//Обработчик отправки формы редактирования профиля
editProfileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var name = profileNameInput.value.trim();
  var about = profileJobInput.value.trim();
  renderLoading(true, saveProfileButton);
  updateUserData(name, about).then(function (userData) {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    closePopup(popupEditProfile);
  }).catch(function (err) {
    console.error('Ошибка при обновлении профиля:', err);
  }).finally(function () {
    renderLoading(false, saveProfileButton);
  });
});

// Обработчик отправки формы аватара
avatarUpdateForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var link = avatarUrlInput.value.trim();
  renderLoading(true, saveAvatarButton);
  updateAvatar(link).then(function (data) {
    profileImage.style.backgroundImage = "url(".concat(data.avatar, ")");
    ;
    closePopup(popupUpdateAvatar);
  }).catch(function (err) {
    console.error('Ошибка при обновлении аватара:', err);
  }).finally(function () {
    renderLoading(false, saveAvatarButton);
  });
});

// Обработчик клика по аватару
avatarButton.addEventListener('click', function () {
  avatarUpdateForm.reset();
  clearValidation(avatarUpdateForm, validationConfig);
  openPopup(popupUpdateAvatar);
});

//Обработчик клика по кнопке +
addButton.addEventListener('click', function () {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openPopup(popupAddNewCard);
});

// Функция обработчика клика по изображению
function openImagePopup(data) {
  imageOfPlace.src = data.link;
  imageOfPlace.alt = "\u041D\u0430 \u0434\u0430\u043D\u043D\u043E\u0439 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0435 ".concat(data.name);
  captionOfPlace.textContent = data.name;
  openPopup(popupOpenImage);
}

// Обработчик отправки формы добавления карточки
addCardForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var name = placeNameInput.value.trim();
  var link = placeUrlInput.value.trim();
  renderLoading(true, createCardButton);
  addNewPlaceCard(name, link).then(function (data) {
    var newCard = createCard(data, currentUserId, openImagePopup);
    places.prepend(newCard);
    closePopup(popupAddNewCard);
    addCardForm.reset();
  }).catch(function (err) {
    console.error('Ошибка при добавлении карточки:', err);
  }).finally(function () {
    renderLoading(false, createCardButton);
  });
});

// Общий обработчик закрытия popup по кнопке крестик
document.querySelectorAll('.popup__close').forEach(function (closeButton) {
  closeButton.addEventListener('click', function (event) {
    closePopup(event.target.closest('.popup'));
  });
});

// Общий обработчик закрытия popup по клику на оверлей
document.querySelectorAll('.popup').forEach(function (popup) {
  popup.addEventListener('click', function (event) {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

// Плавное открытие и закрытие popup
popups.forEach(function (popup) {
  return popup.classList.add('popup_is-animated');
});

// Инициализация карточек при загрузке страницы и получение данных пользователя
Promise.all([getUserData(), getAllCards()]).then(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    userData = _ref2[0],
    cards = _ref2[1];
  currentUserId = userData._id;
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = "url(".concat(userData.avatar, ")");
  cards.forEach(function (data) {
    var card = createCard(data, currentUserId, openImagePopup);
    places.appendChild(card);
  });
}).catch(function (err) {
  console.error('Не удалось загрузить карточки:', err);
});

// Функция отображения загрузки
function renderLoading(isLoading, buttonElement) {
  var defaultText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Сохранить';
  buttonElement.textContent = isLoading ? 'Сохранение...' : defaultText;
}
/******/ })()
;
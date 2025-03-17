// Функция закрытия popup

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

// Функция открытия popup

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

// Общий обработчик закрытия popup по клику на оверлей
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
        closePopup(popup);
    }
});
});

// закрытие popup по клавише esc
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
          closePopup(openedPopup);
      }
  }
});
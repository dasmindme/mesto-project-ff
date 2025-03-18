// Функция закрытия popup

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEscPopup);
}

// Функция открытия popup

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEscPopup);
}

function closeEscPopup(e) { 
  if(e.key === 'Escape') { 
   const popup = document.querySelector('.popup_is-opened');
   closePopup(popup) ;
  } 
 }
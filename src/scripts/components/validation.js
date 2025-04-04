const allowedTextRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;

// Функция для отображения ошибки
const showInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = getErrorMessage(inputElement);
  errorElement.classList.add(validationConfig.errorClass);
}

// Функция для скрытия ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

// Функция получения ошибки
const getErrorMessage = (input) => {
  const value = input.value.trim();

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
}


// Функция проверки валидности поля
const checkInputValidity = (formElement, inputElement, validationConfig) => {

  if (!inputElement.validity.valid || !allowedTextRegex.test(inputElement.value.trim())) {
    showInputError(formElement, inputElement, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}; 

// Функция для поиска невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      const errorMessage = getErrorMessage(inputElement);
      return !!errorMessage;
  });
}

// Функция деактивации кнопки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
        buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// Обработчики событий для полей
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// Функция очистки ошибок валидации
export const clearValidation = (formElement, validationConfig) => {
  
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });

  toggleButtonState(inputList, buttonElement, validationConfig);
}

// Функция активации валидации
export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {

    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
};
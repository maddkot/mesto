/* ВАЛИДАЦИЯ*/
//переменная, содержащая внутри объект значений (ключ-значение)
const objectWithSelectors = {
  inputErrorClass: 'popup__input_type-error',
  activeErrorClass: 'popup__input-error_active',
  popupInput: '.popup__input',
  popupButtonSave: '.popup__button-save',
  popupButtonSaveInactive: 'popup__button-save_inactive',
  popupForm: '.popup__form'  
};
/* начало*/
//функция показа сообщения об ошибке
function showInputError(formElement, inputElement, errorMessage, objectWithSelectors) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(objectWithSelectors.inputErrorClass /*'popup__input_type-error'*/);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objectWithSelectors.activeErrorClass /*'popup__input-error_active'*/);
}

//функция скрытия сообщения об ошибке
function hideInputError(formElement, inputElement, objectWithSelectors) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(objectWithSelectors.inputErrorClass /*'popup__input_type-error'*/ );
  errorElement.classList.remove(objectWithSelectors.activeErrorClass /*'popup__input-error_active'*/);
  errorElement.textContent = '';
}

//функция проверки валидности
function checkInputValidity(formElement, inputElement, objectWithSelectors) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, objectWithSelectors);
  } else {
    hideInputError(formElement, inputElement, objectWithSelectors);
  }
}

// функция создания и перебора массива из всех импутов формы с перебором этого массива и установлением слушателя с функцией првоерки валидности и функцией изменения состояния кнопки
function setEventListeners(formElement, objectWithSelectors) {
  const inputList = Array.from(formElement.querySelectorAll(objectWithSelectors.popupInput /*'.popup__input'*/)
  );
  const buttonElement = formElement.querySelector(objectWithSelectors.popupButtonSave /*'.popup__button-save'*/
  );
  toggleButtonState(inputList, buttonElement, objectWithSelectors.popupButtonSaveInactive); // к сожалению не могу побороть настрйоку vs - при автосохранении программа сама переносит код на новые строчки :( 
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, objectWithSelectors);
      toggleButtonState(inputList, buttonElement, objectWithSelectors.popupButtonSaveInactive);
    });
  });
  //formElement.addEventListener('input', () => checkInputValidity(formElement, buttonElement, objectWithSelectors.popupButtonSaveInactive));
}

// функция создания массива из всех форм на странице, с перебором и установкой слушателя с отменой отправки формы +
function enableValidation(objectWithSelectors) {
  const formList = Array.from(document.querySelectorAll(objectWithSelectors.popupForm /*'.popup__form'*/)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, objectWithSelectors);
  });
}

// функция, которая проверяет прохождение валидности в каждом поле и возвращает результат проверки
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// функцияизменения состояния кнопки в модальных окнах в зависимости от прохождения/ не прохожждения валидации
function toggleButtonState(inputList, submitElement) {
  if (hasInvalidInput(inputList)) {
    submitElement.classList.add(objectWithSelectors.popupButtonSaveInactive /*'popup__button-save_inactive'*/ );
    submitElement.setAttribute('disabled', true);
  } else {
    submitElement.classList.remove(objectWithSelectors.popupButtonSaveInactive /*'popup__button-save_inactive'*/);
    submitElement.removeAttribute('disabled');
  }
}
enableValidation(objectWithSelectors);

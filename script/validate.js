/* ВАЛИДАЦИЯ*/
//переменная, содержащая внутри объект значений (ключ-значение)
const objectWithSelectors = {
  inputErrorClass: 'popup__input_type-error',
  activeErrorClass: 'popup__input-error_active',
  popupInput: '.popup__input',
  popupButtonSave: '.popup__button-save',
  popupButtonSaveInactive: 'popup__button-save_inactive',
  popupForm: '.popup__form',
};

//функция показа сообщения об ошибке
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(
    objectWithSelectors.inputErrorClass /*'popup__input_type-error'*/
  );
  errorElement.textContent = errorMessage;
  errorElement.classList.add(
    objectWithSelectors.activeErrorClass /*'popup__input-error_active'*/
  );
}

//функция скрытия сообщения об ошибке
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(
    objectWithSelectors.inputErrorClass /*'popup__input_type-error'*/
  );
  errorElement.classList.remove(
    objectWithSelectors.activeErrorClass /*'popup__input-error_active'*/
  );
  errorElement.textContent = '';
}

//функция проверки валидности
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// функция создания и перебора массива из всех импутов формы с перебором этого массива и установлением слушателя с функцией првоерки валидности и функцией изменения состояния кнопки
function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(
      objectWithSelectors.popupInput /*'.popup__input'*/
    )
  );
  const buttonElement = formElement.querySelector(
    objectWithSelectors.popupButtonSave /*'.popup__button-save'*/
  );
  toggleButtonState(
    inputList,
    buttonElement,
    objectWithSelectors.popupButtonSaveInactive
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(
        inputList,
        buttonElement,
        objectWithSelectors.popupButtonSaveInactive
      );
    });
  });
}

// функция создания массива из всех форм на странице, с перебором и установкой слушателя с отменой отправки формы +
function enableValidation() {
  const formList = Array.from(
    document.querySelectorAll(objectWithSelectors.popupForm /*'.popup__form'*/)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

// функция, которая проверяет прохождение валидности в каждом поле и возвращает результат проверки
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// функцияизменения состояния кнопки в модальных окнах в зависимости от прохождения/ не прохожждения валидации
function toggleButtonState(
  inputList,
  submitElement /*, popupButtonSaveInactive*/
) {
  if (hasInvalidInput(inputList)) {
    submitElement.classList.add(
      objectWithSelectors.popupButtonSaveInactive /*'popup__button-save_inactive'*/
    );
    submitElement.setAttribute('disabled', true);
  } else {
    submitElement.classList.remove(
      objectWithSelectors.popupButtonSaveInactive /*'popup__button-save_inactive'*/
    );
    submitElement.removeAttribute('disabled');
  }
}

//enableValidation();

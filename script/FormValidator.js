export class FormValidator {

  constructor(formElement, objectWithSelectors) {
      this._formElement = formElement;
      this._objectWithSelectors = objectWithSelectors;      
  }

  _showInputError = (inputElement, errorMessage) => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._objectWithSelectors.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._objectWithSelectors.activeErrorClass);
  }

  //функция сброса состояния ошибок
  resetInputError() {
      this._allInput = Array.from(this._formElement.querySelectorAll(this._objectWithSelectors.popupInput));
      this._allInput.forEach((inputElement) => {
      const errorElement =  this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._objectWithSelectors.inputErrorClass);
      errorElement.classList.remove(this._objectWithSelectors.activeErrorClass);
      errorElement.textContent = '';    
      });
      this._resetButtonState();
  }

//функция проверки валидности
  _checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage, this._objectWithSelectors);
      } else {
          this.resetInputError(inputElement, this._objectWithSelectors);
      }
  }

// функция создания и перебора массива из всех импутов формы с перебором этого массива и установлением слушателя с функцией првоерки валидности и функцией изменения состояния кнопки
  _setEventListeners = () => {
      const inputList = Array.from(this._formElement.querySelectorAll(this._objectWithSelectors.popupInput));
      const buttonElement = this._formElement.querySelector(this._objectWithSelectors.popupButtonSave);
      this._toggleButtonState(inputList, buttonElement, this._objectWithSelectors.popupButtonSaveInactive); // к сожалению не могу побороть настрйоку vs - при автосохранении программа сама переносит код на новые строчки :(
      inputList.forEach((inputElement) => {
          this.resetInputError(inputElement);
          inputElement.addEventListener('input', () => {
              this._checkInputValidity(inputElement, this._objectWithSelectors);
              this._toggleButtonState(inputList, buttonElement, this._objectWithSelectors.popupButtonSaveInactive);
          });
      });
  }

// метод включения валидации формы
  enableValidation = () => {      
      this._setEventListeners(this._objectWithSelectors);
  }

// функция, которая проверяет прохождение валидности в каждом поле и возвращает результат проверки
  _hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
      });
  }

// функция изменения состояния кнопки в модальных окнах в зависимости от прохождения/ не прохожждения валидации
  _toggleButtonState = (inputList, submitElement) => {
      if (this._hasInvalidInput(inputList)) {
          submitElement.classList.add(this._objectWithSelectors.popupButtonSaveInactive);
          submitElement.setAttribute('disabled', true);
      } else {
          submitElement.classList.remove(this._objectWithSelectors.popupButtonSaveInactive);
          submitElement.removeAttribute('disabled');
      }
  }
  
  //функция сброса состояния кнопки
 _resetButtonState() {
    const button = this._formElement.querySelector(this._objectWithSelectors.popupButtonSave);
    if (button.classList.contains('popup__button-save_form_add')) {
      button.classList.add(this._objectWithSelectors.popupButtonSaveInactive);
      button.setAttribute('disabled', true);
    } else {
      button.classList.remove(this._objectWithSelectors.popupButtonSaveInactive);
      button.removeAttribute('disabled');
    }
    }
}

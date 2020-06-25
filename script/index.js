/* ---------
СПАСИБО БОЛЬШОЕ ЗА РЕВЬЮ!!! 
Скорость Вашей работы заставляет восхищаться и благодарить за сохраненно время 
Я постарался учесть Все Ваши комментарии и правки.
Спасибо за достаточно понятные комментарии. Все (кроме одной правки) я понял сразу, как исправить.
С выносом карточки валидации - возникли проблемы. =)
----------- */

import { Card } from './Card.js';
import { initialCards } from './arrayInitialCards.js';
import { openPopup, closePopup } from './utilits.js';
import { FormValidator } from './FormValidator.js';

const profileEditButton = document.querySelector('.profile__edit-button'); //кнопка редактирование профиля
const popupEditProfile = document.querySelector('.popup_edit-profile'); // окно редактирование профиля
const popupFormEditProfile = document.querySelector('.popup__form_edit-profile'); // вся форма попап редактирования профиля
const fullName = document.querySelector('.profile__full-name'); //имя профиля
const description = document.querySelector('.profile__description'); // подпись профиля
const popupFullName = document.querySelector('.popup__input_full-name'); //значения имени в попап профиля
const popupDescription = document.querySelector('.popup__input_description'); //значения подписи в попап профиля
const addButton = document.querySelector('.profile__add-button'); // кнопка добавление карточек
const popupAddForm = document.querySelector('.popup_add-form'); //попап добавления*/
const elementCardField = document.querySelector('.elements'); //выбираем весь блок с карточками
const popupTitle = document.querySelector('.popup__input_title'); // значение подписи в попап добавления карточки
const popupUrl = document.querySelector('.popup__input_url'); // значение адреса в попап добавления карточки
const popupAddCard = document.querySelector('.popup__form_add'); // вся форма попап добавления новых карточек
const elementTemplate = document.querySelector('.element-template');
/* В перспективе подумать, чтобы перенести все константы в отдельный файл и передать как объект с ключем/значением.*/

//переменная, содержащая внутри объект значений (ключ-значение)
const objectWithSelectors = {
  inputErrorClass: 'popup__input_type-error',
  activeErrorClass: 'popup__input-error_active',
  popupInput: '.popup__input',
  popupButtonSave: '.popup__button-save',
  popupButtonSaveInactive: 'popup__button-save_inactive',
  popupForm: '.popup__form'  
};

//переменные классов валидации
const popupEditProfileValid = new FormValidator(popupEditProfile, objectWithSelectors);
const popupAddFormValid = new FormValidator(popupAddCard, objectWithSelectors);

//вызов метода валидации
popupEditProfileValid.enableValidation();
popupAddFormValid.enableValidation();

//функция сброса состояния кнопки
function resetButtonState(form) {
  const button = form.querySelector(objectWithSelectors.popupButtonSave);
  if (button.classList.contains('popup__button-save_form_add')) {
    button.classList.add(objectWithSelectors.popupButtonSaveInactive);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(objectWithSelectors.popupButtonSaveInactive);
    button.removeAttribute('disabled');
  }
}

//функция сброса состояния ошибок
function resetInputError(form) {
  const inputElement = Array.from(form.querySelectorAll(objectWithSelectors.popupInput));

  inputElement.forEach((inputElement) => {
    const errorElement = form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(objectWithSelectors.inputErrorClass);
    errorElement.classList.remove(objectWithSelectors.activeErrorClass);
    errorElement.textContent = '';
  });
}

/* Функция открытия и закрытия окна редактирования профиля
 добавляет текст из модального окна на страницу*/
function openProfilePopup() {  
  popupFullName.value = fullName.textContent; 
  popupDescription.value = description.textContent;  
  resetButtonState(popupEditProfile);
  resetInputError(popupEditProfile);
  openPopup(popupEditProfile);  
} 

/* Функция изменения информации на странице профиля через модальное окно с получением информации, отображаемой на странице
Получает информацию со страницы и вставляет в модальное окно*/
function saveProfile(event) {
  event.preventDefault();
  fullName.textContent = popupFullName.value;
  description.textContent = popupDescription.value;   
  closePopup(popupEditProfile);
}

/* Функция открытия модального окна добавления элементов с картинками*/
function modalAddForm() {  
  popupAddCard.reset();
  resetInputError(popupAddForm);
  resetButtonState(popupAddForm);
  openPopup(popupAddForm);   
}

/*Выполнение перебора массива и выполнение для каждого элемента функции*/
(function firstLoadingCards() {
  initialCards.forEach((element) => {
    elementCardField.append(new Card(element.link, element.name, elementTemplate).createCard());
  });
})();

/*функция добавления новой карточки из модального окна*/
function addCard(event) {
  event.preventDefault();
  elementCardField.prepend(new Card(popupUrl.value, popupTitle.value, elementTemplate).createCard());
  modalAddForm();
  closePopup(popupAddForm);  
}

/*-----СЛУШАТЕЛИ СОБЫТИЙ-----*/
profileEditButton.addEventListener('click', openProfilePopup); // слушатель кнопки редактирования профиля
popupFormEditProfile.addEventListener('submit', saveProfile); // слушатель кнопки сохранить попап редактирования профиля
addButton.addEventListener('click', modalAddForm); // слушатель кнопки добавления карточек
popupAddCard.addEventListener('submit', addCard /*(elementCardField)*/); //слушатель на кнопке сoздать с функцией добавления карточки



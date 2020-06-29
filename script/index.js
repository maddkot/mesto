/* ---------
Постарался исправить Ваше замечание. надеюсь, что правильно Вас понял. 
Вне зависимости . сдам я работу или нет - спасибо огромнео за ревью!
----------- */

import { Card } from './Card.js';
import { initialCards } from './arrayInitialCards.js';
import { openPopup, closePopup } from './utilits.js';
import { FormValidator } from './FormValidator.js';

//объект с переменными
const arrayVariables = {
  profileEditButton: document.querySelector('.profile__edit-button'), //кнопка редактирование профиля
  popupEditProfile: document.querySelector('.popup_edit-profile'), // окно редактирование профиля
  popupFormEditProfile: document.querySelector('.popup__form_edit-profile'), // вся форма попап редактирования профиля
  fullName: document.querySelector('.profile__full-name'), //имя профиля
  description: document.querySelector('.profile__description'), // подпись профиля
  popupFullName: document.querySelector('.popup__input_full-name'), //значения имени в попап профиля
  popupDescription: document.querySelector('.popup__input_description'), //значения подписи в попап профиля
  addButton: document.querySelector('.profile__add-button'), // кнопка добавление карточек
  popupAddForm: document.querySelector('.popup_add-form'), //попап добавления*/
  elementCardField: document.querySelector('.elements'), //выбираем весь блок с карточками
  popupTitle: document.querySelector('.popup__input_title'), // значение подписи в попап добавления карточки
  popupUrl: document.querySelector('.popup__input_url'), // значение адреса в попап добавления карточки
  popupAddCard: document.querySelector('.popup__form_add'), // вся форма попап добавления новых карточек
  elementTemplate: document.querySelector('.element-template')
}

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
const popupEditProfileValid = new FormValidator(arrayVariables.popupEditProfile, objectWithSelectors);
const popupAddFormValid = new FormValidator(arrayVariables.popupAddCard, objectWithSelectors);

//вызов метода валидации
popupEditProfileValid.enableValidation();
popupAddFormValid.enableValidation();

/* Функция открытия и закрытия окна редактирования профиля
 добавляет текст из модального окна на страницу*/
function openProfilePopup() {  
  arrayVariables.popupFullName.value = arrayVariables.fullName.textContent; 
  arrayVariables.popupDescription.value = arrayVariables.description.textContent;  
  popupEditProfileValid.resetInputError();  
  openPopup(arrayVariables.popupEditProfile);  
} 

/* Функция изменения информации на странице профиля через модальное окно с получением информации, отображаемой на странице
Получает информацию со страницы и вставляет в модальное окно*/
function saveProfile(event) {
  event.preventDefault();
  arrayVariables.fullName.textContent = arrayVariables.popupFullName.value;
  arrayVariables.description.textContent = arrayVariables.popupDescription.value;   
  closePopup(arrayVariables.popupEditProfile);
}

/* Функция открытия модального окна добавления элементов с картинками*/
function modalAddForm() {  
  arrayVariables.popupAddCard.reset();
  popupAddFormValid.resetInputError();
  openPopup(arrayVariables.popupAddForm);   
}

/*Выполнение перебора массива и выполнение для каждого элемента функции*/
(function firstLoadingCards() {
  initialCards.forEach((element) => {
    arrayVariables.elementCardField.append(new Card(element.link, element.name, arrayVariables.elementTemplate).createCard());
  });
})();

/*функция добавления новой карточки из модального окна*/
function addCard(event) {
  event.preventDefault();
  arrayVariables.elementCardField.prepend(new Card(arrayVariables.popupUrl.value, arrayVariables.popupTitle.value, arrayVariables.elementTemplate).createCard());  
  closePopup(arrayVariables.popupAddForm);  
}

/*-----СЛУШАТЕЛИ СОБЫТИЙ-----*/
arrayVariables.profileEditButton.addEventListener('click', openProfilePopup); // слушатель кнопки редактирования профиля
arrayVariables.popupFormEditProfile.addEventListener('submit', saveProfile); // слушатель кнопки сохранить попап редактирования профиля
arrayVariables.addButton.addEventListener('click', modalAddForm); // слушатель кнопки добавления карточек
arrayVariables.popupAddCard.addEventListener('submit', addCard); //слушатель на кнопке сoздать с функцией добавления карточки



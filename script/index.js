/*Добрый день! Спасибо большое за Вашу работу. Я постарался дополнительно учесть пожелания ревью, которые размещали в чате группы.
1) Переработал разметку карточки (если вставили ошибочную ссылку), исправил отображение валидации, добавил интерактивность карточкам при наведении на изображение,
2) Вынес в отдельный файл общие функции открытия и закрытия попап.
*/

import { Card } from './Card.js';
import { initialCards } from './arrayInitialCards.js';
import { openPopup, closePopup } from './utilits.js';
import { validationForm } from './validationForm.js';

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

//переменная, содержащая внутри объект значений (ключ-значение)
const objectWithSelectors = {
  inputErrorClass: 'popup__input_type-error',
  activeErrorClass: 'popup__input-error_active',
  popupInput: '.popup__input',
  popupButtonSave: '.popup__button-save',
  popupButtonSaveInactive: 'popup__button-save_inactive',
  popupForm: '.popup__form'  
};

/* Функция открытия и закрытия окна редактирования профиля
 добавляет текст из модального окна на страницу*/
function openProfilePopup() {  
  popupFullName.value = fullName.textContent; 
  popupDescription.value = description.textContent;
  openPopup(popupEditProfile);
  new validationForm(popupEditProfile, objectWithSelectors).enableValidation();  
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
  openPopup(popupAddForm);
  new validationForm(popupAddCard,objectWithSelectors).enableValidation();    
}

/*Выполнение перебора массива и выполнение для каждого элемента функции*/
(function firstLoadingCards() {
  initialCards.forEach((element) => {
    elementCardField.append(new Card(element.link, element.name, '.element-template').createCard());
  });
})();

/*функция добавления новой карточки из модального окна*/
function addCard(event) {
  event.preventDefault();
  elementCardField.prepend(new Card(popupUrl.value, popupTitle.value, '.element-template').createCard());
  modalAddForm();
  closePopup(popupAddForm);  
}

/*-----СЛУШАТЕЛИ СОБЫТИЙ-----*/
profileEditButton.addEventListener('click', openProfilePopup); // слушатель кнопки редактирования профиля
popupFormEditProfile.addEventListener('submit', saveProfile); // слушатель кнопки сохранить попап редактирования профиля
addButton.addEventListener('click', modalAddForm); // слушатель кнопки добавления карточек
popupAddCard.addEventListener('submit', addCard /*(elementCardField)*/); //слушатель на кнопке сoздать с функцией добавления карточки

/* ---------СПАСИБО БОЛЬШОЕ ЗА РЕВЬЮ! ----------- */

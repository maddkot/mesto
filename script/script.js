const profileEditButton = document.querySelector('.profile__edit-button'); //кнопка редактирование профиля
const popupEditProfile = document.querySelector('.popup_edit-profile'); // окно редактирование профиля
const popupCloseButton = document.querySelectorAll('.popup__close-button'); //крестик на попапе редактирования профиля
const popupFormEditProfile = document.querySelector('.popup__form_edit-profile'); // вся форма попап редактирования профиля

const fullName = document.querySelector('.profile__full-name'); //имя профиля
const description = document.querySelector('.profile__description'); // подпись профиля
const popupFullName = document.querySelector('.popup__input_full-name'); //значения имени в попап профиля
const popupDescription = document.querySelector('.popup__input_description'); //значения подписи в попап профиля

const addButton = document.querySelector('.profile__add-button'); // кнопка добавление карточек
const popupAddForm = document.querySelector('.popup_add-form'); //попап добавления*/

const elementCardField = document.querySelector('.elements'); //выбираем весь блок с карточками
const elementTemplate = document.querySelector('.element-template').content; //выбор содержимого блока  карточки

const popupTitle = document.querySelector('.popup__input_title'); // значение подписи в попап добавления карточки
const popupUrl = document.querySelector('.popup__input_url'); // значение адреса в попап добавления карточки
const popupAddCard = document.querySelector('.popup__form_add'); // вся форма попап добавления новых карточек

const popupImage = document.querySelector('.popup-image'); // попаg-блок - галерея картинок
const popupImageFrame = document.querySelector('.popup-image__frame'); // картинка в попап-блоке галереии картинок
const popupImageTitle = document.querySelector('.popup-image__title'); // подпись в попап-блоке галереии картинок
const popupImageCloseButton = document.querySelector(
  '.popup-image__close-button'
);
const popups = document.querySelector('.popups'); //секци, содержащая все попапы




//функция открытия модального окна и добавление слушателей
function openPopup (element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupPressOnEsc);
  document.addEventListener('click', closePopupWithOverlay);
  
}

//функция закряти модального окна и удаления слушателей
function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupPressOnEsc);
  document.removeEventListener('click', closePopupWithOverlay);
}  

//функция закрытия по оверлею
function closePopupWithOverlay(event) {
  if (event.target.classList.contains('popup')) { 
    closePopup(event.target);    
  }
}

// функция закрытия через ESC
function closePopupPressOnEsc(event) {
  if (event.key === 'Escape') {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupPressOnEsc);
    document.removeEventListener('click', closePopupWithOverlay);
  }
}

//функция закрытия на крестик
function closePopupByCross(event) {
  if (event.target.classList.contains('popup__close-button')) {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
  }
}

/* Функция закрытия попап-блок с галереей картинок*/
function closePopupImage() { 
  closePopup(popupImage);
  document.removeEventListener('keydown', closePopupPressOnEsc);
  document.removeEventListener('click', closePopupWithOverlay);
}

/*-----НИЖЕ ФУНКЦИОНАЛ РАБОТЫ С РЕДАКТИРОВАНИЕМ ПРОФИЛЯ-----*/
/* Функция открытия и закрытия окна редактирования профиля
 добавляет текст из модального окна на страницу*/
function openProfilePopup() {  
  popupFullName.value = fullName.textContent; 
  popupDescription.value = description.textContent;
  openPopup(popupEditProfile);   
  hideInputError(popupFormEditProfile, popupFullName, objectWithSelectors); 
  hideInputError(popupFormEditProfile, popupDescription, objectWithSelectors);
  setEventListeners(popupEditProfile, objectWithSelectors); 
} 

/* Функция изменения информации на странице профиля через модальное окно с получением информации, отображаемой на странице
Получает информацию со страницы и вставляет в модальное окно*/
function saveProfile(event) {
  event.preventDefault();
  fullName.textContent = popupFullName.value;
  description.textContent = popupDescription.value;   
  closePopup(popupEditProfile);
}

/*-----НИЖЕ ФУНКЦИОНАЛ РАБОТЫ С ДОБАВЛЕНИЕМ/УДАЛЕНИЕМ КАРТОЧЕК-----*/
/* Функция открытия модального окна добавления элементов с картинками*/
function modalAddForm() {  
  popupAddCard.reset();  
  openPopup(popupAddForm);
  hideInputError(popupAddCard, popupTitle, objectWithSelectors);
  hideInputError(popupAddCard, popupUrl, objectWithSelectors);
  setEventListeners(popupAddCard, objectWithSelectors);    
}

/*функция добавления карточек на страницу из массива c правилом проверки для расположения*/
function addElement(link, name) {
  const element = elementTemplate.cloneNode(true); //клонируем элемент
  const image = element.querySelector('.element__photo');
  image.src = link; 
  image.alt = name; 
  element.querySelector('.element__text').textContent = name; 
  element.querySelector('.element__button-like').addEventListener('click', likeClick);
  element.querySelector('.element__basket').addEventListener('click', deleteClick);
  element.querySelector('.element__photo').addEventListener('click', imageClick);
  return element;
}

/*Выполнение перебора массива и выполнение для каждого элемента функции*/
function firstLoadingCards(listCards, parentElement) {
  listCards.forEach((element) => {
    parentElement.append(addElement(element.link, element.name)); 
  });
}

/* вызываем функциЮ с дефолтными карточками для отображения*/
firstLoadingCards(initialCards, elementCardField);

/*функция добавления новой карточки из модального окна*/
function addCard(event) {
  event.preventDefault();
  elementCardField.prepend(addElement(popupUrl.value, popupTitle.value));
  modalAddForm();
  closePopup(popupAddForm);  
}

/* функция удаления карточки */
function deleteClick(event) {
  event.target.closest('.element').remove();
}

/* функция удаления/добавления лайка*/
function likeClick(event) {
  event.target.classList.toggle('element__button-like_on');
}

/* функция открытия попап-блока с картинкой на полный экран*/
function imageClick(event) {  
  popupImageFrame.src = event.target.src;
  popupImageFrame.alt = event.target.alt;
  popupImageTitle.textContent = event.target.alt;  
  openPopup(popupImage); 
}

/*-----СЛУШАТЕЛИ СОБЫТИЙ-----*/
popups.addEventListener('click', closePopupByCross); //слушатель на блоке для закрытия по крестику модальных блоков
profileEditButton.addEventListener('click', openProfilePopup); // слушатель кнопки редактирования профиля
popupFormEditProfile.addEventListener('submit', saveProfile); // слушатель кнопки сохранить попап редактирования профиля
addButton.addEventListener('click', modalAddForm); // слушатель кнопки добавления карточек
popupAddCard.addEventListener('submit', addCard /*(elementCardField)*/); //слушатель на кнопке сoздать с функцией добавления карточки
popupImageCloseButton.addEventListener('click', closePopupImage); // слушатель на крестик в попап-блок галереии картинок


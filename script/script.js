/*-----МАССИВ ПЕРЕМЕННЫХ-----*/
const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const profileEditButton = document.querySelector('.profile__edit-button'); //кнопка редактирование профиля
const popupEditProfile = document.querySelector('.popup'); // окно редактирование профиля
const profileCloseButton = document.querySelector('.popup__close-button'); //крестик на попапе редактирования профиля
const saveFormEditProfile = document.querySelector('.popup__form'); // вся форма попап

const fullName = document.querySelector('.profile__full-name'); //имя профиля
const description = document.querySelector('.profile__description'); // подпись профиля
const popupFullName = document.querySelector('.popup__input_full-name'); //значения имени в попап профиля
const popupDescription = document.querySelector('.popup__input_description'); //значения подписи в попап профиля

const addButton = document.querySelector('.profile__add-button'); // кнопка добавление карточек
const popupAddForm = document.querySelector('.popup_add-form'); //попап добавления*/
const popupCloseAddForm = document.querySelector(
  '.popup__close-button_add-form'
); /*кнопка закрытия попап карточек*/
const elementCardField = document.querySelector('.elements'); //выбираем весь блок с карточками
const elementTemplate = document.querySelector('.element-template').content; //выбор содержимого блока  карточки

const popupTitle = document.querySelector('.popup__input_title'); // значение подписи в попап добавления карточки
const popupUrl = document.querySelector('.popup__input_url'); // значение адреса в попап добавления карточки
const popupAddCard = document.querySelector('.popup__form_add'); //

const popupImage = document.querySelector('.popup-image'); // попаg-блок - галерея картинок
const popupImageFrame = document.querySelector('.popup-image__frame'); // картинка в попап-блоке галереии картинок
const popupImageTitle = document.querySelector('.popup-image__title'); // подпись в попап-блоке галереии картинок
const popupImageCloseButton = document.querySelector(
  '.popup-image__close-button'
);

/* Функция проверки наличия класса для открытия/закрытия модальных окон*/
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

/* Функция закрытия попап-блок с галереей картинок*/
function closePopupImage() {
  togglePopup(popupImage);
}

/*-----НИЖЕ ФУНКЦИОНАЛ РАБОТЫ С РЕДАКТИРОВАНИЕМ ПРОФИЛЯ-----*/
/* Функция открытия и закрытия окна редактирования профиля
 добавляет текст из модального окна на страницу*/
function openProfilePopup() {
  popupFullName.value = fullName.textContent;
  popupDescription.value = description.textContent;
  togglePopup(popupEditProfile);
}

/* Функция изменения информации на странице профиля через модальное окно с получением информации, отображаемой на странице
Получает информацию со страницы и вставляет в модальное окно*/
function saveProfile(event) {
  event.preventDefault();
  fullName.textContent = popupFullName.value;
  description.textContent = popupDescription.value;
  togglePopup(popupEditProfile);
}

/*-----НИЖЕ ФУНКЦИОНАЛ РАБОТЫ С ДОБАВЛЕНИЕМ/УДАЛЕНИЕМ КАРТОЧЕК-----*/
/* Функция открытия модального окна добавления элементов с картинками*/
function modalAddForm() {
  popupUrl.value = '';
  popupTitle.value = '';
  togglePopup(popupAddForm);
}

/*функция добавления карточек на страницу из массива c правилом проверки для расположения*/
function addElement(link, name) {
  const element = elementTemplate.cloneNode(true); //клонируем элемент
  element.querySelector('.element__photo').src = link; //выбираем селектор и задаем  адрес картинки из массива
  element.querySelector('.element__photo').alt = name; //задаем описание картинки исходя из её названия
  element.querySelector('.element__text').textContent = name; // выбираем класс и задаем название картинки из массива
  element
    .querySelector('.element__button-like')
    .addEventListener('click', likeClick);
  element
    .querySelector('.element__basket')
    .addEventListener('click', deleteClick);
  element
    .querySelector('.element__photo')
    .addEventListener('click', imageClick);
  return element;
}

/*Выполнение перебора массива и выполнение для каждого элемента функции*/
function firstLoadingCards(listCards, parentElement) {
  listCards.forEach((element) => {
    parentElement.append(addElement(element.link, element.name)); //подставляем значения массива в функцию
  });
}

/* вызываем функциЮ с дефолтными карточками для отображения*/
firstLoadingCards(initialCards, elementCardField);
/*функция добавления новой карточки из модального окна*/
function addCard(event) {
  event.preventDefault();
  elementCardField.prepend(addElement(popupUrl.value, popupTitle.value));
  modalAddForm();
}

/*усложненный ВАРИАНТ РЕАЛИЗАЦИИ ДОБАВЛЕНИЯ КАРТОЧКИ (В СЛУШАТЕЛЕ добавить ПАРАМЕТР)*/
/*function addCard(parentElement) {
  return function (event) {
    event.preventDefault();
    parentElement.prepend(addElement(popupUrl.value, popupTitle.value));
    modalAddForm();
  };
}*/

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
  /* const elementPhoto = event.target.closest('.element__photo');
  if (elementPhoto) {    */

  popupImageFrame.src = event.target.src;
  popupImageFrame.alt = event.target.alt;
  popupImageTitle.textContent = event.target.alt;
  togglePopup(popupImage);
  //}
}

/*-----СЛУШАТЕЛИ СОБЫТИЙ-----*/
profileEditButton.addEventListener('click', openProfilePopup); // слушатель кнопки редактирования профиля
profileCloseButton.addEventListener('click', openProfilePopup); // слушатель крестика попапа редактирования профиля
saveFormEditProfile.addEventListener('submit', saveProfile); // слушатель кнопки сохранить попап редактирования профиля
addButton.addEventListener('click', modalAddForm); // слушатель кнопки добавления карточек
popupCloseAddForm.addEventListener('click', modalAddForm); // слушатель крестика попапа добавления карточек
popupAddCard.addEventListener('submit', addCard /*(elementCardField)*/); //слушатель на кнопке сoздать с функцией добавления карточки
popupImageCloseButton.addEventListener('click', closePopupImage); // слушатель на крестик в попап-блок галереии картинок

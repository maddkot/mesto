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

/*-----НИЖЕ ФУНКЦИОНАЛ РАБОТЫ С РЕДАКТИРОВАНИЕМ ПРОФИЛЯ-----*/
/* Функция открытия и закрытия окна редактирования профиля
 добавляет текст из модального окна на страницу*/
function openProfilePopup() {
  togglePopup(popupEditProfile);
  popupFullName.value = fullName.textContent;
  popupDescription.value = description.textContent;
}

/* Функция закрытия попап-блок с галереей картинок*/
function closePopupImage() {
  togglePopup(popupImage);
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
  togglePopup(popupAddForm);
  popupUrl.value = '';
  popupTitle.value = '';
}

/*функция добавления карточек на страницу из массива c правилом проверки для расположения*/
function addElement(link, name) {
  let element = elementTemplate.cloneNode(true); //клонируем элемент
  element.querySelector('.element__photo').src = link; //выбираем селектор и задаем  адрес картинки из массива
  element.querySelector('.element__photo').alt = name; //задаем описание картинки исходя из её названия
  element.querySelector('.element__text').textContent = name; // выбираем класс и задаем название картинки из массива
  pasteCard(element); //вызываем функцию добавления карточки в разметку
}

/*Выполнение перебора массива и выполнение для каждого элемента функции*/
function firstLoadingCards() {
  initialCards.reverse();
  initialCards.forEach(function (element) {
    addElement(element.link, element.name); //подставляем значения массива в функцию
  });
}

/* вызываем функцию перебора массива с карточками для отображения*/
firstLoadingCards();

/* функция добавление карточки в разметку */
function pasteCard(event) {
  elementCardField.prepend(event);
}

/*функция добавления новой карточки из модального окна*/
function addCard(event) {
  event.preventDefault();
  addElement(popupUrl.value, popupTitle.value);
  modalAddForm();
}

/* функция удаления карточки */
function deleteClick(event) {
  let deleteElement = event.target.closest('.element__basket');
  if (deleteElement) {
    deleteElement.closest('.element').remove();
  }
}

/* функция удаления/добавления лайка*/
function likeClick(event) {
  let likeElement = event.target.closest('.element__button-like');
  if (likeElement) {
    likeElement.classList.toggle('element__button-like_on');
  }
}

/* функция открытия попап-блока с картинкой на полный экран*/
function imageClick(event) {
  let elementPhoto = event.target.closest('.element__photo');
  if (elementPhoto) {
    togglePopup(popupImage);
    popupImageFrame.src = elementPhoto.src;
    popupImageFrame.alt = elementPhoto.alt;
    popupImageTitle.textContent = elementPhoto.alt;
  }
}

/*-----СЛУШАТЕЛИ СОБЫТИЙ-----*/
profileEditButton.addEventListener('click', openProfilePopup); // слушатель кнопки редактирования профиля
profileCloseButton.addEventListener('click', openProfilePopup); // слушатель крестика попапа редактирования профиля
saveFormEditProfile.addEventListener('submit', saveProfile); // слушатель кнопки сохранить попап редактирования профиля
addButton.addEventListener('click', modalAddForm); // слушатель кнопки добавления карточек
popupCloseAddForm.addEventListener('click', modalAddForm); // слушатель крестика попапа добавления карточек
popupAddCard.addEventListener('submit', addCard); //слушатель на кнопке сoздать с функцией добавления карточки
elementCardField.addEventListener('click', deleteClick); // слушатель на блоке карточек с функцией удаления карточки
elementCardField.addEventListener('click', likeClick); //слушатель на блоке карточекс функцией установки/снятия лайка
elementCardField.addEventListener('click', imageClick); // слушатель на блоке карточек с функцией клика по картинке и открытия ее на весь экран
popupImageCloseButton.addEventListener('click', closePopupImage); // слушатель на крестик в попап-блок галереии картинок

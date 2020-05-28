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
const elementTemplate = document.querySelector('.element-template').content;

const popupTitle = document.querySelector('.popup__input_title'); // значение подписи в попап добавления карточки
const popupUrl = document.querySelector('.popup__input_url'); // значение адреса в попап добавления карточки
const popupAddCard = document.querySelector('.popup__form_add'); //

const popupImage = document.querySelector('.popup-image'); // попаg-блок - галерея картинок
const popupImageFrame = document.querySelector('.popup-image__frame'); // картинка в попап-блоке галереии картинок
const popupImageTitle = document.querySelector('.popup-image__title'); // подпись в попап-блоке галереии картинок
const popupImageCloseButton = document.querySelector(
  '.popup-image__close-button'
);

/*-----НИЖЕ ФУНКЦИОНАЛ РАБОТЫ С РЕДАКТИРОВАНИЕМ ПРОФИЛЯ-----*/
/* Функция открытия и закрытия окна редактирования профиля
 добавляет текст из модального окна на страницу*/
function modalEditProfile() {
  if (popupEditProfile.classList.toggle('popup_opened')) {
    popupFullName.value = fullName.textContent;
    popupDescription.value = description.textContent;
  }
}

/* Функция закрытия попап-блок с галереей картинок*/
function closePopupImage() {
  popupImage.classList.remove('popup_opened');
}

/* Функция изменения информации на странице профиля через модальное окно с получением информации, отображаемой на странице
Получает информацию со страницы и вставляет в модальное окно*/
function saveProfile(e) {
  e.preventDefault();
  fullName.textContent = popupFullName.value;
  description.textContent = popupDescription.value;
  modalEditProfile();
}

/*-----НИЖЕ ФУНКЦИОНАЛ РАБОТЫ С ДОБАВЛЕНИЕМ КАРТОЧЕК-----*/
/* Функция открытия модального окна добавления элементов с картинками*/
function modalAddForm() {
  if (popupAddForm.classList.toggle('popup_opened')) {
    popupUrl.value = '';
    popupTitle.value = '';
  }
}

/*функция добавления карточек на страницу из массива c правилом проверки для расположения*/
function addElement(link, name, isInitial) {
  const element = elementTemplate.cloneNode(true); //клонируем элемент
  element.querySelector('.element__photo').src = link; //выбираем селектор и задаем  адрес картинки из массива
  element.querySelector('.element__photo').alt = name; //задаем описание картинки исходя из её названия
  element.querySelector('.element__text').textContent = name; // выбираем класс и задаем название картинки из массива

  if (isInitial) {
    elementCardField.append(element); //если элемент есть в массиве, то добавить последним
  } else {
    elementCardField.prepend(element); //в другом случае добавить в конце (проверка в параметре и в функции)
  }
}
/*Выполнение перебора массива и выполнение для каждого элемента функции*/
initialCards.forEach(function (element) {
  addElement(element.link, element.name, true); //подставляем значения массива в функцию
});

/*функция добавления новой карточки из модального окна*/
function addCard(event) {
  event.preventDefault();
  addElement(popupUrl.value, popupTitle.value, false);
  modalAddForm();
}

/*функция удаления карточки,работы с лайком и открытия попап-блока галереии картинок*/
function chooseCard(event) {
  let deleteElement = event.target.closest('.element__basket');
  let likeElement = event.target.closest('.element__button-like');
  let elementPhoto = event.target.closest('.element__photo');

  if (elementPhoto) {
    popupImage.classList.toggle('popup_opened');
    popupImageFrame.src = elementPhoto.src;
    popupImageFrame.alt = elementPhoto.alt;
    popupImageTitle.textContent = elementPhoto.alt;
  }
  if (deleteElement) {
    deleteElement.parentNode.remove();
  }
  if (likeElement) {
    likeElement.classList.toggle('element__button-like_on');
  }
}

/*-----СЛУШАТЕЛИ СОБЫТИЙ-----*/
profileEditButton.addEventListener('click', modalEditProfile); // слушатель кнопки редактирования профиля
profileCloseButton.addEventListener('click', modalEditProfile); // слушатель крестика попапа редактирования профиля
saveFormEditProfile.addEventListener('submit', saveProfile); // слушатель кнопки сохранить попап редактирования профиля
addButton.addEventListener('click', modalAddForm); // слушатель кнопки добавления карточек
popupCloseAddForm.addEventListener('click', modalAddForm); // слушатель крестика попапа добавления карточек
popupAddCard.addEventListener('submit', addCard); //слушатель на кнопке сздать с функцией добавления карточки
elementCardField.addEventListener('click', chooseCard); //слушатель на весь блок с карточками с выполнением функции
popupImageCloseButton.addEventListener('click', closePopupImage); // слушатель на крестик в попап-блок галереии картинок

/*-----СТАРЫЙ КОД (ПЕРЕРАБОТАТЬ/УЛУЧШИТЬ)-----*/

// В ФУНКЦИИ CHOOSECARD ПЕРЕДЕЛАТЬ ПЕРЕМЕННЫЕ
/* elementPhoto.src = link; (ПЕРЕДЕЛАТЬ В ПЕРСПЕКТИВЕ НА БОЛЕЕ ЧИТАЕМЫЙ И РАБОЧИЙ ВАРИАНТ (ЭТО ДЛЯ СЕБЯ))
   elementText.textContent = name; */

/*функция удаления карточек*/
/*function deleteCard(event) {  
  let deleteElement = event.target.closest('.element__basket');
  if(deleteElement) {deleteElement.parentNode.remove();}  
}
/*функция добавления лайка*/
/*function addLike (event) {
  if (event.target.classList.contains('element__button-like')) {
   event.target.closest('.element__button-like').classList.toggle('element__button-like_on');
 }
 }
//elementField.addEventListener('click', addLike); //слушатель на весь блок с карточками с функцией добавления лайка.
//elementField.addEventListener('click', deleteCard); // слушатель на весь блок с карточками с функцией удаления карточки

//elementCardField.addEventListener('click', testing);

/*function testing (event) {
  let test = event.target.closest('.element');
  console.log(event.target);    
  console.log(test);
  if (test) {
    let imagetest = test.querySelector('.element__photo');
    popupImage.classList.toggle('popup_opened');
    popupImageFrame.src = imagetest.src;    
    popupImageFrame.alt = imagetest.alt;
    popupImageTitle.textContent = imagetest.alt;
  }  
}*/

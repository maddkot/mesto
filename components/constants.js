
// переменные

export const profileEditButton = document.querySelector('.profile__edit-button'); //кнопка редактирование профиля
export const popupEditProfile = document.querySelector('.popup_edit-profile'); // окно редактирование профиля
export const popupFormEditProfile = document.querySelector('.popup__form_edit-profile'); // вся форма попап редактирования профиля
export const fullName = document.querySelector('.profile__full-name'); //имя профиля
export const description = document.querySelector('.profile__description'); // подпись профиля
export const popupFullName = document.querySelector('.popup__input_full-name'); //значения имени в попап профиля
export const popupDescription = document.querySelector('.popup__input_description'); //значения подписи в попап профиля
export const addButton = document.querySelector('.profile__add-button'); // кнопка добавление карточек
export const popupAddForm = document.querySelector('.popup_add-form'); //попап добавления*/
export const elementCardField = document.querySelector('.elements'); //выбираем весь блок с карточками
export const popupTitle = document.querySelector('.popup__input_title'); // значение подписи в попап добавления карточки
export const popupUrl = document.querySelector('.popup__input_url'); // значение адреса в попап добавления карточки
export const popupAddCard = document.querySelector('.popup__form_add'); // вся форма попап добавления новых карточек
export const elementTemplate = document.querySelector('.element-template');
export const popupImage = document.querySelector('.popup-image'); // попаg-блок - галерея картинок
export const popupImageFrame = document.querySelector('.popup-image__frame'); // картинка в попап-блоке галереии картинок
export const popupImageTitle = document.querySelector('.popup-image__title'); // подпись в попап-блоке галереии картинок


//переменная, содержащая внутри объект значений (ключ-значение)
export const objectWithSelectors = {
  inputErrorClass: 'popup__input_type-error',
  activeErrorClass: 'popup__input-error_active',
  popupInput: '.popup__input',
  popupButtonSave: '.popup__button-save',
  popupButtonSaveInactive: 'popup__button-save_inactive',
  popupForm: '.popup__form'  
};


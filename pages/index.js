

import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Card } from '../components/Card.js';
import { arrayInitialCards } from '../components/arrayInitialCards.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  profileEditButton,
  popupEditProfile,  
  fullName,
  description,
  popupFullName,
  popupDescription,
  addButton,
  popupAddCard,  
  popupImage, 
  objectWithSelectors,  
  popupAddForm
} from '../components/constants.js';


//переменные классов валидации--------------------------------------------------------------------

const popupEditProfileValid = new FormValidator(popupEditProfile, objectWithSelectors);
const popupAddFormValid = new FormValidator(popupAddCard, objectWithSelectors);

//вызов метода валидации--------------------------------------------------------------------------

popupEditProfileValid.enableValidation();
popupAddFormValid.enableValidation();

//переменная класса картинки со слушателем закрытия (родительский метод)-------------------------
const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();


//функция рендеринга карточек--------------------------------------------------------------------

function renderingCards(item) {
  const card = new Card(item, '.element-template', {
    handleCardClick: () => {
      popupWithImage.open(item.name, item.link);
    }
  });
  renderingDefaultCards.addItem(card.createCard());
}


//отрисовка дефолтных карточек-------------------------------------------------------------------

const renderingDefaultCards = new Section({
    items: arrayInitialCards,
    renderer: ((item) => {      
      renderingCards(item);       
    })
  }, '.elements');

//вызов отрисовки дефолтных карточек--------------------------------------------------------------

renderingDefaultCards.rendererItems();

//добавление карточек из попапа------------------------------------------------------------------

const createCardPopup = new PopupWithForm(popupAddForm, {
  submitForm: (item) => {
    const itemCard = { name: item.title, link: item.url };
    renderingCards(itemCard);
    createCardPopup.close();
  }
});

//устанавливаем слушатель на кнопку и присваиваем сброс ошибок и открытие попапа---------------------
addButton.addEventListener('click', () => {
  popupAddFormValid.resetInputError();
   createCardPopup.open();
 })


//устанавливаем метод/слушатель на попа добавлени ядля сабмита, закрытия по esc------------------------

createCardPopup.setEventListeners();

//данные о пользователе--------------------------------------------------------------------------

const userInfo = new UserInfo({
 fullNameSelector: fullName,
 descriptionSelector: description
});


//получение данныъх о пользователе----------------------------------------------------------------

const profilePopup = new PopupWithForm(popupEditProfile, {
  submitForm: (item) => {    
    userInfo.setUserInfo(item);
    profilePopup.close();
  }
});

//устанавливаем метод/слушатель на попап редактирования профиля для закрытия по esc, сабмита--------------

profilePopup.setEventListeners();

//слушатель на кнопку открытия попапа редактирования профиля и подтягивание текущих значений со страницы--------

profileEditButton.addEventListener('click', () => {  
  const user = userInfo.getUserInfo();
  popupFullName.value = user.fullName;
  popupDescription.value = user.description;
  popupEditProfileValid.resetInputError();
  profilePopup.open();
});




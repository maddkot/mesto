import './index.css';
import  PopupWithForm  from '../components/PopupWithForm.js';
import  PopupWithImage  from '../components/PopupWithImage.js';
import  Section  from '../components/Section.js';
import  UserInfo  from '../components/UserInfo.js';
import  Card  from '../components/Card.js';
import  FormValidator  from '../components/FormValidator.js';
import  PopupDelete  from '../components/PopupDelete.js';
import  Api  from '../components/Api.js';
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
  popupAddForm,
  popupChangeAvatar,
  avatarChangeButton,
  avatarImage,
  popupAcceptDeleteCard
} from '../utils/constants.js';


const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-14",
  myId: "8b3cdfe564b3ee4827efff74",
  headers: {
    authorization: "b1c2d7eb-517c-4978-8a15-35a77684fa2b",
    "Content-Type": "application/json"
  },
});

//вынесем id пользователя в константу для удобного проброса в методы
const myId = api.myId;

//переменные классов валидации--------------------------------------------------------------------

const popupEditProfileValid = new FormValidator(popupEditProfile, objectWithSelectors);
const popupAddFormValid = new FormValidator(popupAddCard, objectWithSelectors);
const popupChangeAvatarValid = new FormValidator(popupChangeAvatar, objectWithSelectors);

//вызов метода валидации--------------------------------------------------------------------------

popupEditProfileValid.enableValidation();
popupAddFormValid.enableValidation();
popupChangeAvatarValid.enableValidation();

//переменная класса картинки со слушателем закрытия (родительский метод)-------------------------
const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

//переменная класса удаления карточки со слушателем----------------------------------------------

const popupDelete = new PopupDelete(popupAcceptDeleteCard)
popupDelete.setEventListeners();


//функция рендеринга карточек--------------------------------------------------------------------

function renderingCards(item) {
  const card = new Card(myId, item, '.element-template', {
    handleCardClick: () => {
      popupWithImage.open(item.name, item.link);
    },
    //функция удаления карта (колбек методов из класса)
    handlerCardDelete: () => {
      popupDelete.open();
      popupDelete.setSubmit(() => {        
        api.deleteCard(card._id)
          .then(() => {            
              card.deleteClick();              
            })
      });
    },

    //функция добавления лайка 
    handlerAddLike: () => {
      api.setLike(item._id)
        .then((item) => {
          card.likeCounter(item.likes);
          card.likeClick();
        })
        .catch((err) => {
          console.log(err); 
        });
    },
    //функция удаления лайка
    handlerDeleteLike: () => {
      api.deleteLike(item._id)
        .then((item) => {
          card.likeCounter(item.likes);
          card.likeClick();
        })
        .catch((err) => {
          console.log(err); 
        });
    }
  });

  //отрисовка карточек (мягкая связь с классом секции и его методом добавления)
  renderingDefaultCards.addItem(card.createCard());
}

//отрисовка дефолтных карточек-------------------------------------------------------------------

const renderingDefaultCards = new Section({  
  renderer: (item) => {      
    renderingCards(item);       
  }
}, '.elements'); 


//вызов отрисовки дефолтных карточек с сервера--------------------------------------------------------------

api.getInitialCards()
  .then((res) => {
    renderingDefaultCards.rendererItems(res);
  });

//добавление карточек из попапа------------------------------------------------------------------

const createCardPopup = new PopupWithForm(popupAddForm, {
  submitForm: (item) => {
    textLoader(popupAddForm, true, 'Создание...')
    api.addNewCard(item)
      .then((res) => {        
        renderingCards(res);        
      })
      .catch((err) => {
        console.log(err); 
      });
    createCardPopup.close();
  }
});


//устанавливаем слушатель на кнопку и присваиваем сброс ошибок и открытие попапа---------------------
addButton.addEventListener('click', () => {
  popupAddFormValid.resetInputError();
  textLoader(popupAddForm, false, 'Создать');
   createCardPopup.open();
 })


//устанавливаем метод/слушатель на попа добавлени ядля сабмита, закрытия по esc------------------------

createCardPopup.setEventListeners();

//данные о пользователе--------------------------------------------------------------------------

const userInfo = new UserInfo({
 fullNameSelector: fullName,
 descriptionSelector: description,
 profileAvatar: avatarImage
});


//получение данных о пользователе и их отправка на сервер----------------------------------------------------------------

api.getUserInfo()
  .then((res) => {    
    userInfo.setUserInfo(res);
  })
  .catch((err) => {
    console.log(err); 
  });

const profilePopup = new PopupWithForm(popupEditProfile, {
  submitForm: (item) => {
    textLoader(popupEditProfile, true, 'Сохранение...')
    api.setUserInfo(item)
      .then((res) => {
      userInfo.setUserInfo(res);
    })
    
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
  textLoader(popupEditProfile, false, 'Сохранить');
  profilePopup.open();
});


//попап изменения аватарки
const avatarPopup = new PopupWithForm(popupChangeAvatar, {
  submitForm: (item) => {
    textLoader(popupChangeAvatar, true, 'Сохранение...')    
    api.changeAvatar(item)
      .then((res) => {
        userInfo.setAvatar(res);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err); 
      });
  }
})


//слушатель методов закрытия и на кнопку изменения аватарки

avatarPopup.setEventListeners();

avatarChangeButton.addEventListener('click', () => { 
  popupChangeAvatarValid.resetInputError();
  textLoader(popupChangeAvatar, false, 'Сохранить');
  avatarPopup.open();
});


//функция отображения текста на кнопке при предзагрузки/отправки данных
function textLoader(popupForm, status, textLoad) {  
  if (status) {
    popupForm.querySelector('.popup__button-save').textContent = textLoad;    
  }
  else {
    popupForm.querySelector('.popup__button-save').textContent = textLoad;
  }  
}

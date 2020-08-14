
export class Card {
  constructor(array, cardSelector, {handleCardClick}) {
    this._link = array.link;
    this._name = array.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  /* Функция копирования template элемента*/
  _getElementTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);  
  }

  /*функция добавления карточек на страницу из массива c правилом проверки для расположения*/
  createCard() {
    this._element = this._getElementTemplate();
    const elementPhoto = this._element.querySelector('.element__photo');
    const elementText = this._element.querySelector('.element__text');
    const elementButtonLike = this._element.querySelector('.element__button-like');
    const elementBasket = this._element.querySelector('.element__basket');
    
    elementPhoto.src = this._link;
    elementPhoto.alt = this._name;    
    elementText.textContent = this._name;

    elementButtonLike.addEventListener('click', () => this._likeClick());
    elementBasket.addEventListener('click', () => this._deleteClick());
    elementPhoto.addEventListener('click', () => this._handleCardClick());
    return this._element;
  }

  /* функция удаления карточки */
  _deleteClick() {    
    this._element.remove();
    this._element = null;
  }

  /* функция удаления/добавления лайка*/
  _likeClick() {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_on')    
  }

  /* функция открытия попап-блока с картинкой на полный экран*/
  /* _imageClick = () => {
    const popupImage = document.querySelector('.popup-image'); // попаg-блок - галерея картинок
    const popupImageFrame = document.querySelector('.popup-image__frame'); // картинка в попап-блоке галереии картинок
    const popupImageTitle = document.querySelector('.popup-image__title'); // подпись в попап-блоке галереии картинок
    popupImageFrame.src = this._link;
    popupImageFrame.alt = this._name;
    popupImageTitle.textContent = this._name;
    openPopup(popupImage);
  }*/
} 

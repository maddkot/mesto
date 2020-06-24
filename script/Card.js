import { openPopup } from './utilits.js';

export class Card {
  constructor(link, name, cardSelector) {
    this._link = link;
    this._name = name;
    this._cardSelector = cardSelector;
  }

  /* Функция копирования template элемента*/
  _getElementTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
  
  }

  /*функция добавления карточек на страницу из массива c правилом проверки для расположения*/
  createCard() {
    this._element = this._getElementTemplate();
    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__photo').alt = this._name;    
    this._element.querySelector('.element__text').textContent = this._name;

    this._element.querySelector('.element__button-like').addEventListener('click', () => this._likeClick());
    this._element.querySelector('.element__basket').addEventListener('click', () => this._deleteClick());
    this._element.querySelector('.element__photo').addEventListener('click', this._imageClick);
    return this._element;
  }

  /* функция удаления карточки */
  _deleteClick() {
    //event.target.closest('.element').remove();    
    this._element.remove();
  }

  /* функция удаления/добавления лайка*/
  _likeClick() {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_on')
    //event.target.classList.toggle('element__button-like_on');
    
  }

  /* функция открытия попап-блока с картинкой на полный экран*/
  _imageClick = () => {
    const popupImage = document.querySelector('.popup-image'); // попаg-блок - галерея картинок
    const popupImageFrame = document.querySelector('.popup-image__frame'); // картинка в попап-блоке галереии картинок
    const popupImageTitle = document.querySelector('.popup-image__title'); // подпись в попап-блоке галереии картинок
    popupImageFrame.src = this._link;
    popupImageFrame.alt = this._name;
    popupImageTitle.textContent = this._name;
    openPopup(popupImage);
  }
}

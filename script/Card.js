import { openPopup } from './utilits.js';

export class Card {
  constructor(link, name, cardSelector) {
    this._link = link;
    this._name = name;
    this._cardSelector = cardSelector;
  }

  /* Функция копирования template элемента*/
  _getElementTemplate() {
    return this._cardSelector.content.querySelector('.element').cloneNode(true);  
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
    elementPhoto.addEventListener('click', this._imageClick);
    return this._element;
  }

  /* функция удаления карточки */
  _deleteClick() {    
    this._element.remove();
    this._element = null;
  }

  /* функция удаления/добавления лайка*/
  _likeClick() {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_on');
    /* Попробовать 17 строку вывести в отдельный метод и связать с объектом, содержащим константы.
     Цель - сделать общие константы для всех методов класса.
    Подумать, мб стоит вынести из метода createCard  все переменные в отдельный фаил и сделать объектом, 
    что бы потом через ключ.значение передавать DOM- элементБ но тогда теряется контектс this и работать функция скорее -всего не будет, 
    т.к.в 17 строке мы определяем, что есть this_.element.
    */
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

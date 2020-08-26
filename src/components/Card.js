
export default class Card {
  constructor(myId, array, cardSelector, {handleCardClick, handlerCardDelete, handlerAddLike, handlerDeleteLike}) {
    this._myId = myId;
    this._like = array.likes;
    this._id = array._id;
    this._ownerId = array.owner._id;
    this._link = array.link;
    this._name = array.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handlerCardDelete = handlerCardDelete;
    this._handlerAddLike = handlerAddLike;
    this._handlerDeleteLike = handlerDeleteLike;
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
    const likeCounter = this._element.querySelector('.element__like-counter');
    
    elementPhoto.src = this._link;
    elementPhoto.alt = this._name;    
    elementText.textContent = this._name;
    likeCounter.textContent = `${this._like.length}`;

    this._element.id = this._id;

    elementButtonLike.addEventListener('click', () => this._renderLike());
    elementBasket.addEventListener('click', () => this._handlerCardDelete());
    elementPhoto.addEventListener('click', () => this._handleCardClick());

    

    if (this._like.find((like) => {      
      return like._id === this._myId
    })) {
      elementButtonLike.classList.add('element__button-like_on');
    };
    
    if (this._ownerId === this._myId) {
      elementBasket.style.display = 'block'; 
    } else {
      elementBasket.style.display = 'none';
    }

    return this._element;
  }

  /* функция удаления карточки */
  deleteClick() {    
    this._element.remove();    
  }

  /* функция удаления/добавления лайка*/
  likeClick() {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_on')    
  }

  //метод подсчета лайков
  likeCounter(item) {
    this._element.querySelector('.element__like-counter').textContent = item.length;
  }

  //метод отображения лайков
  _renderLike() {
    const like = this._element.querySelector('.element__button-like');
    //используем тернарный оператор для проверки  и выбора метода из колбека
    !like.classList.contains('element__button-like_on') ? this._handlerAddLike() : this._handlerDeleteLike();
  }
} 

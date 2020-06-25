//функция закрытия по оверлею
export function closePopupWithOverlay(event) {
    if (event.target.classList.contains('popup')) { 
      closePopup(event.target);    
    }
  }
  
  // функция закрытия через ESC
  export function closePopupPressOnEsc(event) {
    if (event.key === 'Escape') {    
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);    
    }
  }
  
  //функция закрытия на крестик
  export function closePopupByCross() {  
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
  
  //функция открытия модального окна и добавление слушателей
  export function openPopup (element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupPressOnEsc);
    document.addEventListener('click', closePopupWithOverlay);
    element.querySelector('.popup__close-button').addEventListener('click', closePopupByCross);
  }
  
  //функция закряти модального окна и удаления слушателей
  export function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupPressOnEsc);
    document.removeEventListener('click', closePopupWithOverlay);
    element.querySelector('.popup__close-button').removeEventListener('click', closePopupByCross);
}  

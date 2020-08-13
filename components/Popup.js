export class Popup {
    constructor(itemPopup) {
      this._itemPopup = itemPopup;
      this._handleOverlayClose = this._handleOverlayClose.bind(this);
      this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleOverlayClose = (event) => {
      if (event.target.classList.contains('popup')) {
        this.close();
   }   
  }
  
    _handleEscClose = (event) => {
      if (event.key === 'Escape') {          
          this.close();
      }
    }
  
    open() {
      this._itemPopup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
      document.addEventListener('click', this._handleOverlayClose);
    }

    close() {
      this._itemPopup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
      document.removeEventListener('click', this._handleOverlayClose);
    }

    

    setEventListeners() {
      this._itemPopup.querySelector('.popup__close-button').addEventListener('click', () => {
        this.close();
      });
    }   
}
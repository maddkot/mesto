import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
   constructor(itemPopup) {
      super(itemPopup);
      this._popupImageFrame = this._itemPopup.querySelector('.popup-image__frame'); //картинка в попап-блоке галереии картинок
      this._popupImageTitle = this._itemPopup.querySelector('.popup-image__title'); //подпись в попап-блоке галереии картинок
   }
    open(name, link) {
        super.open();     
        
        this._popupImageFrame.src = link;
        this._popupImageTitle.alt = name;
        this._popupImageTitle.textContent = name;       
   } 
}
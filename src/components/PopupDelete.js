import  Popup  from "./Popup.js"

export default  class PopupDelete extends Popup {
    constructor(itemPopup) {
        super(itemPopup);
        this._buttonDelete = this._itemPopup.querySelector('.popup__button-delete');
    }


    //пробросим сабмит для удаления (метод "сеттер")
    setSubmit(funct) {
        this._submit = funct;
        }

    setEventListeners() {
        this._buttonDelete.addEventListener('click', (evt) => {
            evt.preventDefault();            
            this._submit();
            this.close();
        })
        super.setEventListeners();
    }

    
}


import Popup  from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(itemPopup,  { submitForm }) {
        super(itemPopup);
        this._submitForm = submitForm;
    }
    
    
    getInputValues() {
        this._formValues = {}; //создаем пустой объект
        this._allInput = Array.from(this._itemPopup.querySelectorAll('.popup__input')); //собираем в массив все инпуты попапа, который будет выбран
        this._allInput.forEach(input => { //каждый инпут из массива
            this._formValues[input.name] = input.value; //записываем в пустой массив, как значение аттрибута
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._itemPopup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitForm(this.getInputValues());
        });
    }

    close() {
        super.close();
        this._itemPopup.querySelector('.popup__form').reset();
    }    

}
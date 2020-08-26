export default class Section {
    constructor({ /*items,*/ renderer }, selectorContainer) {        
        //this._items = items;
        this._renderer = renderer;
        this._selectorContainer = document.querySelector(selectorContainer);
       
    }

    //рендеринг (отрисовка) карточки
    rendererItems(item) {        
        /*this._items*/item.reverse().forEach((item) => {
            this._renderer(item);
        });   
    }

    //добавление карточки
    addItem(item) {
        this._selectorContainer.prepend(item);
    }    
}
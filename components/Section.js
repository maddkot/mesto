export class Section {
    constructor({ items, renderer }, selectorContainer) {        
        this._items = items;
        this._renderer = renderer;
        this._selectorContainer = document.querySelector(selectorContainer);
       
    }

    //рендеринг (отрисовка) карточки
    rendererItems() {        
        this._items.forEach((item) => {
            this._renderer(item);
        });   
    }

    //добавление карточки
    addItem(item) {
        this._selectorContainer.prepend(item);
    }    
}
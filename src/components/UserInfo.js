export default class UserInfo {
    constructor({ fullNameSelector, descriptionSelector, profileAvatar }) {
        this._fullName = fullNameSelector;
        this._description = descriptionSelector;
        this._profileAvatar = profileAvatar;
    }


    //получение данных о пользователе
    getUserInfo() {
        return {
            fullName: this._fullName.textContent,
            description: this._description.textContent,
            avatar: this._profileAvatar.src
        };
    }


    //отправка данных о пользователе
    /* setUserInfo({ fullName, description, avatar }) {
        this._fullName.textContent = fullName;
        this._description.textContent = description;
        this._profileAvatar.src = avatar;
    } */

    setUserInfo(item) {
        this._fullName.textContent = item.name;
        this._description.textContent = item.about;
        this._profileAvatar.src = item.avatar;
    }

    //метод уставноки аватарки
    setAvatar(item) {
        this._profileAvatar.src = item.avatar;
    }
}


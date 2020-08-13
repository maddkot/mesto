export class UserInfo {
    constructor({ fullNameSelector, descriptionSelector }) {
        this._fullName = fullNameSelector;
        this._description = descriptionSelector;
    }

    getUserInfo() {
        return {
            fullName: this._fullName.textContent,
            description: this._description.textContent
        };
    }

    setUserInfo({ fullName, description }) {
        this._fullName.textContent = fullName;
        this._description.textContent = description;
    }
}
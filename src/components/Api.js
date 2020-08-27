import { Card } from "./Card";

export default class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;        
    }

    //метод вызова карточек с сервера
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Allert: ${res.status}`);
            });           
    }

    //метод отправки карточки на сервер
    addNewCard(item) {
        return fetch(`${this.baseUrl}/cards`,
            {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                        name: item.title,
                        link: item.url
                    })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Allert: ${res.status}`);
        });           
    }

    //метод удаления карточки
    deleteCard(id) { 
        return fetch(`${this.baseUrl}/cards/${id}`,
        {
            method: "DELETE",
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Allert: ${res.status}`);
        });
    }


    //метод отправки лайка карточек
    setLike(id) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`,
            {
                method: "PUT",
                headers: this.headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Allert: ${res.status}`);
            });
    }

    //метод удаления лайка карточек
    deleteLike(id) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`,
            {
                method: "DELETE",
                headers: this.headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Allert: ${res.status}`);
            });
    }


    //метод получения данных о профиле
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Allert: ${res.status}`);
        })
    }

    //метод изменение аватарки
    changeAvatar(avatarItem) {
        console.log(avatarItem);
        return fetch(`${this.baseUrl}/users/me/avatar`,
            {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify({
                    avatar: avatarItem.url
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Allert: ${res.status}`);
            });
    }

    //метод отправки данных профиля
    setUserInfo(item) {
        return fetch(`${this.baseUrl}/users/me`,
            {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify({
                    name: item.fullName,
                    about: item.description
                })
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                        }
                    return Promise.reject(`Allert: ${res.status}`);
            })
    }


}
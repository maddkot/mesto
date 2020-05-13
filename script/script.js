/* Присваиваем переменные постоянных значений DOM-элементам.*/
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const form = document.querySelector(".popup__form");

const fullName = document.querySelector(".profile__full-name");
const description = document.querySelector(".profile__description");
const popupFullName = document.querySelector(".popup__input_full-name");
const popupDescription = document.querySelector(".popup__input_description");

/* Функция открытия модального окна. 
(буду думать, как объединить их в одну функцию - пока не получается рабочий вариант!)*/
function openPopup() {
  popup.classList.add("popup_opened"); /* Добавляем класс DOM-элементу popup*/

  /* Подставляем данные из переменной страницы в модальное окно*/
  popupFullName.value = fullName.textContent;
  popupDescription.value = description.textContent;
}

/* Функция закрытия модального окна*/
function closePopup() {
  /* Удаляем класс DOM-элемента popup*/
  popup.classList.remove("popup_opened");
}

/* Функция отправки и сохранения изменений на странице из модального окна*/
function saveProfile(e) {
  /*отмена отправки формы*/
  e.preventDefault();

  /*Подставляем данные из переменной модального окна в переменную страницы.*/
  fullName.textContent = popupFullName.value;
  description.textContent = popupDescription.value;

  closePopup();
}

/* Присваиваем слушателей на события: 
1)клик на крестик, 2) клик на кнопку редактирования, 3) отслеживание отправки формы*/
closeButton.addEventListener("click", closePopup);
editButton.addEventListener("click", openPopup);
form.addEventListener("submit", saveProfile);

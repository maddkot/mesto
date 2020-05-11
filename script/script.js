const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const saveButton = document.querySelector(".popup__button-save");

const fullName = document.querySelector(".profile__full-name");
const description = document.querySelector(".profile__description");
const popupFullName = document.querySelector(".popup__full-name");
const popupDescriptions = document.querySelector(".popup__descriptions");

function openPopup() {
  popup.classList.add("popup_opened");
  popupFullName.value = fullName.textContent;
  popupDescriptions.value = description.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function saveProfile(e) {
  e.preventDefault();

  let popupFullName = document.querySelector(".popup__full-name");
  let popupDescriptions = document.querySelector(".popup__descriptions");

  fullName.textContent = popupFullName.value;
  description.textContent = popupDescriptions.value;

  closePopup();
}

function closePopupByEnter(e) {
  if (e.key === "Enter") {
    saveProfile(e);
  }
}

closeButton.addEventListener("click", closePopup);
editButton.addEventListener("click", openPopup);
saveButton.addEventListener("click", saveProfile);
popupFullName.addEventListener("keypress", closePopupByEnter);
popupDescriptions.addEventListener("keypress", closePopupByEnter);


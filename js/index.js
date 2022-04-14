import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup, handlePopupOverlayClick, handlePopupEscKeydown } from "./utils.js";

const cardsContainer = document.querySelector(".cards");
const popupProfile = document.querySelector(".popup-profile");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileFio = document.querySelector(".profile__fio");
const profileProfession = document.querySelector(".profile__profession");
const profileEditForm = document.querySelector(".popup__profile-edit");
const profileFioInput = profileEditForm.querySelector(".popup__profile-edit input[name=fio]");
const profileProfessionInput = profileEditForm.querySelector(".popup__profile-edit input[name=profession");

const popupAddCard = document.querySelector(".popup-card");
const cardAddButton = document.querySelector(".profile__add-button");
const cardAddForm = document.querySelector(".popup__card-insert");
const cardAddNameInput = cardAddForm.querySelector(".popup__card-insert input[name=card_name]");
const cardAddLinkInput = cardAddForm.querySelector(".popup__card-insert input[name=card_link]");

const formValidators = {};

function openProfilePopup() {
  profileFioInput.value = profileFio.textContent;
  profileProfessionInput.value = profileProfession.textContent;
  openPopup(popupProfile);
}

function submitProfileForm(evt) {
  profileFio.textContent = profileFioInput.value.trim();
  profileProfession.textContent = profileProfessionInput.value.trim();
  closePopup(popupProfile);
  disableFormSubmit(evt.target.name);
}

function submitAddCardForm(evt) {
  const data = {
    name: cardAddNameInput.value,
    link: cardAddLinkInput.value,
  };
  addCard(data);
  closePopup(popupAddCard);
  cardAddForm.reset();
  disableFormSubmit(evt.target.name);
}

function disableFormSubmit(name) {
  formValidators[name].disableButton();
}

function addCard(data){
  const card = new Card(data, ".card-template");
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}

profileEditButton.addEventListener("click", openProfilePopup);
profileEditForm.addEventListener("submit", submitProfileForm);
cardAddButton.addEventListener("click", function () {
  openPopup(popupAddCard);
});
cardAddForm.addEventListener("submit", submitAddCardForm);

initialCards.forEach((item) => {
  addCard(item);
});

const enableValidation = (data) => {
  const formList = Array.from(document.querySelectorAll(data.formSelector));
  formList.forEach((formElement) => {
    const form = new FormValidator(data, formElement);
    formValidators[formElement.getAttribute("name")] = form;
    form.enableValidation();
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
});

import './index.css';

import { initialCards } from "../utils/initialCards.js";
import {profileEditForm, cardAddForm, profileEditButton, profileFioInput, profileProfessionInput, cardAddButton, formValidatorObj} from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";


const formProfileValidator = new FormValidator(formValidatorObj, profileEditForm);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(formValidatorObj, cardAddForm);
formCardValidator.enableValidation();



const userInfo = new UserInfo({userName: '.profile__fio', userProfession: '.profile__profession'});
const popupProfile = new PopupWithForm('.popup-profile', (data) => {
  userInfo.setUserInfo(data);
});
popupProfile.setEventListeners();


function openProfilePopup() {
  const userInfoObj = userInfo.getUserInfo();
  profileFioInput.value = userInfoObj.fio;
  profileProfessionInput.value = userInfoObj.profession;
  formProfileValidator.disableButton();
  popupProfile.open();
}
profileEditButton.addEventListener("click", openProfilePopup);




const popupAddCard = new PopupWithForm('.popup-card', (data) => {
  createCards.addItem(createCard(data));
});
popupAddCard.setEventListeners();

cardAddButton.addEventListener("click", function () {
  formCardValidator.disableButton();
  popupAddCard.open();
});






//Попап с изображением
const popupImage = new PopupWithImage({
  popupSelector: '.popup-image',
  imgLink: '.popup__img',
  imgCaption: '.popup__img-caption'
});

//Добавляем слушатели на закрытие
popupImage.setEventListeners();

function handleCardClick(caption, link) {
  popupImage.open(caption, link);
};


const createCards = new Section({items: initialCards,renderer: cardRenderer}, '.cards');

function createCard(data){
  const card = new Card({data, handleCardClick}, ".card-template");
  const cardElement = card.generateCard();
  return cardElement;
}

function cardRenderer(data){
  const createdCard = createCard(data);
  createCards.addItem(createdCard);
}

createCards.renderItems();


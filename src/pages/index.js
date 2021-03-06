import './index.css';

import {avatarEditButton, avatarEditForm, profileEditForm, cardAddForm, profileEditButton, profileNameInput, profileAboutInput, cardAddButton, formValidatorObj} from "../utils/constants.js";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupCardDelete from "../components/PopupCardDelete.js";

import Section from "../components/Section.js";

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '53a2bd56-5409-4930-9571-4ecf3b85a371',
    'Content-Type': 'application/json'
  }
})

const userInfo = new UserInfo({
  userName: '.profile__fio', 
  userProfession: '.profile__profession', 
  userAvatar: '.profile__avatar'
});


const popupProfile = new PopupWithForm('.popup-profile', (data) => {
  api.setUserInfo(data).then((resp) => {
    userInfo.setHtmlUserInfo(resp);
    popupProfile.close();
  })
  .catch((err) => alert(err))
  .finally(() => {
    popupProfile.replaceSubmitText();
  }); 
});
popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm('.popup-avatar', (data) => {
  api.setUserAvatar(data).then((resp) => {
    userInfo.setHtmlUserInfo(resp);
    popupAvatar.close();
  })
  .catch((err) => alert(err))
  .finally(() => {
    popupAvatar.replaceSubmitText();
  }); 
});
popupAvatar.setEventListeners();


api.getInitialData().then(resp => {
  const [ userInitialData, cardsInitialData ] = resp;
  
  //Пользователь  
  const userId = userInitialData._id;
  userInfo.setHtmlUserInfo(userInitialData);
    
  //Сортировка по времени по убыванию
  cardsInitialData.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);
  
  const createCards = new Section({items: cardsInitialData,renderer: cardRenderer}, '.cards');
  
  function cardRenderer(data){
    const createdCard = createCard(data);
    createCards.addItem(createdCard);
  }
  
  function createCard(data){
    const card = new Card({
        data,
        handleCardClick: (card) => {
          popupImage.open(card._name, card._link);
        },
        handleLikeClick: (card) => {
          const likeAction = (card._ownerLiked)? api.deleteLike(card._cardId):api.setLike(card._cardId);
          
          likeAction.then((resp) => {
            card.handlerLikes(resp.likes);
          })
          .catch((err) => alert(err)); 
        },
        handleCardRemoveClick: (card) => {
          popupCardDelete.open(card);
        },
        userId
      }, ".card-template");
    const cardElement = card.generateCard();
    return cardElement;
  }
  
  const popupAddCard = new PopupWithForm('.popup-card', (data) => {
    api.addCard(data).then((resp) => {
      createCards.addItem(createCard(resp));
      popupAddCard.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupAddCard.replaceSubmitText();
    }); 
  });
  popupAddCard.setEventListeners();
  
  cardAddButton.addEventListener("click", function () {
    formCardValidator.resetValidation();
    popupAddCard.open();
  });
  
  createCards.renderItems();
})
.catch((err) => alert(err));


const formProfileValidator = new FormValidator(formValidatorObj, profileEditForm);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(formValidatorObj, cardAddForm);
formCardValidator.enableValidation();

const formAvatarValidator = new FormValidator(formValidatorObj, avatarEditForm);
formAvatarValidator.enableValidation();


function openProfilePopup() {
  const userInfoObj = userInfo.getUserInfo();
  profileNameInput.value = userInfoObj.fio;
  profileAboutInput.value = userInfoObj.profession;
  formProfileValidator.resetValidation();  
  popupProfile.open();
}
profileEditButton.addEventListener("click", openProfilePopup);

function openAvatarPopup() {
  formAvatarValidator.resetValidation();
  popupAvatar.open();
}
avatarEditButton.addEventListener("click", openAvatarPopup);

//Попап подтверждение удаления карточки 
const popupCardDelete = new PopupCardDelete('.popup-delete', (data) => {
  api.deleteCard(data._cardId).then(() => {
    data.handleRemoveCard();
    popupCardDelete.close();
  }).catch((err) => alert(err)); 
});
popupCardDelete.setEventListeners();


//Попап с изображением
const popupImage = new PopupWithImage({
  popupSelector: '.popup-image',
  imgLink: '.popup__img',
  imgCaption: '.popup__img-caption'
});
popupImage.setEventListeners();

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const cardsContainer = document.querySelector(".cards");
const cardTemplate =
  document.querySelector(".card-template").content.firstElementChild;
const popupCloseButtons = document.querySelectorAll(".popup__close-button");

const popupProfile = document.querySelector(".popup-profile");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileFio = document.querySelector(".profile__fio");
const profileProfession = document.querySelector(".profile__profession");
const profileEditForm = document.querySelector(".popup__profile-edit");
const profileFioInput = profileEditForm.querySelector(
  ".popup__profile-edit input[name=fio]"
);
const profileProfessionInput = profileEditForm.querySelector(
  ".popup__profile-edit input[name=profession"
);

const popupAddCard = document.querySelector(".popup-card");
const cardAddButton = document.querySelector(".profile__add-button");
const cardAddForm = document.querySelector(".popup__card-insert");
const cardAddNameInput = cardAddForm.querySelector(
  ".popup__card-insert input[name=card_name]"
);
const cardAddLinkInput = cardAddForm.querySelector(
  ".popup__card-insert input[name=card_link]"
);

const popupImg = document.querySelector(".popup-image");
const imgLink = document.querySelector(".popup__img");
const imgCaption = document.querySelector(".popup__img-caption");

function openProfilePopup() {
  profileFioInput.value = profileFio.textContent;
  profileProfessionInput.value = profileProfession.textContent;
  togglePopup(popupProfile);
}

function openImgPopup(img) {
  const imgSrc = img.getAttribute("src");
  const imgAlt = img.getAttribute("alt");
  imgCaption.textContent = imgAlt;
  imgLink.setAttribute("src", imgSrc);
  imgLink.setAttribute("alt", imgAlt);
  togglePopup(popupImg);
}

function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileFio.textContent = profileFioInput.value.trim();
  profileProfession.textContent = profileProfessionInput.value.trim();
  togglePopup(popupProfile);
  profileEditForm.reset();
}

function submitAddCardForm(evt) {
  evt.preventDefault();
  const data = {
    name: cardAddNameInput.value,
    link: cardAddLinkInput.value,
  };
  renderCard(data);
  togglePopup(popupAddCard);
  cardAddForm.reset();
}

function createCard(cardObj) {
  const card = cardTemplate.cloneNode(true);
  const cardImg = card.querySelector(".card__img");
  const cardTitle = card.querySelector(".card__title");
  const cardLike = card.querySelector(".card__like");
  const cardTrash = card.querySelector(".card__trash");

  cardTitle.textContent = cardObj.name;
  cardImg.setAttribute("src", cardObj.link);
  cardImg.setAttribute("alt", cardObj.name);

  cardLike.addEventListener("click", function () {
    likeCard(cardLike);
  });
  cardTrash.addEventListener("click", function () {
    removeCard(card);
  });
  cardImg.addEventListener("click", function () {
    openImgPopup(cardImg);
  });
  return card;
}

function renderCard(cardObj) {
  const card = createCard(cardObj);
  cardsContainer.prepend(card);
}

function removeCard(card) {
  card.remove();
}

function likeCard(cardLike) {
  cardLike.classList.toggle("card__like_active");
}

profileEditButton.addEventListener("click", openProfilePopup);
profileEditForm.addEventListener("submit", submitProfileForm);
cardAddButton.addEventListener("click", function () {
  togglePopup(popupAddCard);
});
cardAddForm.addEventListener("submit", submitAddCardForm);

popupCloseButtons.forEach((closeBtn) => {
  const popup = closeBtn.closest(".popup");
  closeBtn.addEventListener("click", function () {
    togglePopup(popup);
  });
});

initialCards.map(renderCard);

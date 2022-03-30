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
  openPopup(popupProfile);
}

function openImgPopup(img) {
  const imgSrc = img.getAttribute("src");
  const imgAlt = img.getAttribute("alt");
  imgCaption.textContent = imgAlt;
  imgLink.setAttribute("src", imgSrc);
  imgLink.setAttribute("alt", imgAlt);
  openPopup(popupImg);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handlePopupEscKeydown);
  popup.addEventListener("click", handlePopupOverlayClick);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handlePopupEscKeydown);
  popup.removeEventListener("click", handlePopupOverlayClick);
}

function handlePopupOverlayClick(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  // console.log(evt.target);
  // console.log(evt.currentTarget);
  if (
    evt.target.classList.contains("popup_opened") ||
    evt.target.classList.contains("popup__close-button")
  ) {
    closePopup(openedPopup);
  }
}

function handlePopupEscKeydown(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileFio.textContent = profileFioInput.value.trim();
  profileProfession.textContent = profileProfessionInput.value.trim();
  closePopup(popupProfile);
  profileEditForm.reset();
}

function submitAddCardForm(evt) {
  evt.preventDefault();
  const data = {
    name: cardAddNameInput.value,
    link: cardAddLinkInput.value,
  };
  renderCard(data);
  closePopup(popupAddCard);
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
  openPopup(popupAddCard);
});
cardAddForm.addEventListener("submit", submitAddCardForm);

initialCards.map(renderCard);

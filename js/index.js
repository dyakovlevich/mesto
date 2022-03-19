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
const cardsList = document.querySelector(".cards");


const popupProfile = document.querySelector(".popup-profile");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileFio = document.querySelector(".profile__fio");
const profileProfession = document.querySelector(".profile__profession");
const profileEditForm = document.querySelector(".popup__profile-edit");
const profileFioInput = document.querySelector(".popup__profile-edit input[name=fio]");
const profileProfessionInput = document.querySelector(".popup__profile-edit input[name=profession");


const popupAddCard = document.querySelector(".popup-card");
const cardAddButton = document.querySelector(".profile__add-button");
const cardAddForm = document.querySelector(".popup__card-insert");
const cardAddNameInput = document.querySelector(".popup__card-insert input[name=card_name]");
const cardAddLinkInput = document.querySelector(".popup__card-insert input[name=card_link]");

const popupImg = document.querySelector(".popup-image");
const imgLink = document.querySelector(".popup__img");
const imgCaption = document.querySelector(".popup__img-caption");

function openProfilePopup() {
  openPopup(popupProfile);
  profileFioInput.value = profileFio.textContent;
  profileProfessionInput.value = profileProfession.textContent;
}

function openImgPopup(img) {
  openPopup(popupImg);
  const imgSrc = img.getAttribute('src');
  const imgAlt = img.getAttribute('alt');
  imgCaption.textContent = imgAlt;
  imgLink.setAttribute('src', imgSrc);
  imgLink.setAttribute('alt', imgAlt);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileFio.textContent = profileFioInput.value.trim();
  profileProfession.textContent = profileProfessionInput.value.trim();
  closePopup();
}

function submitAddCardForm(evt) {
  evt.preventDefault();
  const data = {
    name: cardAddNameInput.value,
    link: cardAddLinkInput.value
  };  
  insertCard(data);
  closePopup();
  cardAddForm.reset();
}

function insertCard(cardObj) {
  const card = document
    .querySelector(".card-template")
    .content.firstElementChild.cloneNode(true);

  card.querySelector(".card__title").textContent = cardObj.name;
  card.querySelector(".card__img").setAttribute("src", cardObj.link);
  card.querySelector(".card__img").setAttribute("alt", cardObj.name);
  cardsList.prepend(card);
}



document.body.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  const popup = event.target.closest(".popup");
  const img = event.target.closest(".card__img");

  if (!card && !popup && !img) {
    return;
  }

  if (event.target.classList.contains("card__trash")) {
    removeCard(card);
  } else if (event.target.classList.contains("card__like")) {
    likeCard(card);
  } else if (event.target.classList.contains("popup__close-button")) {
    closePopup();
  } else if (event.target.classList.contains("card__img")) {
    openImgPopup(img);
  }
});

function removeCard(card) {
  card.remove();
}

function likeCard(card) {
  card.querySelector(".card__like").classList.toggle("card__like_active");
}

function closePopup() {
  document.querySelectorAll(".popup").forEach((el) => el.classList.remove("popup_opened"));
}

profileEditButton.addEventListener("click", openProfilePopup);
profileEditForm.addEventListener("submit", submitProfileForm);
cardAddButton.addEventListener("click", function () {openPopup(popupAddCard);});
cardAddForm.addEventListener("submit", submitAddCardForm);

initialCards.map(insertCard);
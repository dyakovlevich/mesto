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
const popup = document.querySelector(".popup");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupCloseButton = document.querySelector(".popup__close-button");

const profileFio = document.querySelector(".profile__fio");
const profileProfession = document.querySelector(".profile__profession");

const profileFioInput = document.querySelector(".popup__edit input[name=fio]");
const profileProfessionInput = document.querySelector(
  ".popup__edit input[name=profession"
);

const profileEditForm = document.querySelector(".popup__edit");

function openProfilePopup() {
  popup.classList.add("popup_opened");
  profileFioInput.value = profileFio.textContent;
  profileProfessionInput.value = profileProfession.textContent;
}

function closeProfilePopup() {
  popup.classList.remove("popup_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileFio.textContent = profileFioInput.value.trim();
  profileProfession.textContent = profileProfessionInput.value.trim();
  closeProfilePopup();
}

function insertCard(cardObj) {
  const card = document
    .querySelector(".card-template")
    .content.firstElementChild.cloneNode(true);

  card.querySelector(".card__title").textContent = cardObj.name;
  card.querySelector(".card__img").setAttribute("src", cardObj.link);
  card.querySelector(".card__img").setAttribute("alt", cardObj.name);
  cardsList.append(card);
}



document.body.addEventListener("click", (event) => {
  const card = event.target.closest(".card");

  if (!card) {
    return;
  }

  if (event.target.classList.contains("card__trash")) {
    removeCard(card);
  } else if (event.target.classList.contains("card__like")) {
    likeCard(card);
  }
  
  function removeCard(card) {
    card.remove();
  }
  
  function likeCard(card) {
    card.querySelector(".card__like").classList.toggle("card__like_active");
  }
});

profileEditButton.addEventListener("click", openProfilePopup);
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
popupCloseButton.addEventListener("click", closeProfilePopup);
popup.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) {
    closeProfilePopup();
  }
});

initialCards.map(insertCard);

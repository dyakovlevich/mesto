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

profileEditButton.addEventListener("click", openProfilePopup);
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
popupCloseButton.addEventListener("click", closeProfilePopup);
popup.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) {
    closeProfilePopup();
  }
});

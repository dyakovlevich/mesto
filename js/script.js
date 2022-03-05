let popup = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__container');
let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');

let profileFio = document.querySelector('.profile__fio');
let profileProfession = document.querySelector('.profile__profession');

let profileFioInput = document.querySelector('.profile__edit input[name=fio]');
let profileProfessionInput = document.querySelector('.profile__edit input[name=profession');

let profileEditForm = document.querySelector('.profile__edit');

function popupOpen() {
  popup.classList.add('popup_opened');
  profileFioInput.value = profileFio.textContent;
  profileProfessionInput.value = profileProfession.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileFio.textContent =  profileFioInput.value.trim();
  profileProfession.textContent =  profileProfessionInput.value.trim();
  popupClose();
}

profileEditButton.addEventListener('click', popupOpen);
profileEditForm.addEventListener('submit', formSubmitHandler);

//Закрытие
popupCloseButton.addEventListener('click', popupClose);
popup.addEventListener('click', function(e) {
  if(e.target === e.currentTarget){
    popupClose();
  }
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    popupClose();
  }
});
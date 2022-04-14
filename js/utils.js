export { openPopup, closePopup, handlePopupOverlayClick, handlePopupEscKeydown };

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handlePopupEscKeydown);
  popup.addEventListener("mousedown", handlePopupOverlayClick);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handlePopupEscKeydown);
  popup.removeEventListener("mousedown", handlePopupOverlayClick);
}

function handlePopupOverlayClick(evt) {
  if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-button")) {
    closePopup(evt.currentTarget);
  }
}

function handlePopupEscKeydown(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
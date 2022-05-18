import Popup from './Popup.js';

export default class PopupCardDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open(card) {
    super.open();
    this._card = card;
  }
  
  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card);
    });
  }
}
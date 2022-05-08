import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({popupSelector, imgLink, imgCaption}) {
    super(popupSelector);
    this._imgLink = document.querySelector(imgLink);
    this._imgCaption = document.querySelector(imgCaption);
  }

  open(Caption, Link) {
    this._imgLink.src = Link;
    this._imgCaption.alt = Caption;
    this._imgCaption.textContent = Caption;
    super.open();
  }
}
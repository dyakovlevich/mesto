import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({popupSelector, imgLink, imgCaption}) {
    super(popupSelector);
    this._imgLink = this._popup.querySelector(imgLink);
    this._imgCaption = this._popup.querySelector(imgCaption);
  }

  open(Caption, Link) {
    this._imgLink.src = Link;
    this._imgCaption.alt = Caption;
    this._imgCaption.textContent = Caption;
    super.open();
  }
}
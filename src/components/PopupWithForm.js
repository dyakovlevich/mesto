import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._submitButton = this._popupForm.querySelector('.popup__submit');
    this._submitButtonText = this._submitButton.textContent;
    this._submitButtonLoadingText = 'Сохранение...';
  }
  
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => formValues[input.name] = input.value);
    return formValues;
  }
  
  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      this._submitButton.textContent  = this._submitButtonLoadingText;
      this._handleFormSubmit(this._getInputValues());
    });
  }
  
  close(){
    super.close();
    this._submitButton.textContent  = this._submitButtonText;
    this._popupForm.reset();
  }
}
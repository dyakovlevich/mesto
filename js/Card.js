import { openPopup, closePopup, handlePopupOverlayClick, handlePopupEscKeydown } from "./utils.js";

export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }
    
    _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
      return cardElement;
    }
    
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();

      const _cardImg = this._element.querySelector(".card__img");
      const _cardTitle = this._element.querySelector(".card__title");

      _cardTitle.textContent = this._name;
      _cardImg.setAttribute("src", this._link);
      _cardImg.setAttribute("alt", this._name);  
      
      return this._element;
    } 

    _setEventListeners() {
      //Слушетель лайка
      this._element.querySelector(".card__like").addEventListener('click', () => {
        this._handleLikeClick();
      });
      
      //Слушетель удаления
      this._element.querySelector(".card__trash").addEventListener('click', () => {
        this._handleRemoveCardClick();
      });
      
      //Слушатель открытия попапа
      this._element.querySelector(".card__img").addEventListener('click', () => {
        this._handleOpenPopupClick();
      });
    }
    
    //Действие при лайке
    _handleLikeClick() {
      this._element.querySelector(".card__like").classList.toggle("card__like_active");
    }
    
    //Действие при удалении
    _handleRemoveCardClick() {
      this._element.remove();
    }
    
    //Действие при клике на карточку
    _handleOpenPopupClick() {
      const popupImg = document.querySelector(".popup-image");
      const imgLink = document.querySelector(".popup__img");
      const imgCaption = document.querySelector(".popup__img-caption");

      const imgSrc = this._link;
      const imgAlt = this._name;
      imgCaption.textContent = imgAlt;
      imgLink.setAttribute("src", imgSrc);
      imgLink.setAttribute("alt", imgAlt);
      openPopup(popupImg);
    }
}
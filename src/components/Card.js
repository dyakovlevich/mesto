export default class Card {
    constructor({data, handleCardClick}, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }
    
    _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
      return cardElement;
    }
    
    generateCard() {
      this._element = this._getTemplate();
      this._cardImg = this._element.querySelector(".card__img");
      this._cardLike = this._element.querySelector(".card__like");
      this._setEventListeners();

      const _cardTitle = this._element.querySelector(".card__title");

      _cardTitle.textContent = this._name;
      this._cardImg.setAttribute("src", this._link);
      this._cardImg.setAttribute("alt", this._name);  
      
      return this._element;
    } 

    _setEventListeners() {
      //Слушетель лайка
      this._cardLike.addEventListener('click', () => {
        this._handleLikeClick();
      });
      
      //Слушетель удаления
      this._element.querySelector(".card__trash").addEventListener('click', () => {
        this._handleRemoveCardClick();
      });
      
      //Слушатель открытия попапа
      this._cardImg.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });
    }
    
    //Действие при лайке
    _handleLikeClick() {
      this._cardLike.classList.toggle("card__like_active");
    }
    
    //Действие при удалении
    _handleRemoveCardClick() {
      this._element.remove();
      this._element = null;
    }
}
export default class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleCardRemoveClick, userId }, cardSelector) {
    this._data = data;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._likesArray = data.likes;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleCardRemoveClick = handleCardRemoveClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardTrashIcon = this._element.querySelector(".card__trash");
    this._cardImg = this._element.querySelector(".card__img");
    this._cardLike = this._element.querySelector(".card__like");
    this._cardLikesCount = this._element.querySelector(".card__like-count");
    this._cardTitle = this._element.querySelector(".card__title");

    this._cardTitle.textContent = this._name;
    this._cardImg.setAttribute("src", this._link);
    this._cardImg.setAttribute("alt", this._name);
    
    this._checkDeleteAvailable();
    this._handlerLikes(this._likesArray);
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    //Слушетель лайка
    this._cardLike.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    //Слушетель удаления
    if (this._userId === this._ownerId) {
      this._cardTrashIcon.addEventListener("click", () => {
        this._handleCardRemoveClick(this);
      });
    }

    //Слушатель открытия попапа
    this._cardImg.addEventListener("click", () => {
      this._handleCardClick(this);
    });
  }

  _handlerLikes(likesArray){
    this._ownerLiked = false;
    this._cardLike.classList.remove("card__like_active");
    likesArray.forEach((item) => {
      if (this._userId == item._id) {
        this._ownerLiked = true;
        this._cardLike.classList.add("card__like_active");
      }
    });
    this._cardLikesCount.textContent = likesArray.length;
  }
  
  //Действие при удалении
  _handleRemoveCard() {
    this._element.remove();
    this._element = null;
  }
  
  _checkDeleteAvailable(){
    if (this._userId !== this._ownerId) {
      this._cardTrashIcon.remove();
    }
  }
}

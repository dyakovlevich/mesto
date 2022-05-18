export default class UserInfo {
  constructor({userName, userProfession, userAvatar, api}) {
    this._userName = document.querySelector(userName);
    this._userProfession = document.querySelector(userProfession);
    this._userAvatar = document.querySelector(userAvatar);
  }
  
  getUserInfo() {
    const userObj = {
      fio: this._userName.textContent,
      profession: this._userProfession.textContent,
    };
    return userObj;
  }

  setHtmlUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAvatar.alt = data.name;
    this._userProfession.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}
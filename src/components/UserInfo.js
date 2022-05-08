export default class UserInfo {
  constructor({userName, userProfession}) {
    this._userName = document.querySelector(userName);
    this._userProfession = document.querySelector(userProfession);
  }
  
  getUserInfo() {
    const userObj = {
      fio: this._userName.textContent,
      profession: this._userProfession.textContent,
    };
    return userObj;
  }

  setUserInfo({fio, profession}) {
    this._userName.textContent = fio;
    this._userProfession.textContent = profession;
  }
}
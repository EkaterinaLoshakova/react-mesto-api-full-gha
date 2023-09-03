class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    // this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getInitialCards(token) {
    return fetch(this._baseUrl + "/cards", {
      method: "GET",
      // headers: this._headers,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  getUserData(token) {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      // headers: this._headers,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  setUserData(data, token) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      // headers: this._headers,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      }),
    }).then(this._checkResponse);
  }

  setUserAvatar(data, token) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      // headers: this._headers,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }

  postCard(data, token) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      // headers: this._headers,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.namecard,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  addLike(cardId, token) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: "PUT",
      // headers: this._headers,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  deleteLike(cardId, token) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: "DELETE",
      // headers: this._headers,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  deleteCard(cardId, token) {
    return fetch(this._baseUrl + `/cards/${cardId}`, {
      method: "DELETE",
      // headers: this._headers,
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://api.mesto.kattrin.nomoredomainsicu.ru/sign-up",
  // baseUrl: "http://127.0.0.1:3000",
  // headers: {
  //   authorization: "a40765c6-fe1b-44c0-b3c0-355a192bdaad",
  //   "Content-Type": "application/json",
  // },
});

export default api;

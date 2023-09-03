const baseUrl = "https://mesto.kattrin.nomoredomainsicu.ru";
// const baseUrl = "http://127.0.0.1:3000";

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(getResponseData);
};

export const authorization = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(getResponseData);
};

export const getToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      // Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(getResponseData);
};

export const getUserData = (token) => {
  return fetch(this._baseUrl + "/users/me", {
    method: "GET",
    // headers: this._headers,
    headers: {
      Authorization: `Barer ${token}`,
    },
  }).then(this._checkResponse);
};

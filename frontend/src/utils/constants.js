const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

/*Кнопки открытия попоапов*/
const popupButtonEdit = document.querySelector(".edit-button");
const buttonAddCard = document.querySelector(".add-button");

/*Кнопка редактирования профайла */
const buttonEditAvatar = document.querySelector(".profile__button");

const formEditProfile = document.forms["profile-form"];
const formAddCard = document.forms["card-form"];
const formEditAvatar = document.forms["avatar-form"];
const selectorList = ".photo-gallery__list";
const selectorPopupCard = ".popup_popup_add-card";
const objectInfo = {
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
  avatarSelector: ".profile__avatar",
};
const selectorProfile = ".popup_popup_edit-profile";

const objectValidation = {
  inputSelector: ".form__field",
  submitButtonSelector: ".button-submit",
  inactiveButtonClass: "button-submit_disabled",
  inputErrorClass: "form__field_type_error",
  errorClass: "error_visible",
};

export {
  initialCards,
  formEditProfile,
  formAddCard,
  selectorList,
  selectorPopupCard,
  objectInfo,
  selectorProfile,
  objectValidation,
  popupButtonEdit,
  buttonAddCard,
  buttonEditAvatar,
  formEditAvatar,
};

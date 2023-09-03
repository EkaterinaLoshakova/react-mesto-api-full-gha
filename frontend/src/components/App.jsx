import Header from "./Header/Header.jsx";
//import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./Register/Register.jsx";
import { authorization, getToken, register } from "../utils/authorization.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import Login from "./Login/Login.jsx";
import ProtectedRouteHomePage from "./ProtectedHomePage/ProtectedHomePage.jsx";

function App() {
  // Стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [isConfirmationPopup, setIsConfirmation] = useState(false);

  // Стейт карточки
  const [cards, setCards] = useState([]);
  const [deleteCard, setDeletecard] = useState("");

  // Стейт контекста
  const [currentUser, setCurrentUser] = useState({});

  // Стейт авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);

  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Запрос на сервер для отрисоавки данных пользоваетля и карточек
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        api.getUserData(localStorage.jwt),
        api.getInitialCards(localStorage.jwt),
      ])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          // setUserName(userData.name);
          // setUserDescription(userData.about);
          // setUserAvatar(userData.avatar);
          // initialCards.forEach((card) => {
          //   card.myId = userData._id;
          // });
          setCards(initialCards);
        })
        .catch((error) => {
          console.error(
            `Ошибка запроса данных карточек и пользователя ${error}`
          );
        });
    }
  }, [isLoggedIn]);

  const setCloseAllPopups = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopup(false);
    setIsConfirmation(false);
    setIsTooltipPopupOpen(false);
  }, []);

  const closePopupByEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        setCloseAllPopups();
        document.removeEventListener("keydown", closePopupByEsc);
      }
    },
    [setCloseAllPopups]
  );

  const closeAllPopups = useCallback(() => {
    setCloseAllPopups();
    document.removeEventListener("keydown", closePopupByEsc);
  }, [setCloseAllPopups, closePopupByEsc]);

  function setEventListener() {
    document.addEventListener("keydown", closePopupByEsc);
  }

  // function closePopupByEsc(evt) {
  //   if (evt.key === "Escape") {
  //     closeAllPopups();
  //     document.removeEventListener("keydown", closePopupByEsc);
  //   }
  // }

  // function closePopupsByOverlay(evt) {
  //   if (evt.target === evt.currentTarget) {
  //     closeAllPopups();
  //     document.removeEventListener("keydown", closePopupByEsc);
  //   }
  // }

  //Функция удаления карточки с сервера
  function handleCardDelete(evt) {
    evt.preventDefault();
    api
      .deleteCard(deleteCard, localStorage.jwt)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCard;
          })
        );
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка удаления карточки ${error}`));
  }

  function handleConfirmationPopup(card) {
    setDeletecard(card);
    setIsConfirmation(true);
    setEventListener();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
    setEventListener();
  }

  // function closeAllPopups() {
  //   setIsEditAvatarPopupOpen(false);
  //   setIsEditProfilePopupOpen(false);
  //   setIsAddPlacePopupOpen(false);
  //   setIsImagePopup(false);
  //   setIsConfirmation(false);
  // }

  ///Функция-обработчик  данных пользователя с сервера

  function handleUpdateUser(userData, reset) {
    api
      .setUserData(userData, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) => console.error(error));
  }

  function handleUpdateAvatar(userData, reset) {
    api
      .setUserAvatar(userData, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) => console.error(error));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEventListener();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListener();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListener();
  }

  //Функция-обработчик данных карточек с сервера
  function handleAddPlaceSubmit(card, reset) {
    api
      .postCard(card, localStorage.jwt)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((error) => console.error(error));
  }

  function handleLoginSubmit(email, password) {
    authorization(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          setIsLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          //handleTokenCheck();
          navigate("/");
        }
      })
      .catch((errorMessage) => {
        setIsTooltipPopupOpen(true);
        setIsInfoTooltipSuccess(false);
        console.error(`Ошибка авторизации ${errorMessage}`);
      });
  }

  useEffect(() => {
    if (localStorage.jwt) {
      getToken(localStorage.jwt)
        .then((res) => {
          setUserEmail(res.email);
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch((error) => {
          console.error(`Ошибка сохранения токена ${error}`);
        });
    }
  }, [navigate]);

  // function handleTokenCheck() {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     getToken(jwt)
  //       .then((res) => {
  //         if (res) {
  //           setUserEmail(res.data.email);
  //           setIsLoggedIn(true);
  //           navigate("/");
  //         }
  //       })
  //       .catch((errorMessage) => {
  //         console.error(`Ошибка верификации токена  ${errorMessage}`);
  //       });
  //   }
  // }

  //Функция отправки регистрации

  function handleRegisterSubmit(email, password) {
    register(email, password)
      .then((data) => {
        if (data) {
          setIsInfoTooltipSuccess(true);
          navigate("/sign-in");
        }
      })
      .catch((errorMessage) => {
        setIsInfoTooltipSuccess(false);
        console.error(`Ошибка регистрации ${errorMessage}`);
      })
      .finally(() => setIsTooltipPopupOpen(true));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                element={ProtectedRouteHomePage}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onConfirmation={handleConfirmationPopup}
                cards={cards}
                userEmail={userEmail}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header name="sign-up" />
                <Register isRegister={handleRegisterSubmit} />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header name="sign-in" />
                <Login isLogin={handleLoginSubmit} />
              </>
            }
          />
        </Routes>

        <InfoTooltip
          name="tooltip"
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
          isTooltipSuccess={isInfoTooltipSuccess}
        />

        {isLoggedIn && <Footer />}

        {/* <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onConfirmation={handleConfirmationPopup}
          cards={cards}
        />
        <Footer /> */}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          name="editProfilePopup"
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="confirmation"
          title="Вы уверены?"
          buttonText="Да"
          onClose={closeAllPopups}
          isOpen={isConfirmationPopup}
          onSubmit={handleCardDelete}
        ></PopupWithForm>

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
          name="image"
        />
      </div>

      {/*Попап редактирования профайла*/}
      {/* <div className="popup popup_popup_edit-profile">
        <div className="popup__container">
          <button
            className="popup__close-icon hover"
            type="button"
            aria-label="Закрыть"
          />
          <p className="popup__title">Редактировать профиль</p>
          <form className="form" name="profile-form" noValidate="">
            <div className="popup__input">
              <div className="popup__input-and-error">
                <input
                  type="text"
                  id="name"
                  className="form__field form__field_value_name"
                  name="name"
                  minLength={2}
                  maxLength={40}
                  required=""
                />
                <span id="name-error" className="error" />
              </div>
              <div className="popup__input-and-error">
                <input
                  type="text"
                  id="job"
                  className="form__field form__field_value_job"
                  name="job"
                  minLength={2}
                  maxLength={200}
                  required=""
                />
                <span id="job-error" className="error" />
              </div>
            </div>
            <button className="button-submit" type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div> */}
      {/*Попап добавления фото*/}
      {/* <div className="popup popup_popup_add-card">
        <div className="popup__container">
          <button className="popup__close-icon hover" />
          <p className="popup__title">Новое место</p>
          <form action="" className="form" name="card-form">
            <div className="popup__input">
              <div className="popup__input-and-error">
                <input
                  name="name"
                  type="text"
                  id="place"
                  className="form__field form__field_value_place"
                  placeholder="Название"
                  minLength={2}
                  maxLength={30}
                  required=""
                />
                <span id="place-error" className="error" />
              </div>
              <div className="popup__input-and-error">
                <input
                  name="link"
                  type="url"
                  id="src"
                  className="form__field form__field_value_src"
                  placeholder="Ссылка на картинку"
                  required=""
                />
                <span id="src-error" className="error" />
              </div>
            </div>
            <button className="button-submit" type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div> */}
      {/*Попап открытия фото*/}
      {/* <div className="popup popup_popup_image">
        <figure className="popup__figure">
          <button className="popup__close-icon hover" />
          <img src="#" alt="#" className="popup__figure-image" />
          <figcaption className="popup__figure-caption" />
        </figure>
      </div> */}
      {/*Попап подтверждения удаления фото*/}
      {/* <div className="popup popup_popup_confirmation">
        <div className="popup__container">
          <p className="popup__title popup__title_delete">Вы уверены?</p>
          <form action="" className="form" name="popup_confirmation">
            <button className="popup__close-icon hover" />
            <button className="button-submit" type="submit">
              Да
            </button>
          </form>
        </div>
      </div> */}
      {/*Попап обновления аватара*/}
      {/* <div className="popup popup_popup_update-avatar">
        <div className="popup__container">
          <button className="popup__close-icon hover" />
          <p className="popup__title">Обновить аватар</p>
          <form action="" className="form" name="avatar-form">
            <div className="popup__input">
              <div className="popup__input-and-error">
                <input
                  name="avatar"
                  type="url"
                  id="avatar"
                  className="form__field form__field_value_place"
                  placeholder="Название"
                  required=""
                />
                <span id="avatar-error" className="error" />
              </div>
            </div>
            <button className="button-submit" type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div> */}
    </CurrentUserContext.Provider>
  );
}

export default App;

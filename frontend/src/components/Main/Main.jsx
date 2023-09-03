import { useContext } from "react";
import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onConfirmation,
  cards,
}) {
  // const [userName, setUserName] = useState("");
  // const [userDescription, setUserDescription] = useState("");
  // const [userAvatar, setUserAvatar] = useState("");

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content page__margin-left-right">
      <section className="profile">
        <div className="profile__wrapper">
          <button
            className="profile__button"
            type="button"
            aria-label="Редактировать профайл"
            onClick={onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              className="profile__avatar"
              alt="Фото аватара"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="edit-button hover"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            />
            <h2 className="profile__job">{currentUser.about}</h2>
          </div>
        </div>
        <button
          className="add-button hover"
          type="button"
          aria-label="Добавить фото"
          onClick={onAddPlace}
        />
      </section>
      <section className="photo-gallery">
        <ul className="photo-gallery__list">
          {cards.map((card) => {
            return (
              <li className="photo-gallery__item" key={card._id}>
                <Card
                  card={card}
                  onCardClick={onCardClick}
                  onConfirmation={onConfirmation}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;

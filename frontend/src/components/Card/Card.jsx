import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { useContext } from "react";
import LikeContainer from "../LikeContainer/LikeContainer.jsx";

function Card({ card, onCardClick, onConfirmation }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      {/* <li className="photo-gallery__item"> */}
      {currentUser._id === card.owner && (
        <button
          className="button-trash"
          onClick={() => onConfirmation(card._id)}
        />
      )}
      <img
        src={card.link}
        alt={card.name}
        className="photo-gallery__image"
        onClick={() => onCardClick({ name: card.name, link: card.link })}
      />
      {/* <button className="button-trash" onClick={onConfirmation} /> */}
      <div className="photo-gallery__wrapper">
        <h3 className="photo-gallery__title"> {card.name}</h3>
        <div className="like-container">
          <LikeContainer
            likes={card.likes}
            myId={currentUser._id}
            cardId={card._id}
          />
        </div>
      </div>

      {/* </li> */}
    </>
  );
}

export default Card;

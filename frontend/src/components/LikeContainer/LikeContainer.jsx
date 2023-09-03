import { useEffect, useState } from "react";
import api from "../../utils/api";

function LikeContainer({ likes, myId, cardId }) {
  const [isLike, setIsLike] = useState(false);
  const [counter, setCounter] = useState(likes.length);

  function handleLikes() {
    if (isLike) {
      api
        .deleteLike(cardId, localStorage.jwt)
        .then((res) => {
          setIsLike(false);
          setCounter(res.likes.length);
        })
        .catch((error) => console.error(error));
    } else {
      api
        .addLike(cardId, localStorage.jwt)
        .then((res) => {
          setIsLike(true);
          setCounter(res.likes.length);
        })
        .catch((error) => console.error(error));
    }
  }

  useEffect(() => {
    setIsLike(likes.some((like) => myId === like._id));
  }, [likes, myId]);

  return (
    <>
      <button
        className={
          "like-container__button-like " +
          `${isLike && "like-container__button-like_active"}`
        }
        onClick={handleLikes}
      />
      <p className="like-container__counter">{counter}</p>
    </>
  );
}

export default LikeContainer;

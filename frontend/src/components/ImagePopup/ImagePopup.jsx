import Popup from "../Popup/Popup.jsx";
function ImagePopup({ card, isOpen, onClose, additionalClass, name }) {
  return (
    <Popup
      isOpen={isOpen}
      name={name}
      onClose={onClose}
      additionalClass={additionalClass}
    >
      <figure
        className="popup__figure"
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      >
        <img src={card.link} alt={card.name} className="popup__figure-image" />
        <figcaption className="popup__figure-caption"> {card.name}</figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;

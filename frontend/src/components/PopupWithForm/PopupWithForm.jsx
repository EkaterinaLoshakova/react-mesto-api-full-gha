import Popup from "../Popup/Popup.jsx";

function PopupWithForm({
  name,
  title,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit,
  isValid = true,
  additionalClass,
}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      {/* <div
        className={`popup__container `}
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      > */}
      <p className={`popup__title ${additionalClass}`}>{title}</p>
      <form className="form" name="name" noValidate="" onSubmit={onSubmit}>
        <div className="popup__input">
          <div className="popup__input-and-error"></div>
          <div className="popup__input-and-error"></div>
        </div>
        {children}
        <button
          className={`button-submit ${isValid ? "" : "button-submit_disabled"}`}
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;

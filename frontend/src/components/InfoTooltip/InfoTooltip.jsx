import "../../index.css";
import successIcon from "../../images/successIcon.png";
import failIcon from "../../images/failIcon.png";
import Popup from "../Popup/Popup.jsx";

function InfoTooltip({ name, isOpen, onClose, isTooltipSuccess }) {
  const infoMessage = isTooltipSuccess
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";
  const infoIcon = isTooltipSuccess ? successIcon : failIcon;

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <div
        className={`popup__container popup__container_type_tooltip`}
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      >
        <img
          className="popup__info-icon"
          src={infoIcon}
          alt="Иконка регистрации"
        />
        <h2 className="popup__info-message">{infoMessage}</h2>
      </div>
    </Popup>
  );
}

export default InfoTooltip;

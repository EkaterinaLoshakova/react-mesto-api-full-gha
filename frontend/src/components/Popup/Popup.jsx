function Popup({ name, isOpen, onClose, children }) {
  return (
    <div className={`popup popup_popup_${name} ` + (isOpen && " popup_opened")}>
      <div
        className={`${
          name === "image" ? " popup__container_type_image" : "popup__container"
        }`}
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      >
        <button
          className={`popup__close-icon hover `}
          type="button"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}

export default Popup;

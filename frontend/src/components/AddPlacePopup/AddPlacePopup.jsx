import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { handleChange, values, errors, isValid, isInputValid, reset } =
    useFormValidation();

  function resetAfterClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ namecard: values.namecard, link: values.link }, reset);
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={resetAfterClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="popup__input">
        <div className="popup__input-and-error">
          <input
            name="namecard"
            type="text"
            id="place"
            className={`form__field form__field_value_place ${
              isInputValid.namecard === undefined || isInputValid.namecard
                ? ""
                : "form__field_type_error"
            }`}
            placeholder="Название"
            minLength={2}
            maxLength={30}
            required
            onChange={handleChange}
            value={values.namecard ? values.namecard : ""}
          />
          <span id="place-error" className="error error_visible">
            {errors.namecard}{" "}
          </span>
        </div>
        <div className="popup__input-and-error">
          <input
            name="link"
            type="url"
            id="src"
            className={`form__field form__field_value_src ${
              isInputValid.link === undefined || isInputValid.link
                ? ""
                : "form__field_type_error"
            }`}
            placeholder="Ссылка на картинку"
            required
            onChange={handleChange}
            value={values.link ? values.link : ""}
          />
          <span id="src-error" className="error error_visible">
            {errors.link}{" "}
          </span>
        </div>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

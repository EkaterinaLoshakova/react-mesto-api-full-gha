import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import { useRef } from "react";
import useFormValidation from "../../utils/useFormValidation.js";
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { handleChange, values, errors, isValid, isInputValid, reset } =
    useFormValidation();

  const input = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: input.current.value }, reset);
  }

  function resetAfterClose() {
    onClose();
    reset();
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={resetAfterClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="popup__input">
        <div className="popup__input-and-error">
          <input
            ref={input}
            name="avatar"
            type="url"
            id="avatar"
            className={`form__field form__field_value_place ${
              isInputValid.avatar === undefined || isInputValid.avatar
                ? ""
                : "form__field_type_error"
            }`}
            placeholder="Название"
            required
            value={values.avatar ? values.avatar : ""}
            onChange={handleChange}
          />
          <span id="avatar-error" className="error error_visible">
            {errors.avatar}{" "}
          </span>
        </div>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

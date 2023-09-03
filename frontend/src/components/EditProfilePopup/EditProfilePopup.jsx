import { useContext, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const {
    handleChange,
    values,
    errors,
    isValid,
    isInputValid,
    reset,
    setValue,
  } = useFormValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("job", currentUser.about);
  }, [currentUser, setValue]);

  function resetAfterClose() {
    onClose();
    reset({ name: currentUser.name, job: currentUser.about });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name: values.name, job: values.job }, reset);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={resetAfterClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <div className="popup__input">
        <div className="popup__input-and-error">
          <input
            type="text"
            id="name"
            className={`form__field form__field_value_name ${
              isInputValid.name === undefined || isInputValid.name
                ? ""
                : "form__field_type_error"
            }`}
            name="name"
            minLength={2}
            maxLength={40}
            required
            onChange={handleChange}
            value={values.name ? values.name : ""}
          />
          <span id="name-error" className="error error_visible">
            {errors.name}
          </span>
        </div>
        <div className="popup__input-and-error">
          <input
            type="text"
            id="job"
            className={`form__field form__field_value_job   ${
              isInputValid.job === undefined || isInputValid.job
                ? ""
                : "form__field_type_error"
            }`}
            name="job"
            minLength={2}
            maxLength={200}
            required
            onChange={handleChange}
            value={values.job ? values.job : ""}
          />
          <span id="job-error" className="error error_visible">
            {errors.job}
          </span>
        </div>
      </div>
    </PopupWithForm>
  );
}
export default EditProfilePopup;

import { useCallback, useState } from "react";

function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isInputValid, setIsInputValid] = useState({});

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const validationMessage = evt.target.validationMessage;
    const valid = evt.target.validity.valid;
    const form = evt.target.form;

    setValues((oldValue) => {
      return { ...oldValue, [name]: value };
    });

    setErrors((oldErrors) => {
      return { ...oldErrors, [name]: validationMessage };
    });

    setIsInputValid((oldIsInputValid) => {
      return { ...oldIsInputValid, [name]: valid };
    });
    setIsValid(form.checkValidity());
  }

  const setValue = useCallback((name, value) => {
    setValues((oldValue) => {
      return { ...oldValue, [name]: value };
    });
  }, []);

  function reset(value = {}) {
    setValues(value);
    setErrors({});
    setIsValid(false);
    setIsInputValid({});
  }

  return {
    handleChange,
    values,
    errors,
    isValid,
    isInputValid,
    reset,
    setValue,
  };
}
export default useFormValidation;

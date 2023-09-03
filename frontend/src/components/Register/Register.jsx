import { Link } from "react-router-dom";
import { useForm } from "../../utils/useForm.js";
import AuthForm from "../AuthForm/AuthForm.jsx";

function Register({ isRegister }) {
  const { values, handleChange } = useForm({ email: "", password: "" });

  function handleSubmit(evt) {
    evt.preventDefault();
    isRegister(values.email, values.password);
  }

  return (
    <>
      <AuthForm
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
      >
        <input
          className="authorization__field"
          id="authorization-email"
          type="email"
          name="email"
          required
          placeholder="Email"
          minLength={8}
          maxLength={30}
          value={values.email || ""}
          onChange={handleChange}
        />

        <input
          className="authorization__field"
          id="authorization-password"
          type="password"
          name="password"
          required
          placeholder="Пароль"
          minLength={6}
          maxLength={18}
          value={values.password || ""}
          onChange={handleChange}
        />
      </AuthForm>
      {/* <p className="authorization__question">
        Уже зарегистрированы?{" "} */}
      <Link to="/sign-in" className="authorization__link">
        Уже зарегистрированы? Войти
      </Link>
    </>
  );
}

export default Register;

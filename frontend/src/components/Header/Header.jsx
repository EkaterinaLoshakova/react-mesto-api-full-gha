import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
function Header({ name, userEmail }) {
  // const { pathname } = useLocation();

  function outLogin() {
    localStorage.removeItem("jwt");
  }

  return (
    <header className="header page__header-margin">
      <img src={logo} alt="Место" className="header__logo" />
      {name === "sign-up" || name === "sign-in" ? (
        <>
          <Link
            className="header__link"
            to={name === "sign-up" ? "/sign-in" : "/sign-up"}
          >
            {name === "sign-up" ? "Войти" : "Регистрация"}
          </Link>
        </>
      ) : (
        <div className="header__container">
          <p className="header__email">{userEmail}</p>
          <Link to="/sign-in" onClick={outLogin} className="header__link">
            Выйти
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;

import Header from "../Header/Header";
import Main from "../Main/Main";

function ProtectedRouteHomePage({ userEmail, ...props }) {
  return (
    <>
      <Header userEmail={userEmail} />
      <Main {...props} />
    </>
  );
}

export default ProtectedRouteHomePage;

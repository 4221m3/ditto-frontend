import './BtnLogin.css'

export const BtnLogin = () => {
  return (
    <button
      className="btn-login"
      onClick={go_to_login}
    >
      Login
    </button>
  );
};

const go_to_login = () => {
  window.location.href = '/login'; 
};
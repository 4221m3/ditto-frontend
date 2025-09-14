import './BtnLogin.css'

export const BtnLogin = () => {
  return (
    <button
      className="btn-login"
      onClick={login}
    >
      Login
    </button>
  );
};

const login = () => {
  window.location.href = '/login'; 
};
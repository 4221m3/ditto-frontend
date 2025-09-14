import './BtnSignup.css'

export const BtnSignup = () => {
  return (
    <button
      className='btn-signup'
      onClick={go_to_signup}
    >
      Signup
    </button>
  );
};

const go_to_signup = () => {
  window.location.href = '/signup'; 
};
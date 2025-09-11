import { auth_store } from '../../store/auth';

import './BtnLogout.css'

export const BtnLogout = () => {
  return (
    <button
      className='btn-logout'
      onClick={logout}>
      Logout
    </button>
  );
};

const logout = () => {

  // Clear the token from the state
  // management store (Zustand)
  auth_store.getState().clear_token();
  
  // Redirect the user to the login page
  window.location.href = '/login'; 
};
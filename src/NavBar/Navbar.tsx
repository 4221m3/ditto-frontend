import { auth_store } from "../store/auth";

import { BtnLogin } from "../Buttons/BtnLogin/BtnLogin";
import { BtnLogout } from "../Buttons/BtnLogout/BtnLogout";
import { BtnSignup } from "../Buttons/BtnSignup/BtnSignup";

import './Navbar.css'

export const Navbar = () => {

  // The app's global state (`state`) variable `token`
  // is passed so that auth_store can read its value.
  const token = auth_store(
    (state) => state.token
  );
    
  return (
    <nav>
      
      {/*Section Home*/}
      <div>
        Ditto
      </div>

      {/*Section Login*/}
      <div className="navbar-buttons">
        {
          !token ?
          <BtnLogin />:
          <BtnLogout />
        }
      </div>

    </nav>
  );
};
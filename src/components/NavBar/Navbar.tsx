import { auth_store } from "../../store/auth";

import { BtnLogin } from "../Buttons/BtnLogin/BtnLogin";
import { BtnLogout } from "../Buttons/BtnLogout/BtnLogout";

import './Navbar.css'

export const Navbar = () => {

  const token = auth_store(
    (state) => state.token
  );
    
  return (
    <nav
      className="
        navbar
        p-2
      ">
      
      {/*Section Home*/}
      <div
        className="
          navbar-home
        "
      >
        Ditto
      </div>

      {/*Section Login*/}
      <div
        className="
          navbar-auth
        "
      >
        {
          !token ?
          <BtnLogin />:
          <BtnLogout />
        }
      </div>

    </nav>
  );
};
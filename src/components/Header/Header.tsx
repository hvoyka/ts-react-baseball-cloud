import React, { FC } from "react";
import { Link } from "react-router-dom";

const Header: FC<{}> = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/forgotpassword">password</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

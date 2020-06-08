import React, { useState, useEffect, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import "../../styles/Navbar.scss";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState<string>("home");
  const history = useHistory();

  const isLogin = user ? true : false;
  const pathname = history.location.pathname;

  useEffect(() => {
    const item = pathname.slice(1).length ? pathname.slice(1) : "/";

    setActiveItem(item);
  }, [pathname]);

  const handleItemClick = (e: any, name: string): void => {
    setActiveItem(name);

    if (name === "logout") {
      if (window.confirm("Are you sure?")) {
        history.push("login");
        logout();
      }
    } else {
      history.push(name);
    }
  };

  return (
    <div className='navbar-wrap'>
      <Menu size='mini' inverted borderless compact widths={isLogin ? 3 : 4}>
        <Menu.Item
          fitted='vertically'
          name='home'
          color='teal'
          active={activeItem === "/"}
          onClick={(e) => handleItemClick(e, "/")}
        />
        {isLogin ? (
          <>
            <Menu.Item
              fitted='vertically'
              name='memes'
              color='teal'
              active={activeItem === "memes"}
              onClick={(e) => handleItemClick(e, "/memes")}
            />
            <Menu.Item
              fitted='vertically'
              name='Log Out'
              color='red'
              active
              onClick={(e) => handleItemClick(e, "logout")}
            />
          </>
        ) : (
          <>
            <Menu.Item
              fitted='vertically'
              name='memes'
              color='teal'
              active={activeItem === "memes"}
              onClick={(e) => handleItemClick(e, "/memes")}
            />
            <Menu.Item
              fitted='vertically'
              name='Log In'
              color='teal'
              active={activeItem === "login"}
              onClick={(e) => handleItemClick(e, "login")}
            />
            <Menu.Item
              fitted='vertically'
              name='Sign Up'
              color='teal'
              active={activeItem === "signup"}
              onClick={(e) => handleItemClick(e, "signup")}
            />
          </>
        )}
      </Menu>
    </div>
  );
};

export default Navbar;

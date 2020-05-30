import React, { useState, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import "../../styles/Navbar.scss";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState<string>("home");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    const item = history.location.pathname.slice(1).length
      ? history.location.pathname.slice(1)
      : "/";

    setActiveItem(item);

    if (localStorage.getItem("userInfo")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [history.location.pathname]);

  const handleItemClick = (e: any, name: string): void => {
    setActiveItem(name);

    if (name === "logout") {
      if (window.confirm("Are you sure?")) {
        localStorage.removeItem("userInfo");
        history.push("login");
      }
    } else {
      history.push(name);
    }
  };

  return (
    <div className='navbar-wrap'>
      <Menu size='mini' inverted borderless compact widths={isLogin ? 3 : 3}>
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
              active={activeItem === "logout"}
              onClick={(e) => handleItemClick(e, "logout")}
            />
          </>
        ) : (
          <>
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

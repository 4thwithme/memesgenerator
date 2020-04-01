import React, { useState, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import "../../styles/Navbar.scss";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");
  const history = useHistory();

  useEffect(() => {
    const item = history.location.pathname.slice(1).length
      ? history.location.pathname.slice(1)
      : "/";

    setActiveItem(item);
  }, [history.location.pathname]);

  const handleItemClick = (e: any, name: string): void => {
    setActiveItem(name);
    history.push(name);
  };

  return (
    <div className='navbar-wrap'>
      <Menu size='mini' inverted borderless compact widths={3}>
        <Menu.Item
          fitted='vertically'
          name='home'
          color='teal'
          active={activeItem === "/"}
          onClick={(e) => handleItemClick(e, "/")}
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
      </Menu>
    </div>
  );
};

export default Navbar;

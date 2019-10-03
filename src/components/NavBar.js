import React from "react";
import { Input, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  onLogout = () => {
    localStorage.clear();
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu fixed="top">
        <Menu.Item style={{ marginRight: "0em" }}>
          <Link to="/">
            <img
              src={`/Logo.png`}
              alt="cReddit"
              style={{ height: "3em", marginLeft: "10px" }}
            ></img>
          </Link>
        </Menu.Item>

        {localStorage.token ? (
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
        ) : null}
        <Menu.Menu position="right">
          {localStorage.token ? (
            <Menu.Item active={activeItem === "logout"}>
              <Link
                to="/login"
                onClick={this.onLogout}
                style={{ color: "black" }}
              >
                LOGOUT
              </Link>
            </Menu.Item>
          ) : null}
        </Menu.Menu>
      </Menu>
    );
  }
}

export default NavBar;

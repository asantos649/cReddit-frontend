import React from "react";
import { Input, Menu } from "semantic-ui-react";
import {Link} from 'react-router-dom'

class NavBar extends React.Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary>
        <Menu.Item>
          <Link to='/'>
            <img src={`/Logo.png`} alt="cReddit" style={{height: '3em'}}></img>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            name="NEW POST"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="TOPICS"
            active={activeItem === "messages"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="PROFILE"
            active={activeItem === "friends"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="LOGOUT"
            active={activeItem === "logout"}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default NavBar;

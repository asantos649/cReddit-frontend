import React from 'react';
import { Input, Menu } from 'semantic-ui-react'
import logo from '../logo.svg';

class NavBar extends React.Component{
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return (
          
        <Menu secondary>
          <Menu.Item>
            <img src={logo} alt='cReddit'></img>
          </Menu.Item>
        <Menu.Item>    
            <Input icon='search' placeholder='Search...' />
        </Menu.Item>
        <Menu.Menu position='right'>
            
            <Menu.Item
            name='POST'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='TOPICS'
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='PROFILE'
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
          />
            <Menu.Item
              name='LOGOUT'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
        </Menu.Menu>
        </Menu>
      )
    }
}

export default NavBar
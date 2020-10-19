import React, { Component } from 'react'
import { Icon, Menu, Sticky, Sidebar} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class NavBar extends Component {
  state = { activeItem: 'about',
            visible: false
    }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleShowClick = () => { 
      this.setState({ visible: !this.state.visible })
  }

  render() {
    const { activeItem } = this.state.activeItem

    return (     
    <div>
    <Sticky style={{backgroundColor: "rgba(0, 0, 0, 0)"}}>
        <i id="menuTab" className="content icon" onClick={this.handleShowClick}></i>
    </Sticky>
      <Sidebar
            id="slideout"
            as={Menu}
            animation='push'
            direction='left'
            icon='labeled'
            inverted
            onClick={this.handleShowClick}
            vertical
            visible={this.state.visible}
            width='thin'
            class="ui inverted left vertical menu sidebar"
      >
        <Menu.Item
          as={Link} to='/profile'
          name='profile'
          active={activeItem === 'profile'}
          onClick={this.handleItemClick}
        >
          <Icon name='id badge' />
          Profile
        </Menu.Item>

        <Menu.Item
          as={Link} to='/machine'
          name='machine'
          active={activeItem === 'machine'}
          onClick={this.handleItemClick}
        >
          <Icon name='basketball ball' />
          Trade Machine
        </Menu.Item>

        <Menu.Item
          as={Link} to='/trades'
          name='tradelist'
          active={activeItem === 'tradelist'}
          onClick={this.handleItemClick}
        >
          <Icon name='clipboard list' />
          All Trades
        </Menu.Item>
        </Sidebar>
    </div>
    )
  }
}

export default () => (
	<div><NavBar/></div>
)
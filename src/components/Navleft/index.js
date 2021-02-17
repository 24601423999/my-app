import React, { Component } from 'react'
import MenuConfig from './../../config/menuConfig'
import { Menu } from 'antd'
import './index.less'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/action'
const SubMenu = Menu.SubMenu;

class Navleft extends Component {
  state = {
    currentKey: ''
  }
  componentWillMount(){
    const menuTreeNode = this.renderMenu(MenuConfig);
    let currentKey = window.location.hash.replace(/#|\?.*$/g,'')
    this.setState({
      menuTreeNode,
      currentKey
    })
  } 
  
  // 菜单渲染
  renderMenu = (data)=>{
    return data.map(item => {
      if(item.children){
        return (
          <SubMenu title={item.title} key={item.key}>
            { this.renderMenu(item.children) }
          </SubMenu>
        )
      }
      return <Menu.Item title={item.title} key={item.key}>
        <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
    })
  }

  handleClick = (item) => {
    const { dispatch } = this.props;
    dispatch(switchMenu(item.item.props.title))
    this.setState({
      currentKey: item.key
    })
    console.log('currentkey-handleclick:::',this.state.currentKey);
  }
  
  render() {
        return (
            <div>
              <NavLink to='/admin/home'>
                <div className='logo'>
                  <img src='./assets/logo-ant.svg' alt=''/>
                  <h1>Imooc MS</h1>
                </div>
                </NavLink>
                <Menu 
                  onClick={this.handleClick}
                  selectedKeys={this.state.currentKey}
                  theme= 'dark'>
                   { this.state.menuTreeNode }
                </Menu>
            </div>
        )
    }
}

export default connect()(Navleft)

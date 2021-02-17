import React, { Component } from 'react'
import { Row,Col } from 'antd'
import { connect } from 'react-redux'
import './index.less'
import Util from './../../utils/utils'

class Header extends Component {
    componentWillMount(){
      this.setState({
        userName:'李腾--LiTeng'
      })
      setInterval(() => {
        let sysTime = Util.formateDate(new Date().getTime());
        this.setState({
          sysTime
        })
      }, 1000);
      
    }
    render() {
      const menuType = this.props.menuType;
        return (
            <div className='header'>
                <Row className='header-top'>
                  {
                    menuType?
                    <Col span={6} className='logo'> 
                      <img src='/assets/logo-ant.svg' alt='' />
                      <span>Li-Teng 通用管理系统</span>
                    </Col>:''
                  }
                  <Col span={menuType?18:24}> 
                    <span>{this.state.userName}</span>
                    <button>退出</button>
                  </Col>
                </Row>
                {
                  menuType?'':
                  <Row className='breadcrumb'>
                    <Col span={4} className='breadcrumb-title'>
                      {this.props.menuName}
                    </Col>
                    <Col span={20} className='weather'>
                      <span className='date'>{ this.state.sysTime }</span>
                      <span className='weather-detail'>晴转多云</span>
                    </Col>
                  </Row>
                }
                
            </div>
        )
    }
}
const mapStateToProps = state => {
  return {
    menuName: state.menuName
  }
}
export default connect(mapStateToProps)(Header)

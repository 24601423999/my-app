import React, { Component } from 'react'
import { Row,Col } from 'antd'
import './index.less'
import Util from './../../utils/utils'

export default class Header extends Component {
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
        return (
            <div className='header'>
                <Row className='header-top'>
                  <Col span='24'>
                    <span>{this.state.userName}</span>
                    <button>退出</button>
                  </Col>
                </Row>
                <Row className='breadcrumb'>
                  <Col span='4' className='breadcrumb-title'>
                    首-页
                  </Col>
                  <Col span='20' className='weather'>
                    <span className='date'>{ this.state.sysTime }</span>
                    <span className='weather-detail'>晴转多云</span>
                  </Col>
                </Row>
            </div>
        )
    }
}

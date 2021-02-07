import React, { Component } from 'react';
import { Row } from 'antd'
import './style/common.less'
import Header from './components/Header'

export default class Admin extends Component{
    render(){
        return (
          <div>
            <Row className='simple-page'>
              <Header menuType='second' />
            </Row>
            <Row className='content'>
              {this.props.children}
            </Row>
          </div>
        )
    }
}
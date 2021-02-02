import React, { Component } from 'react'
import { Card, Spin, Icon, Alert } from 'antd'
import './ui.less'

export default class Loading extends Component{
    render() {
      let icon = <Icon type='loading' style={{fontSize: 20}}/>
      let style={
        margin:'0px 10px'
      }
        return (
            <div>
                <Card title='Spin用法' className='card-wrap'>
                    <Spin size='default' style={style}/>
                    <Spin size='small' style={style}/>
                    <Spin size='large'style={style}/>
                    <Spin indicator={icon} style={style} />
                </Card>
                <Card title='内容遮罩' className='card-wrap'>
                  <Alert message='React' description='欢迎来到React实战课程' type='info'/>
                  <Spin>
                    <Alert message='React' description='欢迎来到React实战课程' type='warning'/>
                  </Spin>
                  <Spin tip="加载中...">
                    <Alert message='React' description='欢迎来到React实战课程' type='warning'/>
                  </Spin>
                  <Spin indicator={icon} tip='加载中...'>
                    <Alert message='React' description='欢迎来到React实战课程' type='warning'/>
                  </Spin>
                </Card>
            </div>
        )
    }
}
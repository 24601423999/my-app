import React, { Component } from 'react'
import { Card, Button, notification } from 'antd'
import './ui.less'

export default class Notice extends Component {
  
  openNotification = (type,direction) => {

    if(direction){
      notification.config({
        placement: direction
      })
    }

    notification[type]({
      message: '发工资了',
      direction: [direction],
      description: '上个月考勤22天，迟到12天，实发工资250，请笑纳！！！'
    })
  }
  
  render() {
    let { openNotification } = this
        return (
            <div>
                <Card title="通知提醒框" className='card-wrap'>
                    <Button type='primary' onClick={()=>openNotification('success')}>Success</Button>
                    <Button type='primary' onClick={()=>openNotification('info')}>Info</Button>
                    <Button type='primary' onClick={()=>openNotification('warning')}>Warning</Button>
                    <Button type='primary' onClick={()=>openNotification('error')}>Error</Button>
                </Card>
                <Card title="通知提醒框(方向)" className='card-wrap'>
                    <Button type='primary' onClick={()=>openNotification('success','topLeft')}>Success</Button>
                    <Button type='primary' onClick={()=>openNotification('info','topRight')}>Info</Button>
                    <Button type='primary' onClick={()=>openNotification('warning','bottomLeft')}>Warning</Button>
                    <Button type='primary' onClick={()=>openNotification('error','bottomRight')}>Error</Button>
                </Card>
            </div>
        )
    }
}

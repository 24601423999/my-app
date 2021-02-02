import React, { Component } from 'react'
import { Card, Button, message } from 'antd'
import './ui.less'

export default class Message extends Component {

  showMessage = (type) => {
    message[type]("恭喜你React课程晋级成功！");
  }

    render() {
      let { showMessage } = this;
        return (
            <div>
                <Card title='全局Message' className="card-wrap">
                  <Button type='primary' onClick={()=>showMessage('success')}>Success</Button>
                  <Button type='primary' onClick={()=>showMessage('info')}>Info</Button>
                  <Button type='primary' onClick={()=>showMessage('warning')}>Warning</Button>
                  <Button type='primary' onClick={()=>showMessage('error')}>Error</Button>
                  <Button type='primary' onClick={()=>showMessage('loading')}>Loading</Button>
                </Card>
            </div>
        )
    }
}

import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import './ui.less'
export default class Modals extends Component {
  
  state = {
    ShowModal1: false,
    ShowModal2: false,
    ShowModal3: false,
    ShowModal4: false
  }

  haddleOpen = (type) => {
    this.setState({
      [type]: true
    })
  }

  haddleConfirm = (type) => {
    Modal[type]({
      title:"确认？",
      content: '你确定你学会React了吗？',
      onOk(){
        console.log('ok')
      },
      onCancel(){
        console.log('cancel');
      }
    })
  }
  
  render() {
    let { ShowModal1,ShowModal2,ShowModal3,ShowModal4 } = this.state;
    let {haddleOpen,haddleConfirm} = this;
        return (
            <div>
              <Card title='基础模态框' className='card-wrap'>
                <Button type='primary' onClick={()=>haddleOpen('ShowModal1')}>Open</Button>
                <Button type='primary' onClick={()=>haddleOpen('ShowModal2')}>自定义页脚</Button>
                <Button type='primary' onClick={()=>haddleOpen('ShowModal3')}>顶部20px</Button>
                <Button type='primary' onClick={()=>haddleOpen('ShowModal4')}>水平居中</Button>
              </Card>
              <Card title='信息确认框' className='card-wrap'>
                <Button type='primary' onClick={()=>haddleConfirm('confirm')}>Confirm</Button>
                <Button type='primary' onClick={()=>haddleConfirm('info')}>Info</Button>
                <Button type='primary' onClick={()=>haddleConfirm('success')}>Success</Button>
                <Button type='primary' onClick={()=>haddleConfirm('warning')}>Warning</Button>
              </Card>
              <Modal
                title='React'
                visible={ShowModal1}
                onCancel={()=>{
                  this.setState({
                    ShowModal1:false
                  })
                }}
              > 
              <p>欢迎学习慕课的React课程</p>
              </Modal>
              <Modal
                title='React'
                visible={ShowModal2}
                okText='好的'
                cancelText='算了'
                onCancel={()=>{
                  this.setState({
                    ShowModal2:false
                  })
                }}
              > 
              <p>欢迎学习慕课的React课程</p>
              </Modal>
              <Modal
                title='React'
                style={{top:20}}
                visible={ShowModal3}
                onCancel={()=>{
                  this.setState({
                    ShowModal3:false
                  })
                }}
              > 
              <p>欢迎学习慕课的React课程</p>
              </Modal>
              <Modal
                title='React'
                wrapClassName='vertical-center-modal'
                visible={ShowModal4}
                onCancel={()=>{
                  this.setState({
                    ShowModal4:false
                  })
                }}
              > 
              <p>欢迎学习慕课的React课程</p>
              </Modal>
            </div>
        )
    }
}

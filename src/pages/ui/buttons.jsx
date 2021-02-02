import React, { Component } from 'react'
import { Button, Card, Radio } from 'antd'
import './ui.less'

export default class Buttons extends Component {
  
  state = {
    isLoading: true,
    size: 'default'
  }

  haddleLoading = ()=>{
    this.setState({
      isLoading:false
    })
  }

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };
  
  render() {
    let {isLoading,size} = this.state;
    let {haddleLoading,handleSizeChange} = this;
        return (
            <div>
                <Card title='基础按钮' className='card-wrap'>
                    <Button type="primary">Imooc</Button>
                    <Button>Imooc</Button>
                    <Button type="dashed">Imooc</Button>
                    <Button type="danger">Imooc</Button>
                    <Button type="link">Imooc</Button>
                    <Button disabled>Imooc</Button>
                </Card>
                <Card title='图形按钮' className='card-wrap'>
                    <Button  icon='plus'>创建</Button>
                    <Button  icon='edit'>编辑</Button>
                    <Button  icon="delete">删除</Button>
                    <Button icon="search" shape='circle'></Button>
                    <Button type='primary' icon='search'>搜索</Button>
                    <Button type='primary' icon='download'>下载</Button>
                </Card>
                <Card title='Loading按钮' className='card-wrap'>
                    <Button type='primary' loading={isLoading}>确定</Button>
                    <Button type='primary' loading={isLoading} shape='circle'></Button>
                    <Button loading={isLoading}>点击加载</Button>
                    <Button loading={isLoading} shape='circle'></Button>
                    <Button type='primary' onClick={()=>haddleLoading()}>关闭</Button>
                </Card>
                <Card title='按钮尺寸' className='card-wrap'>
                    <Radio.Group value={size} onChange={handleSizeChange}>
                      <Radio value="large">Large</Radio>
                      <Radio value="default">Default</Radio>
                      <Radio value="small">Small</Radio>
                    </Radio.Group>
                    <Button type='primary' size={size}>Imooc</Button>
                    <Button type='dashed' size={size}>Imooc</Button>
                    <Button type='danger' size={size}>Imooc</Button>
                    <Button size={size}>Imooc</Button>
                </Card>
                <Card title='按钮组'>
                  <Button.Group>
                    <Button type="primary" icon='left'>
                      前进
                    </Button>
                    <Button type="primary" icon='right'>
                      后退
                    </Button>
                  </Button.Group>
                </Card>
            </div>
        )
    }
}

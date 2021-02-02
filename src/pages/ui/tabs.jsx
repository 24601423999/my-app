import React, { Component } from 'react'
import { Card, Tabs, message, Icon } from 'antd'
import './ui.less'

export default class Buttons extends Component {

  callback = (key) => {
    message.info('Hi,你选择了'+key+'页签')
  }

  onChange = (activeKey) =>{
     this.setState({
       activeKey
     })
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  newTabIndex = 0;

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: activeKey, content: `New Tab Pane`, key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  componentWillMount(){
    const panes = [
      {
        title:"Tab 1",
        content: 'Content Tab 1',
        key: '1'
      },
      {
        title:"Tab 2",
        content: 'Content Tab 2',
        key: '2'
      },
      {
        title:"Tab 3",
        content: 'Content Tab 3',
        key: '3'
      }
    ]
    this.setState({
      activeKey:panes[0].key,
      panes
    })
  }
  

    render() {
      const TabPane = Tabs.TabPane;
      let { callback, onChange, onEdit } = this;
      let { panes, activeKey } = this.state;
        return (
            <div>
              <Card title='Tops标签页' className='card-wrap'>
                <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane tab="React" key="1">
                    您学会React相关知识了吗？
                  </TabPane>
                  <TabPane tab="Vue" key="2" disabled>
                    您学会Vue相关知识了吗？
                  </TabPane>
                  <TabPane tab="Hooks" key="3">
                    您学会Hooks相关知识了吗？
                  </TabPane>
                </Tabs>
              </Card>
              <Card title='指定图标的Tops标签页' className='card-wrap'>
                <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane tab={<span><Icon type='plus' />React</span> } key="1">
                    您学会React相关知识了吗？
                  </TabPane>
                  <TabPane tab={<span><Icon type='edit' />Vue</span> } key="2">
                    您学会Vue相关知识了吗？
                  </TabPane>
                  <TabPane tab={<span><Icon type='delete' />Hooks</span> } key="3">
                    您学会Hooks相关知识了吗？
                  </TabPane>
                </Tabs>
              </Card>
              <Card title='可添加删除Tops标签页' className='card-wrap'>
                <Tabs
                type='editable-card'
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                >
                  {
                    panes.map( item => {
                      return <TabPane 
                        tab={item.title}
                        key={item.key}
                      >
                        {item.content}
                      </TabPane>
                    })
                  }
                </Tabs>
              </Card>
            </div>
        )
    }
}

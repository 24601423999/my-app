import React, { Component } from 'react'
import { Card, Table } from 'antd'
import axios from 'axios'

export default class BasicTable extends Component {

  state={
    dataSource:null,
    dataSource2:[]
  }

  componentWillMount(){
    const data = [
      {
        id:'1001',
        userName: 'Jack',
        sex:"1",
        state: '1',
        interest: '1',
        birthday:'2000-01-01',
        address: '河北省邯郸市永年广府',
        time: '09:00:00',
        key:'1'
      },
      {
        id:'1002',
        userName: 'Tom',
        sex:"2",
        state: '1',
        interest: '2',
        birthday:'2010-01-01',
        address: '河北省邯郸市',
        time: '09:00:00',
        key:'2'
      },
      {
        id:'1003',
        userName: 'Jarry',
        sex:"1",
        state: '2',
        interest: '2',
        birthday:'2004-01-01',
        address: '河北省邯郸市永年广府',
        time: '09:30:00',
        key:'3'
      }
    ]
    this.setState({
      dataSource:data
    });
    console.log('dataSource',data);
    // 动态生成mock数据
 
  this.request();
  }

  request = () => {
    axios.get('https://www.fastmock.site/mock/83f7de25195450d9ea169ea308f5d8c8/mockapi/table/list')
    .then(res=>{
      console.log('res',res.data.resule.list);
      this.setState({
        dataSource2:res.data.resule.list
      })
    })
  }

  render() {
    const columns = [
      {
        title:'id',
        dataIndex: 'id',
        key:'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key:'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key:'sex'
      },
      {
        title:"状态",
        dataIndex: 'state',
        key:'state'
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        key:'interest'
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        key:'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address',
        key:'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        key:'time'
      }
    ];

    let { dataSource,dataSource2 } = this.state;
    console.log(dataSource);
    return (
      <div>
        <Card title='基础表格'>
          <Table
            dataSource={dataSource}
            columns={columns} 
            bordered={true}
            pagination={false}
          />
        </Card>
        <Card title='动态表格'>
          <Table
            dataSource={dataSource2}
            columns={columns} 
            bordered={true}
            pagination={false}
          />
        </Card>
      </div>
    )
  }
}

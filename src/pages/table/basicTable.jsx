import React, { Component } from 'react'
import { Card, Table, Modal, Button, message } from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'

export default class BasicTable extends Component {

  state={
    dataSource:null,
    dataSource2:[]
  }

  params = {
    page: 1
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
        time: '09:00:00'
      },
      {
        id:'1002',
        userName: 'Tom',
        sex:"2",
        state: '1',
        interest: '2',
        birthday:'2010-01-01',
        address: '河北省邯郸市',
        time: '09:00:00'
      },
      {
        id:'1003',
        userName: 'Jarry',
        sex:"1",
        state: '2',
        interest: '2',
        birthday:'2004-01-01',
        address: '河北省邯郸市永年广府',
        time: '09:30:00'
      }
    ]
    data.map((item,index) => {
      item.key = index;
      return null;
    })
    this.setState({
      dataSource:data
    });
    // console.log('dataSource',data);
    // 动态生成mock数据
 
  this.request();
  }

  request = () => {
    axios.ajax({
      url:'/table/list',
      data: {
        params:{
          page:this.params.page
        }
      }
    }).then(res=>{
      // console.log('res',res);
      if(res.code === 0 ){
        res.resule.list.map((item,index)=>{
          item.key = index;
          return null;
        })
        this.setState({
          dataSource2: res.resule.list,
          selectedRowKeys:[],
          selectedRows:null, 
          pagination: Utils.pagination(res,(current)=>{
            this.params.page = current;
            this.request();
          })
        })
      }
    })
  }

  onRowClick = (record,index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys:selectKey,
      selectedItem:record
    })
    Modal.info({
      title:"信息",
      content: `姓名:${record.userName}-----性别:${record.sex}-----状态:${record.state}`
    })
  }

  handleDelete = () => {
    let rows = this.state.selectedRows;
    let ids = [];
    rows.map(item=>{
      ids.push(item.id);
      return null;
    });
    Modal.confirm({
      title:"警告",
      content:`您确定要删除这些数据吗？ ${ids.join(',')}`,
      onOk:()=>{
        message.success('删除成功');
        this.request()
      }
    })
  }

  render() {

    let { dataSource, dataSource2, selectedRowKeys, selectedItem } = this.state;
    console.log("selectedItem",selectedItem);
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
        key:'sex',
        render(sex){
          return sex===1?'男':"女"
        }
      },
      {
        title:"状态",
        dataIndex: 'state',
        key:'state',
        render(state){
          let config = {
            1:'咸鱼一条',
            2:"风华浪子",
            3:'北大才子一枚',
            4:'百度FE',
            5:'创业者'
          }
          return config[state]
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        key:'interest',
        render(interest){
          let config = {
            1:'游泳',
            2:"篮球",
            3:'足球',
            4:'排球',
            5:'羽毛球',
            6:'冰棒球',
            7:'乒乓球',
            8:'台球'
          }
          return config[interest]
        }
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
    // 指定为单选框
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }

    // 指定为多选框
    const rowCheckSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys,selectedRows) => {
        // let ids = []; //所选id的集合
        // selectedRows.map(item=>{
        //   ids.push(item.id)
        //   return null
        // })
        this.setState({
          selectedRowKeys,
          selectedRows
        })
      }
    }
    const stylecss = {
      margin: '10px 0'
    }

   
    // console.log(dataSource);
    return (
      <div>
        <Card title='基础表格' style={stylecss}>
          <Table
            dataSource={dataSource}
            columns={columns} 
            bordered={true}
            pagination={false}
          />
        </Card>
        <Card title='动态表格-fastMock' style={stylecss}>
          <Table
            dataSource={dataSource2}
            columns={columns} 
            bordered={true}
            pagination={false}
          />
        </Card>
        <Card title='Mock-单选' style={stylecss}>
          <Table
            dataSource={dataSource2}
            columns={columns} 
            bordered={true}
            pagination={false}
            rowSelection={rowSelection}
            onRow={(record,index)=>{
              return {
                onClick: ()=>{
                  this.onRowClick(record,index)
                }
              }
            }}
          />
        </Card>
        <Card title='Mock-复选框' style={stylecss}>
          <div>
            <Button type='primary' onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            dataSource={dataSource2}
            columns={columns} 
            bordered
            pagination={false}
            rowSelection={rowCheckSelection}
          />
        </Card>
        <Card title='分页' style={stylecss}>
          <Table
            dataSource={dataSource2}
            columns={columns} 
            bordered
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    )
  }
}

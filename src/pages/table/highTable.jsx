import React, { Component } from 'react'
import { Card, Table, Badge, Button, Modal, message } from 'antd'
import axios from './../../axios/index'
// import Utils from './../../utils/utils'

export default class HighTable extends Component {
  state = {

  }

  params = {
    page:1
  }


  componentWillMount(){
    this.request();
  }

  request = () => {
    axios.ajax({
      url:'/table/high/list',
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
          dataSource: res.resule.list
        })
      }
    })
  }

  // 排序
  handleChange = (pagination, filters, sorter) =>{
    console.log('::'+sorter);
    this.setState({
      sortOrder:sorter.order
    })
  }

  // 删除操作
  handleDelete = (item) =>{
    // let id = item.id;
    Modal.confirm({
      title:'警告',
      content:'是否要删除数据？',
      onOk: ()=>{
        message.success("删除成功");
        this.request();
      }
    })
  }
  
  render() {
    let {dataSource} = this.state;
    const columns1 = [
      {
        title:'id',
        dataIndex: 'id',
        key:'id',
        width:'100px'
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width:'120px',
        key:'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key:'sex',
        width:'100px',
        render(sex){
          return sex===1?'男':"女"
        }
      },
      {
        title:"状态",
        dataIndex: 'state',
        key:'state',
        width:'180px',
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
        width:'130px',
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
        key:'birthday',
        width:'150px'
      },
      {
        title: '地址',
        dataIndex: 'address',
        key:'address',
        width:'150px'
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        key:'time',
        width:'150px'
      }
    ]; 

    const columns2 = [
      {
        title:'id',
        dataIndex: 'id',
        key:'id',
        width:'100px',
        fixed:'left'
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width:'120px',
        key:'userName',
        fixed:'left'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key:'sex',
        width:'100px',
        render(sex){
          return sex===1?'男':"女"
        }
      },
      {
        title:"状态",
        dataIndex: 'state',
        key:'state',
        width:'180px',
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
        width:'134px',
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
        key:'birthday',
        width:'150px'
      },
      {
        title: '地址',
        dataIndex: 'address',
        key:'address',
        width:'150px'
      },{
        title: '地址',
        dataIndex: 'address',
        key:'address1',
        width:'150px'
      },{
        title: '地址',
        dataIndex: 'address',
        key:'address2',
        width:'150px'
      },{
        title: '地址',
        dataIndex: 'address',
        key:'address3',
        width:'150px'
      },{
        title: '地址',
        dataIndex: 'address',
        key:'address4',
        width:'150px'
      },{
        title: '地址',
        dataIndex: 'address',
        key:'address5',
        width:'150px'
      },{
        title: '地址',
        dataIndex: 'address',
        key:'address6',
        width:'150px'
      },{
        title: '地址',
        dataIndex: 'address',
        key:'address7',
        width:'150px'
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        key:'time',
        width:'170px',
        fixed: 'right'
      }
    ]; 
    
    const columns3 = [
      {
        title:'id',
        dataIndex: 'id',
        key:'id',
        width:'50px'
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width:'120px',
        key:'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key:'sex',
        width:'70px',
        render(sex){
          return sex===1?'男':"女"
        }
      },
      {
        title:"年龄",
        dataIndex: 'age',
        key:'age',
        width:'80px',
        sorter:(a,b)=>{
          return a.age-b.age
        },
        sortOrder: this.state.sortOrder
      },
      {
        title:"状态",
        dataIndex: 'state',
        key:'state',
        width:'180px',
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
        width:'130px',
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
        key:'birthday',
        width:'150px'
      },
      {
        title: '地址',
        dataIndex: 'address',
        key:'address',
        width:'150px'
      },
      {
        title: '早起时间',
        dataIndex: 'time',
        key:'time',
        width:'150px'
      }
    ]; 

    const columns4 = [
      {
        title:'id',
        dataIndex: 'id',
        width:'50px'
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key:'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex){
          return sex===1?'男':"女"
        }
      },
      {
        title:"年龄",
        dataIndex: 'age'
      },
      {
        title:"昵称",
        dataIndex: 'state',
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
        title: '状态',
        dataIndex: 'interest',
        render(interest){
          let config = {
            1:<Badge status='success' text='成功'/>,
            2:<Badge status='error' text="报错"/>,
            3:<Badge status='default' text='正常'/>,
            4:<Badge status='processing' text='进行中'/>,
            5:<Badge status='warning' text='警告'/>
          }
          return config[interest]
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '操作',
        render:(text,item) => {
          return <Button type='link' style={{display:'inline-block'}} onClick={(item)=>{this.handleDelete(item)}}>删除</Button>
        }
      }
    ];

    
    const stylecss = {
      margin: '10px 0'
    }
    return (
      <div>
        <Card title='头部固定' style={stylecss}>
          <Table
            dataSource={dataSource}
            columns={columns1} 
            bordered={true}
            pagination={false}
            scroll={{y:240}}
          />
        </Card>
        <Card title='左侧.右侧固定' style={stylecss}>
          <Table
            dataSource={dataSource}
            columns={columns2} 
            bordered={true}
            pagination={false}
            scroll={{x: 900}}
          />
        </Card>
        <Card title='表格排序' style={stylecss}>
          <Table
            dataSource={dataSource}
            columns={columns3} 
            bordered={true}
            pagination={false}
            onChange={this.handleChange}
          />
        </Card>
        <Card title='操作表格' style={stylecss}>
          <Table
            dataSource={dataSource}
            columns={columns4} 
            bordered={true}
            pagination={false}
          />
        </Card>
      </div>
    )
  }
}

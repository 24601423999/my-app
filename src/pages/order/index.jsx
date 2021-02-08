import React, { Component } from 'react'
import { Card, Button, Form, Modal, message } from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils' 
import BaseForm from './../../components/BaseForm/index'
import ETable from './../../components/ETable'

const FormItem = Form.Item;
// const Option = Select.Option;
export default class Order extends Component {
  state = {
    orderInfo: {},
    orderConfirmVisble:false
  }
  params = {
    page: 1
  }

  formList = [
    {
      type:'SELECT',
      label: "城市",
      placeholder: "全部",
      field:'city',
      initialValue: '',
      width:80,
      list:[{id:'',name:"全部"},{id:1,name:'北京'},{id:2,name:"天津"},{id:3,name:"邯郸"}]
    },
    {
      type:'时间查询'
    },
    {
      type:'SELECT',
      field: 'order_status',
      label: '订单状态',
      placeholder: '全部',
      initialValue: '',
      width:100,
      list: [{id:'',name:'全部'},{id:1,name:"进行中"},{id:2,name:'结束行程'}]    
    }
  ]

  componentWillMount(){
    this.requestList();
  }

  handleFilter = (params) => {
    this.params = params;
    this.requestList();
  }

  requestList = () => {
    let _this = this;
    axios.ajax({
      url: '/order/list',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then(res=>{
      // console.log('res:',res);
      if(res.code === 0){
        let list = res.result.item_list.map((item,index) => {
          item.key = index
          return item
        });
        this.setState({
          list,
          pagination:Utils.pagination(res,(current)=>{
            _this.params.page = current;
            _this.requestList();
          })
        })
      }
    })
  }

  // 结束订单
  handleFindshOrder = () => {
    let item = this.state.selectdItem;
    // console.log("items",items);
    axios.ajax({
      url: '/order/finish_order',
      data: {
        params:{
          orderId: item.id
        }
      }
    }).then(res=>{
      // console.log('res:',res);
      if(res.code === 0){
        message.success('订单结束');
        this.setState({
          orderConfirmVisble: false
        })
        this.requestList();
      }
    })
  }

  // 结束订单确认
  handleConfirm = () => {
    let item = this.state.selectdItem; 
    console.log('selectdItem',this.state.selectdItem);
    // console.log('item')

    if(!item){
      // console.log('items')
      Modal.info({
        title:"信息",
        content: '请选择一条订单进项结束！'
      })
      return ;
    }
    axios.ajax({
      url: '/order/ebike_info',
      data: {
        params:{
          orderId: item.id
        }
      }
    }).then(res=>{
      // console.log('res:',res);
      if(res.code === 0){
        this.setState({
          orderInfo: res.result,
          orderConfirmVisble: true
        })
      }
    })
    
  }


  // 订单详情
  openOrderDetail = () => {
    let item = this.state.selectedItem; 
    console.log('selectdItem',this.state.selectdItem);
    // console.log('item')

    if(!item){
      // console.log('items')
      Modal.info({
        title:"信息",
        content: '请先选择一条订单！'
      })
      return ;
    }
    window.open(`/#/common/order/detail/${item.id}`,'_black');
  }



  render() { 
    let { list, pagination, orderConfirmVisble, selectedRowKeys, selectedIds, selectedItem, orderInfo } = this.state;
    let { handleConfirm, handleFindshOrder, openOrderDetail } = this
    const columns = [
      {
        title:'订单编号',
        dataIndex: 'order_sn'
      },
      {
        title: '车辆编号',
        dataIndex: "bike_sn"
      },
      {
        title: '用户名',
        dataIndex: 'user_name'
      },
      {
        title: '手机号',
        dataIndex: 'modile'
      },
      {
        title: '里程',
        dataIndex: 'distance',
        render:(item) => {
          return item+' KM'
        }
      },
      {
        title: '行驶时长',
        dataIndex: 'total_time'
      },
      {
        title: '状态',
        dataIndex: 'order_status',
        render:(item) => {
          return item===1?"进行中":"行驶结束"
        }
      },
      {
        title: '开始时间',
        dataIndex: 'start_time'
      },
      {
        title: '结束时间',
        dataIndex: 'end_time'
      },
      {
        title: '订单金额',
        dataIndex: "total_fee"
      },
      {
        title:"实际金额",
        dataIndex: 'user_pay'
      }
    ]

    let formItemLayout = {
      labelCol: {span:5},
      wrapperCol: {span:19}
    }
 
    return (
      <div>
        <Card>
          {/* <FilterForm /> */}
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
        </Card>      
        <Card style={{marginTop: 10}}>
          <Button type='primary' onClick={openOrderDetail}>订单详情</Button>
          <Button type='primary' style={{marginLeft:5}} onClick={handleConfirm}>结束订单</Button>
        </Card>
        <div className='content-wrap'>
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            columns={columns}
            dataSource={list}
            selectedRowKeys={selectedRowKeys}
            pagination={pagination}
            selectedIds={selectedIds}
            selectedItem={selectedItem}
            rowSelection='checkbox'
          />
        </div>
        <Modal 
          title='结束订单'
          visible={orderConfirmVisble}
          onCancel={()=>{
            this.setState({
              orderConfirmVisble:false
            })
          }}
          onOk={handleFindshOrder}
          width={600}    
        >
          <Form layout='horizontal'>
            <FormItem label='车辆编号' {...formItemLayout}>
              {orderInfo.bike_sn}
            </FormItem>
            <FormItem label='剩余电量' {...formItemLayout}>
              {orderInfo.battery+'%'}
            </FormItem>
            <FormItem label='行程开始时间' {...formItemLayout}>
              {orderInfo.start_time}
            </FormItem>
            <FormItem label='当前位置' {...formItemLayout}>
              {orderInfo.location}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

// class FilterForm extends Component{
//   render() {
//     const { getFieldDecorator } = this.props.form;
//     return (
//       <Form layout='inline'>
//         <FormItem label='城市'>
//           {
//             getFieldDecorator('city_id')(
//               <Select
//                 placeholder='全部'
//                 style={{width:100}}
//               >
//                 <Option value=''>全部</Option>
//                 <Option value='1'>北京市</Option>
//                 <Option value='2'>天津市</Option>
//                 <Option value='3'>邯郸市</Option>
//               </Select>
//             )
//           }
//         </FormItem>
//         <FormItem label='订单时间'>
//           {
//             getFieldDecorator('start-time')(
//              <DatePicker showTime="YYYY-MM-DD HH:mm:ss" style={{marginRight:5}}/>
//             )
//           }
//         </FormItem>
//         <FormItem>
//           {
//               getFieldDecorator('end-time')(
//               <DatePicker showTime="YYYY-MM-DD HH:mm:ss"/>
//               )
//             }
//         </FormItem>  
//         <FormItem label='订单状态'>
//           {
//             getFieldDecorator('order_status')(
//               <Select
//                 placeholder='全部'
//                 style={{width:80}}
//               >
//                 <Option value=''>全部</Option>
//                 <Option value='1'>进行中</Option>
//                 <Option value='2'>行程结束</Option>
//               </Select>
//             )
//           }
//         </FormItem>
        
//         <FormItem>
//           <Button type='primary' style={{margin:'0 20px'}}>查询</Button>
//           <Button>重置</Button>
//         </FormItem>

//       </Form>
//     )
//   }
// }
// FilterForm = Form.create({})(FilterForm)
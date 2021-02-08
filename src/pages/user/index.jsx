import React, { Component } from 'react'
import { Card, Button, Modal, Form, Radio, Input, Select,  DatePicker } from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils'
import ETable from './../../components/ETable'
import BaseForm from './../../components/BaseForm'
import './../../style/common.less'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option  = Select.Option;
export default class User extends Component {
  state = {
    isVisible: false,
    list: []
  }

  params={
    page:1
  }

  componentWillMount(){
    this.requestList();
  }
  formList = [
    { 
      type:'INPUT',
      label: "用户名",
      placeholder: "请输入用户名",
      field:'user_name',
      width:120
    },
    {
      type:'INPUT',
      field: 'user_mobile',
      label: '手机号',
      placeholder: '请输入手机号',
      width:140
    },
    {
      type:'DATE',
      field: 'user_date',
      label: '入职时间',
      placeholder: '请选择日期'
    }
  ]

  handlefilter = (params) => {
    this.params=params;
    this.requestList()
  }

  requestList = () => {
    axios.requestList(this,'/user/list',this.params); 
  }

  // Modal框
  // 功能区操作
  handleOperate = (type) => {
    if(type === 'create'){
      this.setState({
        isVisible: true,
        title:'创建员工',
        type
      })
    }
    console.log('isVisible',this.state.isVisible);
  }

  // 创建员工提交
  handleSubmit = () => {
    let type = this.state.type;
    let data = this.userForm.props.form.getFieldsValue();
    axios.ajax({
      url:'/user/add',
      data: {
        params:data
      }
    }).then(res=>{
      if(res.code === 0){
        this.setState({
          isVisible: false
        })
        this.userForm.props.form.resetFields();
        this.requestList();
      }
    })
  }

  render() {
    let { list, title, pagination, selectedRowKeys, selectedItem, isVisible, type } = this.state;
    let { handlefilter, handleOperate, handleSubmit } = this

    const columns = [
      {
        title:'id',
        dataIndex: "id",
      },
      {
        title:'用户名',
        dataIndex: 'userName'
      },
      {
        title:"性别",
        dataIndex: 'sex'
      },
      {
        title:'状态',
        dataIndex: 'state',
        render(state){
          return {
            1:"咸鱼一条",
            2:"风华浪子",
            3:"北大才子一枚",
            4:"百度fe",
            5:"创业者"
          }[state]
        }
      },
      {
        title:'爱好',
        dataIndex: 'interest',
        render(interest){
          return {
            1:"篮球",
            2:"足球",
            3:"排球",
            4:"羽毛球",
            5:"乒乓球",
            6:'冰棒球',
            7:"长跑",
            8:"旅游"
          }[interest]
        }
      },
      {
        title:"生日",
        dataIndex: 'birthday'
      },
      {
        title:"联系地址",
        dataIndex: 'address'
      },
      {
        title:'早起时间',
        dataIndex: "time"
      }
    ]
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={handlefilter}/>
        </Card>
        <Card style={{marginTop: 10}} className='operate-wrap'>
          <Button type='primary' icon="plus" onClick={()=>handleOperate('create')}>创建员工</Button>
          <Button type='primary' icon='edit' onClick={()=>handleOperate('edit')}>编辑员工</Button>
          <Button type='primary' onClick={()=>handleOperate('detail')}>员工详情</Button>
          <Button type='primary' icon='delete' onClick={()=>handleOperate('delete')}>删除员工</Button>
        </Card>
        <div className='content-wrap'>
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            columns={columns}
            dataSource={list}
            selectedRowKeys={selectedRowKeys}
            pagination={pagination}
            selectedItem={selectedItem}
            rowSelection={true}
          />
        </div>
        <Modal
          title={title}
          visible={isVisible}
          onOk={this.handleSubmit}
          width={600}
          onCancel={()=>{
            this.userForm.props.form.resetFields();
            this.setState({
              isVisible: false
            })
          }}
        >
          <UserForm type={type} wrappedComponentRef={(inst)=>this.userForm=inst} />
        </Modal>
      </div>
    )
  }
}


class UserForm extends Component{
  render() {
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:15}
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout='horizontal'>
        <FormItem label='用户名' {...formItemLayout}>
          {
            getFieldDecorator('user_name')(
              <Input type='text' placeholder="请输入用户名" />
            )
          }
        </FormItem>
        <FormItem label='性别' {...formItemLayout}>
          {
            getFieldDecorator('sex')(
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem label='状态' {...formItemLayout}>
          {
            getFieldDecorator('state')(
              <Select>
                <Option value={1}>咸鱼一条</Option>
                <Option value={2}>风华浪子一枚</Option>
                <Option value={3}>北大才子</Option>
                <Option value={4}>百度FE</Option>
                <Option value={5}>创业者</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label='生日' {...formItemLayout}>
          {
            getFieldDecorator('birthday')(
              <DatePicker/>
            )
          }
        </FormItem>
        <FormItem label='联系地址' {...formItemLayout}>
          {
            getFieldDecorator('address')(
              <TextArea rows={3} placeholder="请输入联系地址" />
            )
          }
        </FormItem>
      </Form>
    )
  }
}

UserForm = Form.create({})(UserForm); 


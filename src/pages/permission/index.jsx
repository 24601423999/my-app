import React, { Component } from 'react'
import { Transfer, Card, Button, Modal, Form, Select, Input, Tree } from 'antd'
import './../../style/common.less'
import ETable from './../../components/ETable'
import Utils from './../../utils/utils'
import axios from './../../axios'
import menuConfig from './../../config/menuConfig'

const FormItem = Form.Item;
const Option = Select.Option
const TreeNode = Tree.TreeNode;
export default class Permission extends Component {
  state={
    isRoleVisible:false
  }
  componentWillMount(){
      axios.requestList(this,'/role/list',{})
  }

  // 创建角色
  handleRole = () => {
    this.setState({
      isRoleVisible: true
    })
  }

  // 创建角色提交
  handleRoleSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue();
    axios.ajax({
      url:"/role/create",
      data: {
        params:data
      }
    }).then(res=>{
      if(res.code===0){
        this.setState({
          isRoleVisible:false
        })
        this.roleForm.props.form.resetFields();
        axios.requestList(this,'/role/list',{})
      }
    })
  }

  // 权限设置
  handlePermission = () => {
    let item = this.state.selectedItem;
    if(!item){
      Modal.info({
        title:"提示",
        content:'请选择一个角色'
      })
      return ;
    }
    this.setState({
      isPermVisible: true,
      detailInfo:item,
      menuInfo: item.menus
    })

  }

  //权限提交
  handlePermEditSubmit = () => {
    let data = this.PermEditForm.props.form.getFieldsValue();
    data.role_id = this.state.selectedItem.id;
    data.menus = this.state.menuInfo;
    axios.ajax({
      url:"/permission/edit",
      data: {
        params: {
          ...data
        }
      }
    }).then(res=>{
      if(res){
        this.setState({
          isPermVisible: false
        })
      }
      axios.requestList(this,'/role/list',{})
    })
  } 

  // 用户授权 
  handleUserAuth = () => {
    let item = this.state.selectedItem;
    if(!item){
      Modal.info({
        title:"提示",
        content: "请选择一个角色"
      })
      return;
    }
    this.setState({
      isUserVisible: true,
      detailInfo: item
    })
    this.getRoleUserList(item.id)
  }

  // 获取用户接口
  getRoleUserList = (id) => {
    axios.ajax({
      url:"/role/user_list",
      data: {
        params: {
          id
        }
      }
    }).then(res=>{
      if(res){
        this.getAuthUserList(res.result);
      }
    })
  }

  // 筛选目标用户
  getAuthUserList = (dataSource) => {
    const mockData = []; // 数据源
    const targetKeys = []; // 已选用户
    console.log('dataSoruce:',dataSource);
    if(dataSource && dataSource.length>0){
      for(let i=0; i<dataSource.length;i++){
        const data = {
          key: dataSource[i].user_id,
          title: dataSource[i].user_name,
          status: dataSource[i].status
        }  
        if(data.status === 1 ){
          targetKeys.push(data.key)
        }
        mockData.push(data);
      }
      this.setState({
        mockData,
        targetKeys
      })
      console.log('targetKeys:',this.state.targetKeys);
    }
  }

  // 用户权限提交
  handleUserSubmit = () =>{
    let data = {};
    data.user_ids = this.state.targetKeys;
    data.role_id = this.state.selectedItem.id;
    axios.ajax({
      url:'/role/user_role_edit',
      data: {
        params: {
          ...data
        }
      }
    }).then(res=>{
      if(res){
        this.setState({
          isUserVisible: false
        })
      }
      axios.requestList(this,'/role/list',{})
    })
  }
  render() {
    let { list, selectedRowKeys, isRoleVisible, isPermVisible, detailInfo, isUserVisible, targetKeys, mockData } = this.state;
    let { handleRole, handleRoleSubmit, handlePermission, handlePermEditSubmit, handleUserAuth, handleUserSubmit } = this;
    const columns = [
      {
        title:"角色ID",
        dataIndex: 'id'
      },{
        title:"角色名称",
        dataIndex: 'role_name'
      },{
        title:"创建时间",
        dataIndex: 'create_time',
        render:Utils.formateDate

      },{
        title:"使用状态",
        dataIndex: 'status',
        render(status){
          return status === 1?'启动':'禁用'
        }
      },{
        title:'授权时间',
        dataIndex:"authorize_time",
        render:Utils.formateDate
      },{
        title:"授权人",
        dataIndex: 'authorize_user_name'
      }
    ]
    return (
      <div>
        <Card className='operate-wrap'>
          <Button type='primary' onClick={handleRole}>创建角色</Button>
          <Button type='primary' onClick={handlePermission}>设置权限</Button>
          <Button type='primary' onClick={handleUserAuth}>用户授权</Button>
        </Card>
        <div className='content-wrap'> 
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={selectedRowKeys}
            dataSource={list}
            columns={columns}
            rowSelection={true}
          />
        </div>
        <Modal
          title="创建角色"
          visible={isRoleVisible}
          onOk={handleRoleSubmit}
          onCancel={()=>{
            this.roleForm.props.form.resetFields()
            this.setState({
              isRoleVisible:false
            })
          }}
        >
          <RoleForm wrappedComponentRef={inst=>this.roleForm=inst}></RoleForm>
        </Modal>

        <Modal
          title='设置权限'
          visible={isPermVisible}
          width={600}
          onOk={handlePermEditSubmit}
          onCancel={()=>{
            this.setState({
              isPermVisible: false
            })
          }}
        >
          <PermEditForm 
            wrappedComponentRef={inst=>this.PermEditForm=inst}
            detailInfo={detailInfo}
            menuInfo={this.state.menuInfo}
            patchMenuInfo={(checkKeys)=>{
              this.setState({
                menuInfo: checkKeys
              })
            }}
          />
        </Modal>
        
        <Modal
          title='用户授权'
          visible={isUserVisible}
          width={800}
          onOk={handleUserSubmit}
          onCancel={()=>{
            this.setState({
              isUserVisible: false
            })
          }}
        >
          <RoleAuthForm 
            wrappedComponentRef={inst=>this.userAuthForm=inst}
            detailInfo={detailInfo}
            targetKeys={targetKeys}
            mockData={mockData}
            patchUserInfo={(targetKeys)=>{
              this.setState({
                targetKeys
              })
            }}
          />
        </Modal>
      </div>
    )
  }
}

// 创建角色
class RoleForm extends Component{
  render() { 
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:10}
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout='horizontal'>
        <FormItem label='角色名称' {...formItemLayout}>
          {
            getFieldDecorator('role_name')(
              <Input type='text' placeholder="请输入角色名称" />
            )
          }
        </FormItem>
       
        <FormItem label='状态' {...formItemLayout}>
          {
            getFieldDecorator('state')(
              <Select>
                <Option value={1}>开启</Option>
                <Option value={0}>关闭</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}
RoleForm = Form.create({})(RoleForm); 

// 权限设置
class PermEditForm extends Component{

  onCheck = (checkKeys) => {
    this.props.patchMenuInfo(checkKeys);
  }

  renderTreeNodes = (data) => {
    return data.map(item=>{
      if(item.children){
        return <TreeNode title={item.title} key={item.key}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      }else{
        return <TreeNode title={item.title} key={item.key}></TreeNode>
      }
    })
  }
  render() {
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:10}
    }
    const { getFieldDecorator } = this.props.form;
    const detailInfo = this.props.detailInfo;
    const menuInfo = this.props.menuInfo;
    return (
      <Form layout='horizontal'>
        <FormItem label='角色名称' {...formItemLayout}>
          <Input disabled placeholder={detailInfo.role_name} />
        </FormItem>
        <FormItem label='状态' {...formItemLayout}>
          {
            getFieldDecorator('status',{
              initialValue:'1'
            })(
              <Select style={{width:80}}> 
                <Option value='1'>启用</Option>
                <Option value='0'>禁用</Option>
              </Select>
            )
          }
        </FormItem>
        <Tree
          checkable
          defaultExpandAll
          onCheck={(checkedKeys)=>{
            this.onCheck(checkedKeys)
          }}
          checkedKeys={menuInfo}
        >
          <TreeNode title='平台权限' key='platform_all'>
            {this.renderTreeNodes(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    )
  }
}
PermEditForm = Form.create({})(PermEditForm); 

// 用户权限
class RoleAuthForm extends Component{

  onCheck = (checkKeys) => {
    this.props.patchMenuInfo(checkKeys);
  }
  filterOption=(inputValue,option)=>{
    return option.title.indexOf(inputValue) > -1
  }

  handleChange = (targetKeys) => {
    this.props.patchUserInfo(targetKeys);
  }
  render() {
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:15}
    }
    const detailInfo = this.props.detailInfo;
    return (
      <Form layout='horizontal'>
        <FormItem label='角色名称' {...formItemLayout}>
          <Input disabled placeholder={detailInfo.role_name} />
        </FormItem>
        <FormItem label='选择用户' {...formItemLayout}>
          <Transfer
            listStyle={{width:200,height:400}}
            dataSource={this.props.mockData}
            titles={["待选用户",'已选用户']}
            showSearch 
            locale={{searchPlaceholder:'请输入用户名'}}
            filterOption={this.filterOption}
            targetKeys={this.props.targetKeys}
            onChange={this.handleChange}
            render={item=>item.title}
          >
        </Transfer>
        </FormItem>
        
      </Form>
    )
  }
}
RoleAuthForm = Form.create({})(RoleAuthForm); 


import React, { Component } from 'react'
import { Card, Form, Input, Button, message, Modal, Checkbox, Icon, Select, Switch, TimePicker, Upload, Radio, InputNumber, DatePicker } from 'antd'
import moment from 'moment'


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const TextArea = Input.TextArea;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class Register extends Component{
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: []
  };

  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        message.success(`${userInfo.userName}:恭喜您，通过了本次表单学习，当前密码是${userInfo.userPsd}`)
      }
    })
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    let { getFieldDecorator } = this.props.form;
    let { handleSubmit } = this;
    let { previewVisible, previewImage, fileList } = this.state;
    let uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    let formItemLayout = {
      labelCol:{
        xs:24,
        sm:8
      },
      wrapperCol:{
        xs:24,
        sm:16
      }
    }
    const offsetLayout = {
      wrapperCol:{
          xs:24,
          sm:{
              span:12,
              offset:4
          }
      }
    }
    return (
      <div>
        <Card title='注册表单'>
          <Form layout='horizontal' style={{width:350}}>
          <FormItem label='用户名' {...formItemLayout}>
              {
                getFieldDecorator('userName',{
                  initialValue:'',
                  rules: [
                    {
                      required:true,
                      message:'用户名不能为空'
                    }
                  ]
                })(
                  <Input prefix={<Icon type='user' />} type='text' placeholder='请输入用户名' />
                )
              }
            </FormItem>
            <FormItem label='密码' {...formItemLayout}>
            {
                getFieldDecorator('userPsd',{
                  initialValue:'',
                  rules: [
                    {
                      required:true,
                      message:"密码错误或为空"
                    }
                  ]
                })(
                  <Input prefix={<Icon type='lock'/>} type='password' placeholder='请输入密码' />
                )
              }
            </FormItem>
            <FormItem label='性别' {...formItemLayout}>
            {
                getFieldDecorator('sex',{
                  initialValue:'1'
                })(
                  <RadioGroup>
                    <Radio value='1'>男</Radio>
                    <Radio value='2'>女</Radio>

                  </RadioGroup>
                )
              }
            </FormItem>

            <FormItem label='年龄' {...formItemLayout}>
            {
                getFieldDecorator('seagex',{
                  initialValue:'18'
                })(
                  <InputNumber />
                )
              }
            </FormItem>
            <FormItem label='当前状态' {...formItemLayout}>
            {
                getFieldDecorator('state',{
                  initialValue:'1'
                })(
                  <Select>
                    <Option value='1'>咸鱼一条</Option>
                    <Option value='2'>风华浪子</Option>
                    <Option value='3'>北大才子一枚</Option>
                    <Option value='4'>百度FE</Option>
                    <Option value='5'>创业者</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label='爱好' {...formItemLayout}>
            {
                getFieldDecorator('interest',{
                  initialValue:['1','4']
                })(
                  <Select mode='multiple'>
                    <Option value='1'>游泳</Option>
                    <Option value='2'>篮球</Option>
                    <Option value='3'>足球</Option>
                    <Option value='4'>排球 </Option>
                    <Option value='5'>羽毛球</Option>
                    <Option value='6'>冰棒球</Option>
                    <Option value='7'>乒乓球</Option>
                    <Option value='8'>台球</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label='是否已婚' {...formItemLayout}>      
              <Switch defaultChecked={true} />
            </FormItem>
            <FormItem label='生日' {...formItemLayout}>
            {
                getFieldDecorator('birthday',{
                  initialValue: moment('2021-02-02 12:00:00'),
                })(
                  <DatePicker
                    showTime
                    format='YYYY-MM-DD HH:mm:ss'
                  />
                )
              }
            </FormItem>
            <FormItem label='联系地址' {...formItemLayout}>
            {
                getFieldDecorator('address',{
                  initialValue: '邯郸市永年区广府镇莲花口村',
                })(
                  <TextArea 
                    autoSize={
                      {
                        minRows:4,
                        maxRows: 6
                      }
                      
                    }
                  />
                )
              }
            </FormItem>
            <FormItem label='早起时间' {...formItemLayout}>
            {
                getFieldDecorator('time')(
                  <TimePicker />
                )
              }
            </FormItem>
            <FormItem label="头像" {...formItemLayout}>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </FormItem>
            <FormItem {...offsetLayout}>
              <Checkbox>我已阅读过<Button type='link'>慕课协议</Button></Checkbox>
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button type='primary' onClick={handleSubmit}>注册</Button>
            </FormItem>
            
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(Register);
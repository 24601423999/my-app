import React, { Component } from 'react'
import { Card, Form, Input, Button, message, Checkbox, Icon } from 'antd'
// import './'

const FormItem = Form.Item;
class FormLogin extends Component{

  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        message.success(`${userInfo.userName}:恭喜您，通过了本次表单学习，当前密码是${userInfo.userPsd}`)
      }
    })
  }

  render() {
    let { getFieldDecorator } = this.props.form;
    let { handleSubmit } = this;
    return (
      <div>
        <Card title='登录行内表单'>
          <Form layout='inline'>
            <FormItem>
              <Input type='text' placeholder='请输入用户名' />
            </FormItem>
            <FormItem>
              <Input type='password' placeholder='请输入密码' />
            </FormItem>
            <FormItem>
              <Button type='primary'>登录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title='登录水平表单'>
          <Form style={{width:250}}>
          <FormItem>
              {
                getFieldDecorator('userName',{
                  initialValue:'',
                  rules: [
                    {
                      required:true,
                      message:'用户名不能为空'
                    },
                    {
                      min:5,
                      max:10,
                      message:'超过长度范围'
                    }
                  ]
                })(
                  <Input prefix={<Icon type='user' />} type='text' placeholder='请输入用户名' />
                )
              }
            </FormItem>
            <FormItem>
            {
                getFieldDecorator('userPsd',{
                  initialValue:'',
                  rules: [
                    {
                      required:true,
                      message:"密码错误或为空"
                    },
                    {
                      min:5,
                      max:10,
                      message:'超过长度范围'
                    }
                  ]
                })(
                  <Input prefix={<Icon type='lock'/>} type='password' placeholder='请输入密码' />
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember',{
                  // valurPropName: 'checked',
                  initialValue: true
                })(
                  <Checkbox>记住密码</Checkbox>
                )
              }
              <Button type='link' style={{float:"right"}}>忘记密码？</Button>
            </FormItem>
            <FormItem>
              <Button type='primary' onClick={handleSubmit}>登录</Button>
            </FormItem>
            
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(FormLogin);
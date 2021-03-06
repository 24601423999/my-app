import React, { Component } from 'react'
import { Select, Form, Button, Checkbox, DatePicker, Input } from 'antd'
import Utils from './../../utils/utils'


const FormItem = Form.Item;

class FilterForm extends Component {
  state = {
 
  }

  handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue();
    this.props.filterSubmit(fieldsValue);
  }
  initFormList = () => {
    const {getFieldDecorator} = this.props.form;
    const formList = this.props.formList;
    const formItemList = [];

    if(formList && formList.length>0){
      formList.forEach((item,i)=>{
        let label = item.label;
        let field = item.field;
        let initialValue = item.initialValue || '';
        let placeholder = item.placeholder;
        let width = item.width;
        if(item.type === 'INPUT'){
          const INPUT = <FormItem label={label} key={field}>
            {
              getFieldDecorator(field,{
                initialValue:initialValue
              })(
                <Input
                  type='text'
                  placeholder={placeholder}
                  style={{width: width}}
                />
              )
            }
          </FormItem>
          formItemList.push(INPUT);
        }else if (item.type === 'SELECT') {
          const SELECT = <FormItem label={label} key={field}>
              {
                  getFieldDecorator(field, {
                      initialValue: initialValue
                  })(
                      <Select
                          style={{ width: width }}
                          placeholder={placeholder}
                      >
                          {Utils.getOptionList(item.list)}
                      </Select>
                  )
              }
          </FormItem>;
          formItemList.push(SELECT)
      } else if(item.type === '时间查询'){
          const begin_time = <FormItem label="订单时间" key='begin_time'>
            {
              getFieldDecorator("begin_time",{
              })(
                <DatePicker
                  showTime = {true}
                  placeholder={placeholder}
                  format='YYYY-MM-DD HH:mm:ss'
                />
              )
            }
          </FormItem>
          formItemList.push(begin_time)
          const end_time = <FormItem label="~" colon={false} key='end_time'>
            {
              getFieldDecorator("end_time",{
              })(
                <DatePicker
                  showTime = {true}
                  placeholder={placeholder}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              )
            }
          </FormItem>
          formItemList.push(end_time)
        }else if(item.type === '城市'){
          const city = <FormItem label='城市' key='city'>
            {
              getFieldDecorator("city",{
                initialValue:'0'
              })(
                <Select
                  style={{width:width}}
                  placeholder={placeholder}
                >
                  {Utils.getOptionList([{id:'0',name:"全部"},{id:"1",name:"北京市"},{id:"2",name:"天津市"},{id:"3",name:"邯郸市"}])}
                </Select>
              )
            }
          </FormItem>
          formItemList.push(city);
        }else if(item.type === 'CHECKBOX'){
          const CHECK = <FormItem label={label} key={field}>
            {
              getFieldDecorator(field,{
                valuePropName: "checked",
                initialValue:initialValue
              })(
                <Checkbox> 
                  {label}
                </Checkbox>
              )
            }
          </FormItem>
          formItemList.push(CHECK);
        }else if(item.type === 'DATE'){
          const datepicker = <FormItem label={label} key={field}>
            {
              getFieldDecorator(field)(
                <DatePicker
                  showTime = {true}
                  placeholder={placeholder}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              )
            }
          </FormItem>
          formItemList.push(datepicker);
        }
      })
    }
    return formItemList
  }
  render() {
    let { handleFilterSubmit } = this;
    return (
      <Form layout='inline'>
        {this.initFormList()}
        <FormItem>
          <Button type='primary' style={{margin:'0 20px'}} onClick={handleFilterSubmit}>查询</Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create({})(FilterForm);

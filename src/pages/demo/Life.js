import React, { Component } from 'react'
import './../index.less'
import {Button} from 'antd'

export default class Life extends Component {
    state={
      count:0
    }
    addCount=()=>{
      this.setState({
        count:this.state.count+1
      })
    };
    subCount=()=>{
      this.setState({
        count:this.state.count-1
      })
    }
    render() {
      let {count} = this.state;
      let {addCount,subCount} = this;
        return (
            <div className="context">
                <p>Life组件</p>
                <p>{count}</p>
                <Button type="primary" onClick={()=>addCount()}>+</Button>
                <button onClick={()=>subCount()}>-</button>
            </div>
        )
    }
}

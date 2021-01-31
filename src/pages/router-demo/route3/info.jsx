import React, { Component } from 'react'

export default class Info extends Component {
    render() {
        return (
            <div>
                这里是测试动态路由功能的组件
                <br/>
                {this.props.match.params.mainid}
            </div>
        )
    }
}

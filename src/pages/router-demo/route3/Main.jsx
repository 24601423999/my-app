import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Main extends Component {
    render() {
        return (
            <div style={{
                border: '2px solid #f00',
                fontSize: '15x',
                fontStyle: '黑体',
                textDecoration: 'none',
                margin: '0 0 0 10px',
                padding: 0,
                width: '300px'
            }}>
                <h3>this is Main;</h3> 
                <hr/>
                <Link to='/Main/test-id'>嵌套组件1</Link>
                <br/>
                <br/>
                <Link to='/Main/456'>嵌套组件2</Link>
                <br/>
                {this.props.children}
                
            </div>
        )
    }
}

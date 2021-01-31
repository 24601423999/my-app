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
                <Link to='/Main/Home'>嵌套组件</Link>
                <hr/>
                {this.props.children}
            </div>
        )
    }
}

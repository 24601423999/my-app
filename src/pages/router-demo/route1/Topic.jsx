import React, { Component } from 'react'

export default class Topic extends Component {
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
               <h3>this is Topic; </h3> 
            </div>
        )
    }
}

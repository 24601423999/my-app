import React, { Component } from 'react'

export default class Buttons extends Component {
    render() {
        let style = {
            fontSize: '30px',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 'calc(68vh)'
        }
        return (
            <div style={style}>
                this is Buttons page
            </div>
        )
    }
}

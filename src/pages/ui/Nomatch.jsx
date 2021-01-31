import React, { Component } from 'react'

export default class Nomatch extends Component {
    render() {
        let style = {
            fontSize: '30px',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 'calc(68vh)'
        }
        return (
            <div style={style}>
                404 No Match....
            </div>
        )
    }
}

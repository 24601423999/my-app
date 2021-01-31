import React,{ Component } from 'react'
import {Link} from 'react-router-dom'

export default class HOME extends Component{
    render() {
        return (
            <div>
                <ul>
                    <li><Link to='/Main'>Main</Link></li>
                    <li><Link to='/About'>About</Link></li>
                    <li><Link to='/Topic'>Topic</Link></li>
                </ul>
                <hr/>
                {this.props.children}
            </div>
        )
    }
}
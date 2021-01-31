import React, { Component } from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Main from './Main'
import About from './About'
import Topic from './Topic'
export default class Home extends Component {
    render() {
        return (
            <Router>
                <div style={{
                    border: '2px solid #f00',
                    fontSize: '15x',
                    fontStyle: '黑体',
                    textDecoration: 'none',
                    margin: '0 0 0 10px',
                    padding: 0,
                    width: '300px'
                }}>
                    <ul>
                    <li>
                        <Link to='/'>About</Link></li>
                        <li><Link to='/main'>Main</Link></li>
                        <li><Link to='/topic'>Topic</Link></li>
                    </ul>
                    <hr/>
                    <Switch>
                        <Route exact path='/' component={About}/>
                        <Route path='/main' component={Main}></Route>
                        <Route path='/topic' component={Topic}></Route>
                    </Switch>
                    
                </div>
            </Router>
        )
    }
}

import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Main from './Main'
import About from './../route1/About'
import Topic from './../route1/Topic'
import Home from './../route1/Home'
import HOME from './Home'
export default class Router1 extends Component {
    render() {
        return (
            <Router>
                <HOME>
                    <Route  path='/Main' render={()=>
                        <Main>
                            <div>this is render下的内容</div>
                            <Route path='/Main/Home' component={Home}/>
                        </Main>
                    }/>
                    <Route path='/About' component={About}/>
                    <Route path='/Topic' component={Topic}/>
                </HOME>
            </Router>
        )
    }
}

import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './Main'
import Info from './info'
import Topic from './../route1/Topic'
import About from './../route1/About'
import HOME from './Home'
import Nomatch from './Nomatch'
export default class Router1 extends Component {
    render() {
        return (
            <Router>
                <HOME>
                    <Switch>
                        <Route  path='/Main' render={()=>
                            <Main>
                                <hr/>
                                <div>this is render下的内容</div>
                                <hr/>
                                <Route path='/Main/:mainid' component={Info}/>
                            </Main>
                        }/>
                        <Route path='/About' component={About}/>
                        <Route path='/Topic' component={Topic}/>
                        <Route component={Nomatch}/>
                        
                    </Switch>
                </HOME>
            </Router>
        )
    }
}

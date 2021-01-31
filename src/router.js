import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Buttons from './pages/ui/buttons'
import Nomatch from './pages/ui/Nomatch'
import Home from './pages/home'

export default class IRouter extends Component{
    render() {
        return (
            <Router>
                <App>
                    <Route path='/login' component={Login}/>
                    <Route path='/admin' render={()=>
                      <Admin>
                        <Switch>
                        <Route path='/admin/home' component={Home}/>
                        <Route path='/admin/ui/buttons' component={Buttons}/>
                        <Route component={Nomatch}/>
                        </Switch>
                      </Admin>
                    } />
                </App>
            </Router>
        )
    }
}
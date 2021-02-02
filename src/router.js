import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Nomatch from './pages/ui/Nomatch'
import Loading from './pages/ui/loading'
import Notice from './pages/ui/notice'
import Message from './pages/ui/message'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
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
                        <Route path='/admin/ui/modals' component={Modals}/>
                        <Route path='/admin/ui/loadings' component={Loading}/>
                        <Route path='/admin/ui/notification' component={Notice}/>
                        <Route path='/admin/ui/messages' component={Message}/>
                        <Route path='/admin/ui/tabs' component={Tabs}/>
                        <Route path='/admin/ui/gallery' component={Gallery}/>
                        <Route component={Nomatch}/>
                        </Switch>
                      </Admin>
                    } />
                </App>
            </Router>
        )
    }
}
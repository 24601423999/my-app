import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loading from './pages/ui/loading'
import Notice from './pages/ui/notice'
import Message from './pages/ui/message'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import Home from './pages/home'
import FormLogin from './pages/form/login'
import Register from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import City from './pages/city/index'
import Order from './pages/order/index'
import Common from './common'
import OrderDetail from './pages/order/detail'
import User from './pages/user/index'
import bikeMap from './pages/map/bikeMap'


import Nomatch from './pages/ui/Nomatch'

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
                            <Route path='/admin/ui/carousel' component={Carousel}/>

                            <Route path='/admin/form/login' component={FormLogin}/>
                            <Route path='/admin/form/reg' component={Register}/>

                            <Route path='/admin/table/basic' component={BasicTable}/>
                            <Route path='/admin/table/high' component={HighTable}/>

                            {/* city */}
                            <Route path='/admin/city' component={City} />
                            {/* order */}
                            <Route path='/admin/order' component={Order} />
                            {/* user */}
                            <Route path='/admin/user' component={User} />
                            {/* map */}
                            <Route path='/admin/bikeMap' component={bikeMap} />
                            <Route component={Nomatch}/>
                            </Switch>
                        </Admin>
                        } />
                    <Route path='/common' render={()=>
                        <Common>
                            <Route path='/common/order/detail/:orderId' component={OrderDetail} />
                        </Common>
                    } />
                </App>
            </Router>
        )
    }
}
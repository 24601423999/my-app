import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
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
import Permission from './pages/permission'


// import Nomatch from './pages/ui/Nomatch'

export default class IRouter extends Component{
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/common' render={()=>
              <Common>
                <Route path='/common/order/detail/:orderId' component={OrderDetail} />
              </Common>
            } />
            <Route path='/' render={()=>
              <Admin>
                <Switch>
                  <Route path='/home' component={Home}/>
                  <Route path='/ui/buttons' component={Buttons}/>
                  <Route path='/ui/modals' component={Modals}/>
                  <Route path='/ui/loadings' component={Loading}/>
                  <Route path='/ui/notification' component={Notice}/>
                  <Route path='/ui/messages' component={Message}/>
                  <Route path='/ui/tabs' component={Tabs}/>
                  <Route path='/ui/gallery' component={Gallery}/>
                  <Route path='/ui/carousel' component={Carousel}/>

                  <Route path='/form/login' component={FormLogin}/>
                  <Route path='/form/reg' component={Register}/>

                  <Route path='/table/basic' component={BasicTable}/>
                  <Route path='/table/high' component={HighTable}/>

                  {/* city */}
                  <Route path='/city' component={City} />
                  {/* order */}
                  <Route path='/order' component={Order} />
                  {/* user */}
                  <Route path='/user' component={User} />
                  {/* map */}
                  <Route path='/bikeMap' component={bikeMap} />
                  {/* permission */}
                  <Route path='/permission' component={Permission} />
                  {/* <Route component={Nomatch}/> */}
                  <Redirect to='/home' />
                </Switch>
              </Admin>
            } />
          </Switch>
        </App>
      </Router>
      )
  }
}
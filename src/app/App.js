import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import NavBar from './components/UI/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'

const App = () => {
  return (
    <div>
      <NavBar/>
      <Switch>
        <Route path="/users/:userId?/:edit?" component={Users}/>
        <Route path="/login/:type?" component={Login}/>
        <Route path="/" ecxact component={Main}/>
        <Redirect to="/"/>
      </Switch>
    </div>
  )
}

export default App
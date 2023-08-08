import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import NavBar from './components/UI/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import {ToastContainer} from 'react-toastify'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './layouts/logOut'
import AppLoader from './components/UI/hoc/appLoader'

const App = () => {
  return (
    <div>
      <AppLoader>
        <NavBar/>
        <Switch>
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users}/>
          <Route path="/login/:type?" component={Login}/>
          <Route path="/logout" component={LogOut}/>
          <Route path="/" ecxact component={Main}/>
          <Redirect to="/"/>
        </Switch>
      </AppLoader>
      <ToastContainer/>
    </div>
  )
}

export default App
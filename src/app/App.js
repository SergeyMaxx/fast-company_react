import React, {useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import NavBar from './components/UI/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import {ToastContainer} from 'react-toastify'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './layouts/logOut'
import {loadQualitiesList} from './store/qualities'
import {loadProfessionsList} from './store/professions'
import {useDispatch} from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionsList())
  }, [])

  return (
    <div>
      <AuthProvider>
        <NavBar/>
        <Switch>
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users}/>
          <Route path="/login/:type?" component={Login}/>
          <Route path="/logout" component={LogOut}/>
          <Route path="/" ecxact component={Main}/>
          <Redirect to="/"/>
        </Switch>
        <ToastContainer/>
      </AuthProvider>
    </div>
  )
}

export default App
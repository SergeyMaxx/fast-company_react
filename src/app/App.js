import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import NavBar from './components/UI/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import {ProfessionProvider} from './hooks/useProfession'
import {QualitiesProvider} from './hooks/useQualities'
import {ToastContainer} from 'react-toastify'
import AuthProvider from './hooks/useAuth'

const App = () => {
  return (
    <div>
      <AuthProvider>
      <NavBar/>
      <QualitiesProvider>
        <ProfessionProvider>
          <Switch>
            <Route path="/users/:userId?/:edit?" component={Users}/>
            <Route path="/login/:type?" component={Login}/>
            <Route path="/" ecxact component={Main}/>
            <Redirect to="/"/>
          </Switch>
        </ProfessionProvider>
      </QualitiesProvider>
      <ToastContainer/>
      </AuthProvider>
    </div>
  )
}

export default App
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import "bootstrap/dist/css/bootstrap.css"
import Users from './app/components/users'

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <Users/>
  )

reportWebVitals()
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.css'
import App from './app/App'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  )

reportWebVitals()
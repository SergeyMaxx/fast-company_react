import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.css'
import App from './app/App'
import {Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore} from './app/store/createStore'
import history from './app/utils/history'

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <Provider store={createStore()}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>
  )

reportWebVitals()
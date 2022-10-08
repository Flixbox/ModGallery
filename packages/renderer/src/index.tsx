import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import {pickModFolder} from '#preload'

// console.log(await pickModFolder())

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

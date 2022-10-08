import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'

console.log(window.electron.yeet())

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

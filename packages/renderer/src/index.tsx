import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import * as Sentry from '@sentry/electron'

Sentry.init({
  dsn: 'https://38006d2a3b714e4e9c1726fec13ff0d2@o4504043188387840.ingest.sentry.io/4504043190812673',
})

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

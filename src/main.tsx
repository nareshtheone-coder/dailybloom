import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AdManagerProvider } from './ads'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdManagerProvider>
      <App />
    </AdManagerProvider>
  </StrictMode>,
)

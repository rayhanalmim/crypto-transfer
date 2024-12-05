import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import { CryptoProvider } from './AppContext/CryptoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CryptoProvider>
      <RouterProvider router={router} />
    </CryptoProvider>

  </StrictMode>,
)

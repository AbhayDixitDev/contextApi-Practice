import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ContextCount from './contextCount.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
    <ContextCount >
      <App />
    </ContextCount>
)

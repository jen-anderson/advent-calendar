import { createRoot } from 'react-dom/client'
import App from './components/App'
import './styles/main.css'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(<App />)
})

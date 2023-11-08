import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CssBaseline from "@mui/material/CssBaseline";
import './App.css'
import HomePage from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <CssBaseline>
    <HomePage />
    </CssBaseline>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DataTable from './components/dataTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DataTable/>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import DrawCards from './DrawCards'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DrawCards />
    </>
  )
}

export default App

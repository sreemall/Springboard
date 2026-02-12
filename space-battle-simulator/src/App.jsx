import react, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BattleSimulator from './BattleSimulator';

function App() {

  return (
    <>
      <BattleSimulator DAMAGE_RANGE = {40} />
    </>
  )
}

export default App

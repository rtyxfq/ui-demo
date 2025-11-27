import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from '@ui-demo/ui';
import './App.css'

function App() {

  return (
    <>
      <Button onClick={() => alert('Component from UI library clicked!')}>
        Monorepo Button
      </Button>
    </>
  )
}

export default App

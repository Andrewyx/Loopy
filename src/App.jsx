import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Input from './components/input'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [username, setUsername] = useState('')
  
  return (
    <>
      <div className="w-full h-screen bg-bg">
        <div className="bg-white h-[10%] border-b-black border-b-4 mb-10 px-10 flex flex-row justify-between align-center items-center">
          <h1 className="text-3xl text-black font-bold">Loopy: Rate your route!</h1>
          {/* <div className="divider divider-horizontal divider-primary h-3/4"/> */}
          {/* <h1>Find a Route</h1> */}
        </div>
        <div className="w-3/4 mx-auto flex flex-row p-5 items-center align-center justify-evenly">
          {/* <h1 className="text-3xl">From</h1> */}
          <Input className="w-1/4" value={username} setValue={setUsername} placeholder="From" /> 
          {/* <h1 className="text-3xl">To</h1> */}
          <Input className="w-1/4" value={username} setValue={setUsername} placeholder="To" /> 
        </div>
      </div>
    </>
  )
}

export default App

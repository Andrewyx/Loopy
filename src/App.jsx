import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { FaArrowRight } from "react-icons/fa";
import { FaSearch } from 'react-icons/fa';
import Button from './components/button';
import { Input } from './components/input'

import './App.css'

function App() {

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  function handleClick() {
    console.log("From: " + from);
    console.log("To: " + to);

  }

  
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
          <Input className="w-[40%]" value={from} setValue={setFrom} placeholder="From" /> 
          <FaArrowRight className="text-3xl"/>
          {/* <h1 className="text-3xl">To</h1> */}
          <Input className="w-[40%]" value={to} setValue={setTo} placeholder="To" /> 
          <Button onClick={handleClick}><FaSearch className="text-xl"/></Button>
        </div>
      </div>
    </>
  )
}

export default App

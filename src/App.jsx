import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { FaArrowRight } from "react-icons/fa";
import { FaSearch } from 'react-icons/fa';
import Button from './components/button';
import Input from './components/input'
// import { RoutesClient } from "@googlemaps/routing"

import './App.css'
import LocationComponent from './components/LocationComponent';

function App() {
  const [locationInputted, setLocationInputted] = useState(false);

  return (
    <>
      <div className="w-full h-screen bg-bg">
        <div className="bg-white h-[10%] border-b-black border-b-4 mb-10 px-10 flex flex-row justify-between align-center items-center">
          <h1 className="text-3xl text-black font-bold">Loopy: Rate your route!</h1>
        </div>
        {/* {locationInputted ? null : <LocationComponent setLocationInputted={setLocationInputted}/>} */}
        <LocationComponent setLocationInputted={setLocationInputted}/>
      </div>
    </>
  )
}

export default App

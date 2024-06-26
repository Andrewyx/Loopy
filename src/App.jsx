import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { FaArrowRight } from "react-icons/fa";
import { FaSearch } from 'react-icons/fa';
import Button from './components/button';
import Input from './components/LocationInput'
// import { RoutesClient } from "@googlemaps/routing"

import './App.css'
import LocationComponent from './components/LocationComponent';
import RatingComponent from './components/RatingComponent';

function App() {
  const [locationInputted, setLocationInputted] = useState(false);

  return (
    <>
      <div className="h-screen">
        <div className="bg-white h-[10%] border-b-black border-b-4 mb-10 px-10 flex flex-row justify-between align-center items-center">
          <h1 className="text-3xl text-black font-bold">Loopy: Rate your transit route</h1>
        </div>
          <LocationComponent setLocationInputted={setLocationInputted}/>
          <RatingComponent setLocationInputted={setLocationInputted}/> 
      </div>
    </>
  )
}

export default App

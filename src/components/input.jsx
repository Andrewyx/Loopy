// import { ClassValue } from 'clsx'

import { cn } from '../lib/utils'
import React from 'react'

// type Props = {
//   className?: ClassValue
//   value: string
//   setValue: React.Dispatch<React.SetStateAction<string>>
//   placeholder: string
// }


export function Input(props) {


  function searchLocation(input) {
    async function fetchData() {
      console.log("fetching");
      const req = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.MAPS_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress'
      },
      // body: '{\n  "textQuery" : "Spicy Vegetarian Food in Sydney, Australia"\n}',
      body: JSON.stringify({
        'textQuery': input
      })});
      const resp = await req.json();
      return resp;
    }

  const timeoutId = setTimeout(() => {
    fetchData().then(resp => console.log(resp));
  }, 2000); 
    // console.log(input);

  }

  return (
    <input
      className={cn(
        'rounded-base border-2 border-black p-[10px] font-base ring-offset-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-2 outline-none transition-all',
        props.className,
      )}
      type="text"
      name="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => {
        props.setValue(e.target.value)
        searchLocation(e.target.value)
        
      }}
      aria-label={props.placeholder}
    />
  )
}
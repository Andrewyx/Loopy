'use client'

// import { ClassValue } from 'clsx'
import { ChevronDown } from 'lucide-react'

import { useEffect, useRef, useState } from 'react'

import { cn } from '../lib/utils'
import FirebaseTools from '../FirebaseTools'

// type Props = {
//   className?: ClassValue
//   question: string
//   answer: string
// }

export default function Accordion(props) {
  const [showContent, setShowContent] = useState(false)
  const [contentHeight, setContentHeight] = useState('0px')
  const contentRef = useRef(null)
  const [queried, setQueried] = useState(false)
  const [ratings, setRatings] = useState([])

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`)
    }
  }, [showContent])

  async function fetchData() {
    
  }

  function parseInfo(legs) {
    const FIREBASE = FirebaseTools.getInstance();
    // console.log(legs)
    // if(FirebaseTools.isInstaniated()) {
    //   const queryResponse = FIREBASE.getAllByBusline(leg.mode)
    //   console.log(queryResponse);
    // }
    if (FirebaseTools.isInstaniated()) {
      legs.forEach(leg => {
        // const mode = leg.mode;
        // console.log(leg.mode.replace("/","-").replace(" ","-"))
        // const query = FIREBASE.getAverageRatingsForBusline(leg.mode.replace("/","-").replace(" ","-").replace("0",""))
        const query = FIREBASE.getAllByBusline(leg.mode.replace("/","-").replace(" ","-").replace("0",""))
        query.then(resp => {
          // console.log(resp[0] !== undefined)
          if (resp[0] !== undefined) {
            if (ratings.length == 0) {
              setRatings(resp[0])
            }
          }
        })
      }) 
    }
    // const min = 1;
    // const max = 5;
    // const rand = min + Math.random() * (max - min);
    console.log(ratings)
    return(
      <div className="p-4 md:p-5 text-sm md:text-base font-bold leading-relaxed md:leading-relaxed mb-3">
        <h1>Safety: { ratings.safety }</h1>
        <h1>Reliability: { ratings.reliability }</h1>
        <h1>Overall: { ratings.overall }</h1>
        <h1>Comments:</h1>
        <p>{ ratings.comment }</p>
      </div>

    )
  }

  return (
    <div
      data-state={showContent ? 'open' : 'closed'}
      className="group rounded-base border-2 border-black shadow-base"
    >
      <button
        role="button"
        aria-expanded={showContent}
        className={cn(
          'flex w-full items-center transition-[border-radius] justify-between border-b-0 group-data-[state=closed]:rounded-base group-data-[state=open]:rounded-t-base group-data-[state=open]:border-b-2 border-b-black bg-main p-4 md:p-5 font-heading',
          props.className,
        )}
        onClick={() => {
          setShowContent(!showContent)
          // parseInfo(props.info)
          setQueried(true)
        }}
      >
        {props.header}
        <ChevronDown className="sm:ml-4 ml-3 sm:min-h-[24px] sm:min-w-[24px] group-data-[state=open]:rotate-180 group-data-[state=closed]:0 min-h-[18px] min-w-[18px] transition-transform ease-in-out" />
      </button>
      <div
        ref={contentRef}
        style={{ height: showContent ? `${contentHeight}` : '0' }}
        className="overflow-hidden rounded-b-base bg-white font-base transition-[height] ease-in-out"
      >
        <p className="p-4 md:p-5 text-sm md:text-base font-bold leading-relaxed md:leading-relaxed">
          {props.stops}
        </p>
        {showContent ? parseInfo(props.info) : null}
        {/* {queried ? } */}
      </div>
    </div>
  )
}
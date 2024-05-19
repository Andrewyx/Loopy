import { FaArrowRight, FaSearch } from "react-icons/fa";
import Button from "./button";
import { useState } from 'react'
import '../App.css';
import LocationInput from "./LocationInput";
import Accordion from "./accordion";
import { respShort, respLong } from "../parse"
import FirebaseTools from "../FirebaseTools";
// import Firebase from "../Firebase";

// const firebaseInstance = Firebase.getInstance();

export default function LocationComponent(props) {
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [routes, setRoutes] = useState([])
    const [searched, setSearched] = useState(false)

    async function fetchData() {
        const req = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Goog-Api-Key': process.env.MAPS_KEY,
                'X-Goog-FieldMask': 'routes.legs.steps.transitDetails'
            },
            body: JSON.stringify({
                "origin": {
                    "address": from
                }, "destination": {
                    "address": to
                },
                "travelMode": "TRANSIT",
                "computeAlternativeRoutes": "TRUE"
            })
        });
        return await req.json();
        
    }

    function parseData(resp) {
        const routes = resp.routes.map((route) => {
                        return route.legs.map((leg) => {
                            let cleanLegs = leg.steps.filter(value => Object.keys(value).length !== 0);
                            console.log("Route: ");
                            let newRoute = []
                            cleanLegs.map((step) => {
                                const leg = {
                                    departureStop: step.transitDetails.stopDetails.departureStop.name,
                                    arrivalStop: step.transitDetails.stopDetails.arrivalStop.name,
                                    mode: step.transitDetails.transitLine.nameShort + " " + step.transitDetails.transitLine.name,
                                }
                                newRoute.push(leg);
                            });
                            return newRoute; })
                    });
        return routes
    }    

    function handleClick() {
        fetchData().then((resp) => {
            const cleaned = parseData(resp);
            setRoutes(cleaned);
            props.setLocationInputted(true);
        }).then(() => setSearched(true));

        // // temporary response
        // // console.log(resp)
        // // const cleaned = parseData(respShort);
        // const cleaned = parseData(respLong);
        // setRoutes(cleaned);
        // // props.setLocationInputted(true);
        // setSearched(true);
    }

    function parseAccordionHeader(legs) {
      const buses = []
      legs.forEach(leg => {
        if (leg.mode.includes("undefined")) {
          buses.push(leg.mode.split(" ")[1] + " line")
        } else {
          buses.push(leg.mode)
        }
      });
      return buses.join(" ➞ ");
    } 

    function parseBody(legs) {
      const stops = [];
      legs.forEach(leg => {
        stops.push(leg.departureStop + " ➞ " + leg.arrivalStop)
      })
      return stops.join("   | Transfer to |   ");
      // return stops;
    }

    return (
        <>
            <div className="w-3/4 mx-auto mb-10 flex flex-row p-5 items-start align-center justify-evenly">
                <LocationInput className="w-1/3" valuee={from} setValue={setFrom} placeholder="From" />
                <FaArrowRight className="pt-1 text-center text-5xl" />
                <LocationInput className="w-1/3" value={to} setValue={setTo} placeholder="To" />
                <Button onClick={handleClick}><FaSearch className="text-xl" /></Button>
            </div>
            {searched ?
                <div className="w-3/4 mx-auto p-5 pb-10 border-black border-4 rounded-lg bg-white flex flex-col items-center space-y-5">
                    <h1 className="font-bold text-black text-2xl p-3 self-start">Available Routes</h1>
                    {routes.map((route,index) => {
                        const header = parseAccordionHeader(route[0]);
                        const stops = parseBody(route[0]);
                        // const info = parseInfo(route[0]);
                        return (
                          <div key={index} className="w-3/4 mx-auto">
                            <Accordion
                            className="text-left"
                            header={header}
                            stops={stops}
                            info={route[0]}/>
                          </div>
                        )
                    })}
                </div>
                : null}
        </>
    )
}
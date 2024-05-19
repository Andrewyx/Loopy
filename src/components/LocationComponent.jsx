import { FaArrowRight, FaSearch } from "react-icons/fa";
import Button from "./button";
import { useState } from 'react'
import '../App.css';
import Input from "./input";
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
                                // console.log(step.transitDetails.stopDetails.departureStop.name);
                                // console.log(step.transitDetails.stopDetails.arrivalStop.name);
                                // console.log(step.transitDetails.transitLine.name + " " + step.transitDetails.transitLine.nameShort);
                                // console.log()
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
    }
    return (
        <>
            <div className="w-3/4 mx-auto flex flex-row p-5 items-start align-center justify-evenly">
                <Input className="w-1/3" valuee={from} setValue={setFrom} placeholder="From" />
                <FaArrowRight className="pt-1 text-center text-5xl" />
                <Input className="w-1/3" value={to} setValue={setTo} placeholder="To" />
                <Button onClick={handleClick}><FaSearch className="text-xl" /></Button>
            </div>
            {searched ?
                <div className="w-3/4 mx-auto border-black border-4 rounded-lg bg-white">
                    <h1 className="font-bold text-black">Routes</h1>
                    {routes.map((route) => {
                        console.log(route);
                         return route[0].map((leg,index) => {
                          return(
                            <div key={index} className="">
                              <h1>{ leg.departureStop } - {leg.arrivalStop} ({leg.mode})</h1>
                            </div>
                          )
                        })
                    })}
                </div>
                : null}
        </>
    )
}
import FirebaseTools from "../FirebaseTools";
import Button from "./button";
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import * as papa from 'papaparse'
import { Lines } from "../Lines";

export default function RatingComponent(props) {

    // const [lines, setLines] = useState([])
    const options = [];

    useEffect(() => {
        fetch("Lines.csv")
        .then(resp => resp.text())
        .then(result => {
            const lines = [];
            const data = papa.parse(result);
            data.data.forEach((entry) => lines.push(entry[0] + " " + entry[1]));
            return lines
            // console.log(lines.slice(1));
        })
        .then(lines => {
            lines.slice(1,-1).forEach((line) => options.push({
                value: line,
                label: line,
            }))
        });
    },[])


    const FIREBASE = FirebaseTools.getInstance();
    function handleSubmit(e) {
        e.preventDefault();
  
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        const safetyRating = formJson.safety;
        const reliabilityRating = formJson.reliability;
        const commentRating = formJson.comment;
        const busRouteString = formJson.busnumber; 
        const overallRating = formJson.overall;

        if (typeof parseInt(safetyRating) !== "number" || typeof parseInt(reliabilityRating) !== "number" 
        || typeof parseInt(overallRating) !== "number" || typeof commentRating !== "string"|| typeof busRouteString !== "string") {
            console.log("Invalid ID Type");
            parseInt("dsa");
            return false;
        }

        if (FirebaseTools.isInstaniated()) {
            FIREBASE.writeNewRatingToBusline(
                {
                    busline: busRouteString,
                    comment: commentRating,
                    safety: parseInt(safetyRating),
                    reliability: parseInt(reliabilityRating),
                    overall: parseInt(overallRating)
                }, 
                busRouteString.toString()
            );

            FIREBASE.getAverageRatingsForBusline(busRouteString).then((averages) => console.log(averages));
        }
    }

    return (
        <>
            <div className="w-3/4 mx-auto my-10 bg-white border-black border-4 rounded-lg p-5">
                <h1 className="text-black font-bold text-3xl py-3">Rate a bus line</h1>    
                <form onSubmit={handleSubmit} id="mainForm">
                    <div className="py-3">
                        <h1 className="text-black font-bold text-lg mb-1">Bus line</h1>
                        {/* <input className="border-2 border-black rounded-lg" name="busnumber" placeholder=" Bus Number"></input> */}
                    <Select
                        className="w-1/2 border-black border-2 rounded-lg"
                        classNamePrefix="select"
                        isClearable={true}
                        isSearchable={true}
                        name="busnumber"
                        options={Lines}
                    />
                    </div>
                    <div className="py-3">
                        <h1 className="text-black font-bold text-lg mb-1">Safety</h1>
                        <input className="border-2 border-black rounded-lg" name="safety" placeholder=" Rating out of 10"></input>
                    </div>
                    <div className="py-3">
                        <h1 className="text-black font-bold text-lg mb-1">Reliability</h1>
                        <input className="border-2 border-black rounded-lg" name="reliability" placeholder=" Rating out of 10"></input>
                    </div>
                    <div className="py-3">
                        <h1 className="text-black font-bold text-lg mb-1">Overall</h1>
                        <input className="border-2 border-black rounded-lg" name="overall" placeholder=" Rating out of 10"></input>
                    </div>
                    <div className="py-3">
                        <h1 className="text-black font-bold text-lg mb-1">Comments</h1>
                        {/* <input className="border-2 border-black rounded-lg w-1/2" name="comment" type="" placeholder=" Type your comments here..."></input> */}
                        <textarea className="border-2 border-black rounded-lg w-1/2" name="comment" form="mainForm" placeholder=" Enter your comments here..."></textarea>
                    </div>
                    <Button className="mt-3" type="submit">Submit</Button>
                </form>
            </div>
        </>
    )
}
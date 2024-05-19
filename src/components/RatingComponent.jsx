import { useState } from "react";
import Input from "./input";
import FirebaseTools from "../FirebaseTools";

export default function RatingComponent(props) {
    const FIREBASE = FirebaseTools.getInstance();
    function handleSubmit(e) {
        e.preventDefault();
  
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());

        const safetyRating = formJson.safety;
        const reliabilityRating = formJson.reliability;
        const commentRating = formJson.comment;
        const busNumber = formJson.busnumber; 

        if (typeof parseInt(safetyRating) !== "number" || typeof parseInt(reliabilityRating) !== "number" 
        || typeof commentRating !== "string"|| typeof busNumber !== "string") {
            console.log("Invalid ID Type");
            parseInt("dsa");
            return false;
        }

        if (FirebaseTools.isInstaniated()) {
            FIREBASE.writeNewBusline(busNumber.toString());
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input className="ratingInput" name="safety" placeholder="Safety Rating"></input>
                <input className="ratingInput" name="reliability" placeholder="Reliability Rating"></input>
                <input className="ratingInput" name="busnumber" placeholder="Bus Number"></input>
                {/* ADD AUTOCOMPLETE */}
                <input className="ratingInput" name="comment" placeholder="Comment"></input>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
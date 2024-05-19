import Input from "./input";

export default function RatingComponent(props) {
    
    function handleSubmit() {

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input className="w-1/3" value={from} setValue={setFrom} placeholder="From" />
                <button type="Submit">Submit</button>
            </form>
            <button onClick={() => props.setLocationInputted(false)}>Back</button>
        </>
    )
}
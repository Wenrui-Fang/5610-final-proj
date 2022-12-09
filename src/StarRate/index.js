// Star rating
import Star from "./Star";
import React from "react";

export let starNum;

function StarRating(props) {
    // Display score
    const [rating, setRating] = React.useState(
        typeof props.rating == "number" ? props.rating : 0
    );
    // mouseover effect
    const [selection, setSelection] = React.useState(0);
    const hoverOver = event => {
        let val = 0;
        if (event && event.target && event.target.getAttribute("star-id"))
            val = event.target.getAttribute("star-id");
        setSelection(val);
    };
    const setStar = (event) => {
        setRating(event.target.getAttribute("star-id") || rating)
        starNum = event.target.getAttribute("star-id") || rating
    }
    return (
        <div
            // mouseover effect
            onMouseOut={() => hoverOver(null)}
            // Click to select score
            onClick={event => setStar(event)}
            onMouseOver={hoverOver}
        >
            {/*Create 5 stars components*/}
            {Array.from({length: 5}, (v, i) => (
                <Star
                    starId={i + 1}
                    key={`star_${i + 1} `}
                    marked={selection ? selection >= i + 1 : rating >= i + 1}
                />
            ))}
        </div>
    );
}

export default StarRating;
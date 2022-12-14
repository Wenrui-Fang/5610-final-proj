// Star rating
import Star from '../StarRate/Star';
import React from "react";

function StarRatingPlain(props) {
    return (
        <div>
            {/*Create 5 stars components*/}
            {Array.from({length: 5}, (v, i) => (
                <Star
                    starId={i + 1}
                    key={`star_${i + 1} `}
                    marked={props.rating >= i + 1}
                />
            ))}
        </div>
    );
}

export default StarRatingPlain;
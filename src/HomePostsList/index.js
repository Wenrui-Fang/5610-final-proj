import React from "react";
import PostItem from "./PostItem";

const HomePostsList = (props) => {
    let businessesData = []
    let loggedIn = props.login
    if(props.businessesData && props.businessesData.length) {
        businessesData = props.businessesData
    }
    return (
        <>
            <h2 className="fw-bolder mt-5 mb-5 text-center">
                Your Next Review Awaits
            </h2>
            <ul className="list-inline">
                {
                    businessesData.map(business =>
                        <PostItem business={business}/>)
                }
            </ul>
        </>

    );
};
export default HomePostsList;


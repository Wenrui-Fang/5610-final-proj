import React from "react";
import businessArray from './business.json';
// import {useDispatch, useSelector} from "react-redux";
import PostItem from "./PostItem";
// import {findTuitsThunk} from "../../services/tuits-thunks";

const HomePostsList = () => {
    // const {tuits, loading} = useSelector(state => state.tuitsData)
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(findTuitsThunk())
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
    return (
        <>
            <h2 className="fw-bolder mt-5 mb-5 text-center">
                Your Next Review Awaits
            </h2>
            <ul className="list-inline">
                {/*{*/}
                {/*    loading &&*/}
                {/*    <li className="list-group-item">*/}
                {/*        Loading...*/}
                {/*    </li>*/}
                {/*}*/}
                {
                    businessArray.map(business =>
                        <PostItem key={business._id} business={business}/>)
                }
            </ul>
        </>

    );
};
export default HomePostsList;


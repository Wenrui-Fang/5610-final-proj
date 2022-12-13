import React, {useEffect, useState} from "react";
import {Button, Icon, Stack} from "@chakra-ui/react";
import { BsStar } from "react-icons/bs";
import './index.css';
import StarRating from "../StarRate";
import * as yelpService from "../services/officialyelp/yelp-api"
import * as reviewService from "../services/ReviewService";
import {useParams, Link} from "react-router-dom";
import {getReviewsByBusinessId} from "../services/ReviewService";
import ReviewList from "../ReviewList/ReviewList";

const DetailComponent = () => {

    const {businessId} = useParams();
    const [business, setBusiness] = useState({
                                             });
    const [reviews, setReviews] = useState({});
    useEffect(() => {
       try{
           const getBusiness = async() => await yelpService.findBusinessById(businessId)
               .then(bus => setBusiness(bus));
           let bus = getBusiness();
           console.log(businessId);
           const getReviews = async() => await getReviewsByBusinessId(businessId)
               .then(reviews =>
                     {
                         console.log(reviews);
                         setReviews(reviews)

                     });
           let review = getReviews();
           console.log(reviews[0]);
       } catch (e){

       }
    },[]);


    // let startStr = business.hours?business.hours[0].open[3].start.toString():undefined;
    // let startTime = startStr===undefined?undefined:startStr.substring(0,2) + ":" + startStr.substring(2);
    // let endStr = business.hours?business.hours[0].open[3].end.toString():undefined;
    // let endTime = endStr===undefined?undefined:endStr.substring(0,2) + ":" + endStr.substring(2);

    const getTime = (str) => {
        return str.substring(0,2) + ":" + str.substring(2);
    }

    return (
        <>
            <h1>Detail Screen</h1>
            <div className="photoHeader mb-2 position-relative">
                <div className="flex-container">
                    {
                        business.photos && business.photos.map(photo => {return(<img className="headerPicture "
                                                                                     src={`${photo}`} />)})
                    }
                    {
                        business.photos && business.photos.map(photo => {return(<img className="headerPicture "
                                                                                     src={`${photo}`} />)})
                    }
                    {
                        business.photos && business.photos.map(photo => {return(<img className="headerPicture "
                                                                                     src={`${photo}`} />)})
                    }

                </div>
                <div className="front-shadow header-margin" ></div>
                <div className="info-overlay position-absolute">
                    <span className="business-name">{business.name}</span>
                    <StarRating props={business} />
                    <div>
                        <b>
                            {business.is_claimed && <span className="claimedStyle"><i className="bi bi-patch-check-fill"/> Claimed · </span>}
                            {!business.is_claimed && <span className="text-white">Unclaimed <i className="bi bi-exclamation-circle"/> · </span>}
                            {business.price && <span className="text-white">{business.price} · </span>}
                            {business.categories && business.categories.map(cate => {return(<span className="text-white">{cate.title}, </span>)})}
                        </b>
                    </div>
                    <div>

                        {business.is_closed&& <span className="text-red">Closed </span>}
                        {!business.is_closed&& <span className="text-red">Opening </span>}
                        {/*{*/}
                        {/*    startTime&&endTime&&<b><span className="text-white">{startTime} AM - {endTime} PM</span></b>*/}
                        {/*}*/}

                    </div>
                </div>
            </div>

            <div className="container">
                <div className="sub-info">
                    <Stack direction='row' spacing={2}>
                        <Link to={`/review/${business.name}/${businessId}`}>
                            <Button leftIcon={<Icon as={BsStar} />} colorScheme='red' variant='solid'>
                                Write a reivew
                            </Button>
                        </Link>
                        <Button leftIcon={<Icon as={BsStar} />} colorScheme='gray' variant='outline'>
                            Save
                        </Button>
                    </Stack>
                    <div>
                        {/*<ReviewList reviews={reviews}/>*/}
                    </div>
                    <div>
                        <div className="float-end">
                            <span className="subtitle">Hours</span>
                            <table className="hourTable">
                                <tbody>
                                <tr>
                                    <td className="td-width">Mon</td>
                                    {/*<td className="">{getTime(business.hours[0].open[0].start.toString())} AM - {getTime(business.hours[0].open[0].end.toString())} PM</td>*/}
                                </tr>
                                <tr>
                                    <td className="td-width">Tue</td>
                                    <td>Closed</td>
                                </tr>
                                <tr>
                                    <td className="td-width">Wed</td>
                                    <td>Closed</td>
                                </tr>
                                <tr>
                                    <td className="td-width">Thu</td>
                                    <td>Closed</td>
                                </tr>
                                <tr>
                                    <td className="td-width">Fri</td>
                                    <td>Closed</td>
                                </tr>
                                <tr>
                                    <td className="td-width">Sat</td>
                                    <td>Closed</td>
                                </tr>
                                <tr>
                                    <td className="td-width">Sun</td>
                                    <td>Closed</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
};
export default DetailComponent;
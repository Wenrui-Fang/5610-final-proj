import React, {useEffect, useState} from "react";
import {Button, Icon, Stack} from "@chakra-ui/react";
import { BsStar } from "react-icons/bs";
import './index.css';
import StarRating from "../StarRate";
import * as yelpService from "../services/officialyelp/yelp-api"
import * as reviewService from "../services/ReviewService";
import * as service from "../services/follow-service";
import {useParams, Link} from "react-router-dom";
import {getReviewsByBusinessId} from "../services/ReviewService";
import ReviewList from "../ReviewList/ReviewList";

const DetailComponent = () => {

    const {businessId} = useParams();
    const [business, setBusiness] = useState({});
    const [reviews, setReviews] = useState([]);
    const [address,setAddress] = useState({});

    useEffect(() => {
       try{
           const getBusiness = async() => await yelpService.findBusinessById(businessId)
               .then((bus) => setBusiness(bus));
           let bus = getBusiness();
           const getReviews = async() => await reviewService.getReviewsByBusinessId(businessId)
               .then((reviews)=>setReviews(reviews));
           let review = getReviews();
       } catch (e){

       }
    },[]);

    return (
        <>
            <h1>Detail Screen</h1>
            <div className="photoHeader mb-3 position-relative">
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
                    <StarRating rating={business.rating} />
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
                    </div>
                </div>
            </div>

            <div className="container d-flex">
                <div className="sub-info col-9 col-sm-8">
                    <Stack direction='row' spacing={2} >
                        <Link to={`/review/${business.name}/${businessId}`}>
                            <Button leftIcon={<Icon as={BsStar} />} colorScheme='red' variant='solid'>
                                Write a reivew
                            </Button>
                        </Link>
                        <Button leftIcon={<Icon as={BsStar} />} colorScheme='gray' variant='outline'>
                            Save
                        </Button>
                    </Stack>
                    <hr className="mt-3"/>
                    <div className="mt-3">
                        { reviews && <ReviewList reviews={reviews}/> }
                    </div>
                </div>
                <div className="col-3 float-end ms-5 mt-3">
                    <ul className="list-group">
                        <li className="list-group-item">
                            {business.display_phone}
                            <i className="bi bi-telephone float-lg-end"/>
                        </li>
                        <li className="list-group-item">
                            <a href={`https://www.yelp.com/map/${business.alias}`} className="wd-link"><p className="fw-bold">Get direction</p></a>
                            {/*{business&&business.location.display_address.join(' ')}*/}
                            <i className="bi bi-map float-lg-end"/>
                        </li>
                    </ul>
                </div>
            </div>


        </>

    );
};
export default DetailComponent;
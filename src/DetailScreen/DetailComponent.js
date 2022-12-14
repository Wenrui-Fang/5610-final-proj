import React, {useEffect, useState} from "react";
import './index.css';
import StarRatingPlain from "../StarRatePlain";
import * as yelpService from "../services/officialyelp/yelp-api"
import * as reviewService from "../services/ReviewService";
import {useParams, Link} from "react-router-dom";
import ReviewList from "../ReviewList/ReviewList";
import { userBookmarkedBusinessOrNot, userBookmarkBusiness, userDeleteBookmarkedBusiness } from "../services/bookmark-service";

const DetailComponent = () => {

    const {businessId, userId} = useParams();
    const [business, setBusiness] = useState({});
    const [reviews, setReviews] = useState([]);
    const [bookmarkedFlag, setBookmarkedFlag] = useState(false);

    useEffect(() => {
       try{
           const getBusiness = async() => await yelpService.findBusinessById(businessId)
               .then((bus) => setBusiness(bus));
           let bus = getBusiness();
           const getReviews = async() => await reviewService.getReviewsByBusinessId(businessId)
               .then((reviews)=>setReviews(reviews));
           let review = getReviews();
           const getBookmarkedFlag = async() => await userBookmarkedBusinessOrNot(userId, businessId)
               .then(response => setBookmarkedFlag(!!response));
            let bFlag = getBookmarkedFlag();
       } catch (e){

       }
    },[]);

    const bookmarkBusiness = async () => {
        userBookmarkBusiness(userId, businessId)
            .then(data => setBookmarkedFlag(true))
            .catch(e => console.log(e));
    }

    const deleteBookmark = async () => {
        userDeleteBookmarkedBusiness(userId, businessId)
            .then(data => setBookmarkedFlag(false))
            .catch(e => console.log(e));
    }

    return (
        <>
            <div className="photoHeader mb-3 position-relative">
                <div className="flex-container">
                    {
                        business.photos && business.photos.map(photo => {return(<img key={photo} className="headerPicture "
                                                                                     src={`${photo}`} />)})
                    }
                    {
                        business.photos && business.photos.map(photo => {return(<img key={photo} className="headerPicture "
                                                                                     src={`${photo}`} />)})
                    }
                    {
                        business.photos && business.photos.map(photo => {return(<img key={photo} className="headerPicture "
                                                                                     src={`${photo}`} />)})
                    }

                </div>
                <div className="info-overlay position-absolute">
                    <span className="business-name">{business.name}</span>
                    <StarRatingPlain rating={business.rating} />
                    <div>
                        <b>
                            {business.is_claimed && <span className="claimedStyle"><i className="bi bi-patch-check-fill"/> Claimed · </span>}
                            {!business.is_claimed && <span className="text-white">Unclaimed <i className="bi bi-exclamation-circle"/> · </span>}
                            {business.price && <span className="text-white">{business.price} · </span>}
                            {business.categories && business.categories.map(cate => {return(<span className="text-white" key={cate.title}>{cate.title}, </span>)})}
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
                    <div>
                        <Link to={`/review/${business.name}/${businessId}`}>
                            <button type="button" className="btn btn-danger">
                                <i className="bi bi-star me-2"/><span>Write a reivew</span>
                            </button>
                        </Link>
                        {bookmarkedFlag && <button type="button" className="btn btn-dark border-1 ms-3" onClick={deleteBookmark}>
                            <i className="bi bi-bookmark me-2"/><span>Delete</span>
                        </button>}

                        {!bookmarkedFlag && <button type="button" className="btn btn-light border-1 ms-3" onClick={bookmarkBusiness}>
                            <i className="bi bi-bookmark me-2"/><span>Save</span>
                        </button>}
                    </div>
                    <hr className="mt-3"/>
                    <div className="mt-3">
                        { reviews && <ReviewList reviews={reviews}/> }
                    </div>
                </div>
                <div className="col-3 d-none d-xl-block float-end ms-5 mt-3">
                    <ul className="list-group">
                        <li className="list-group-item">
                            {business.display_phone}
                            <i className="bi bi-telephone float-lg-end"/>
                        </li>
                        <li className="list-group-item">
                            <a href={`https://www.yelp.com/map/${business.alias}`} className="wd-link"><p className="fw-bold">Get direction</p></a>
                            {business && business.location && business.location.display_address &&  business.location.display_address.map(addressLine => <p key={business.id + addressLine}>{addressLine}</p>)}
                            <i className="bi bi-map float-lg-end"/>
                        </li>
                    </ul>
                </div>
            </div>


        </>

    );
};
export default DetailComponent;
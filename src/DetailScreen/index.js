import React, {useEffect, useState} from "react";
import {Button, Icon, Stack} from "@chakra-ui/react";

import { BsStar } from "react-icons/bs";
import './index.css';
import StarRating from "../StarRate";
import * as yelpService from "../services/officialyelp/yelp-api"
import {useParams, Link} from "react-router-dom";

const DetailComponent = () => {

    const {businessId} = useParams();
    const [business, setBusiness] = useState({
                                                 "id": "6I28wDuMBR5WLMqfKxaoeg",
                                                 "alias": "pike-place-chowder-seattle",
                                                 "name": "Pike Place Chowder",
                                                 "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/ZyQjV-wJQ2GHyX7l3jfbyg/o.jpg",
                                                 "is_claimed": false,
                                                 "is_closed": false,
                                                 "url": "https://www.yelp.com/biz/pike-place-chowder-seattle?adjust_creative=moTah-sZXPH7mohl5JGWhw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=moTah-sZXPH7mohl5JGWhw",
                                                 "phone": "+12062672537",
                                                 "display_phone": "(206) 267-2537",
                                                 "review_count": 8528,
                                                 "categories": [
                                                     {
                                                         "alias": "seafood",
                                                         "title": "Seafood"
                                                     },
                                                     {
                                                         "alias": "soup",
                                                         "title": "Soup"
                                                     }
                                                 ],
                                                 "rating": 4.5,
                                                 "location": {
                                                     "address1": "1530 Post Aly",
                                                     "address2": "Ste 11",
                                                     "address3": "",
                                                     "city": "Seattle",
                                                     "zip_code": "98101",
                                                     "country": "US",
                                                     "state": "WA",
                                                     "display_address": [
                                                         "1530 Post Aly",
                                                         "Ste 11",
                                                         "Seattle, WA 98101"
                                                     ],
                                                     "cross_streets": "Pike Pl & Pine St"
                                                 },
                                                 "coordinates": {
                                                     "latitude": 47.60939,
                                                     "longitude": -122.34112
                                                 },
                                                 "photos": [
                                                     "https://s3-media1.fl.yelpcdn.com/bphoto/ZyQjV-wJQ2GHyX7l3jfbyg/o.jpg",
                                                     "https://s3-media3.fl.yelpcdn.com/bphoto/ijju-wYoRAxWjHPTCxyQGQ/o.jpg",
                                                     "https://s3-media1.fl.yelpcdn.com/bphoto/9SH1ddW7ZpOM_dZupD7VlQ/o.jpg"
                                                 ],
                                                 "price": "$$",
                                                 "hours": [
                                                     {
                                                         "open": [
                                                             {
                                                                 "is_overnight": false,
                                                                 "start": "1100",
                                                                 "end": "1700",
                                                                 "day": 0
                                                             },
                                                             {
                                                                 "is_overnight": false,
                                                                 "start": "1100",
                                                                 "end": "1700",
                                                                 "day": 1
                                                             },
                                                             {
                                                                 "is_overnight": false,
                                                                 "start": "1100",
                                                                 "end": "1700",
                                                                 "day": 2
                                                             },
                                                             {
                                                                 "is_overnight": false,
                                                                 "start": "1100",
                                                                 "end": "1700",
                                                                 "day": 3
                                                             },
                                                             {
                                                                 "is_overnight": false,
                                                                 "start": "1100",
                                                                 "end": "1700",
                                                                 "day": 4
                                                             },
                                                             {
                                                                 "is_overnight": false,
                                                                 "start": "1100",
                                                                 "end": "1700",
                                                                 "day": 5
                                                             },
                                                             {
                                                                 "is_overnight": false,
                                                                 "start": "1100",
                                                                 "end": "1700",
                                                                 "day": 6
                                                             }
                                                         ],
                                                         "hours_type": "REGULAR",
                                                         "is_open_now": false
                                                     }
                                                 ],
                                                 "transactions": [
                                                     "delivery",
                                                     "pickup"
                                                 ]
                                             });
    useEffect(() => {
       // try{
       //     console.log(businessId);
       //     const getBusiness = async() => await yelpService.findBusinessById(businessId)
       //         .then(bus => setBusiness(bus));
       //     let bus = getBusiness();
       // } catch (e){
       //
       // }
    });


    let startStr = business.hours[0].open[3].start.toString();
    let startTime = startStr.substring(0,2) + ":" + startStr.substring(2);
    let endStr = business.hours[0].open[3].end.toString();
    let endTime = endStr.substring(0,2) + ":" + endStr.substring(2);
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
                        <b><span className="text-white">{startTime} AM - {endTime} PM</span></b>
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
                    <div className="col-10 col-md-10 col-lg-7 col-xl-6 flex-container"
                         style={{"position": "relative"}}>
                        <div>
                            Float left
                        </div>
                        <div className="mt-2 col-2 col-md-2 col-lg-1 col-xl-2 float-end">
                            <span className="subtitle">Hours</span>
                            <table className="hourTable">
                                <tbody>
                                <tr>
                                    <td className="td-width">Mon</td>
                                    <td>Closed</td>
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
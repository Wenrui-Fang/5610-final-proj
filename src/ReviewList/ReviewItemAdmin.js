import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const ReviewItem = ({item,deleteReview}) => {

    const [business, setBusiness] = useState([])
    const searchUrl = 'https://www.omdbapi.com/?apikey=b2bd5979&i='+ item.to;

    useEffect(() => {
        async function search()  {
            const response = await axios.get(`${searchUrl}`)
            setBusiness(response.data)
        }
        search();
    }, [])


    return (
        <>
            <li className="list-group-item">
                <div className="row">

                    <div className="col-3 d-md-block d-sm-none d-none">

                        <Link to={`/details/${movies.imdbID}`} className="wd-gold">
                        <img className="wd-poster wd-section-left" src={business.Poster} alt=""/>
                            <p className="wd-business wd-gold">{business.Title}</p></Link>
                    </div>


                    <div className="col-9 col-sm-8">

                        {/*<i className="fa fa-solid fa-star wd-gold">*/}
                        {/*    <span className="fw-bold wd-white"> {item.rating}/10</span></i>*/}
                        <i className="fas fa-star" style={{color:'#F5DE50'}}> </i> {item.rating}/10

                        <i className="fas fa-times-circle float-end wd-gold fa-2x" onClick={() => deleteReview(item._id)}/>


                        <p className="mt-3">"{item.review}"</p>
                        <p className="wd-white wd-signin">by.<Link to={`/profile/${item.from}`} className="wd-white" ><span className="fst-italic">{item.from}</span></Link></p>
                        <p className="wd-right me-1">{item.postedOn.substring(
                                0, 10)}</p>




                    </div>

                </div>
            </li>
        </>
    );
}
export default ReviewItem;
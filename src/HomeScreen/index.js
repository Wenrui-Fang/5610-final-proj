import React, {useState} from "react";
import "./home.css"
import HomePostsList from "../HomePostsList";
import {Link} from "react-router-dom";
import * as authService from "../services/auth-service.js"
import * as api from "../services/officialyelp/yelp-api.js"
import {useAddress} from "../services/GetUserAddress/GetAddress.js";

const HomeComponent = () => {
    let loggedIn = false
    const [addressData, setAddressData] = useState({})
    const [businessesData, setBusinessesData] = useState({})
    const [currentUser, setCurrentUser] = useState({});
    const getProfile = async () => await authService.profile()
        .then(user => setCurrentUser(user));
    let user = getProfile();
    // console.log(currentUser)
    loggedIn = currentUser.username !== undefined;


    // https://developer.mapquest.com/documentation/geocoding-api/reverse/get
    // Get user's current location and get restaurants near the address
    const useAddressData = async () => await useAddress().then(data => setAddressData(data));
    let address = useAddressData()
    // console.log(addressData)
    const fetchData = async () => {
        try {
            const resp = await api.findBusinesses(addressData);
            // console.log(resp.businesses)
            setBusinessesData(resp.businesses)
        } catch (e) {
            console.error(e);
        }
    };
    let business = fetchData();

    return (
        <>
            <div className="wd-home_banner position-relative">
                <div className="row pt-3">
                    <div className="col-3">
                        <Link to="/" className="text-decoration-none">
                            <h1 className="ps-3 fw-bolder text-white">
                                Yelp
                                <i className="bi bi-yelp text-danger ms-2"></i>
                            </h1>
                        </Link>
                    </div>
                    <div className="col-6 pt-1">
                        <div className="row">
                            <div className="col-10 pe-0">
                                <input placeholder="Search Yelp" className="form-control ps-4"/>
                            </div>
                            <div className="col-2 ps-0">
                                <button className="btn btn-warning float-start">
                                    <i className="bi bi-search fw-bolder"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 pt-1">
                        <h3 className="text-white float-end pe-5">
                            <button className="btn border-0 text-white me-2 fw-bolder">
                                Write a review
                            </button>
                            {!loggedIn &&
                                <>
                                    <button className="btn btn-outline-light me-2 fw-bolder">
                                        <Link to="/login" className="text-decoration-none text-white">Log In</Link>
                                    </button>
                                    <button className="btn btn-danger fw-bolder">
                                        <Link to="/signup" className="text-decoration-none text-white">Sign Up</Link>
                                    </button>
                                </>
                            }
                            {loggedIn &&
                                <>
                                    <Link to={`/profile/${currentUser.username}`}
                                          className="text-decoration-none text-white">
                                        <i className="bi bi-person-circle fs-2"></i>
                                    </Link>
                                </>
                            }
                        </h3>
                    </div>
                </div>
                <h1 className="text-white position-absolute wd-align-center">
                    Welcome to Yelp!
                </h1>
            </div>
            <div className="container">
                <HomePostsList businessesData={businessesData}/>
            </div>
        </>
    );
};
export default HomeComponent;

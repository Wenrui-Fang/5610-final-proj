import React from "react";
import "./home.css"
import HomePostsList from "../HomePostsList";

const HomeComponent = () => {
    const loggedIn = false
    return (
        <>
            <div className="wd-home_banner position-relative">
                <div className="row pt-3">
                    <div className="col-3">
                        <h1 className="ps-3 fw-bolder text-white">Yelp
                            <i className="bi bi-yelp text-danger ms-2"></i>
                        </h1>
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
                                        Log In
                                    </button>
                                    <button className="btn btn-danger fw-bolder">
                                        Sign Up
                                    </button>
                                </>
                            }
                            {loggedIn &&
                                <>
                                    <i className="bi bi-person-circle fs-2"></i>
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
                <HomePostsList/>
            </div>
        </>
    );
};
export default HomeComponent;

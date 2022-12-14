import {Link, useNavigate} from "react-router-dom";
import * as service from "../../services/auth-service";
import React, {useState} from "react";

function Login() {
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate();
    const login = () => {
        service.login(loginUser)
            .then((user)=>navigate("/"))
            .catch(e => alert(e));
    }

    return (
        <div>
            <div className="login-banner bg-danger">
                <Link to="/" className="text-decoration-none">
                    <h1 className="fw-bolder text-white text-center pt-1">
                        Yelp
                        <i className="bi bi-yelp ms-2"></i>
                    </h1>
                </Link>
            </div>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12 col-md-6 col-lg-6 col-xl-6 flex-container"
                         style={{"position": "relative"}} >
                        <div className="signup-form-container">
                            <div className="header">
                                <h2 className="login-title text-danger fw-bold">Login in to Yelp</h2>
                                <p className="subheading"><b>New to Yelp?</b> <a className="no-decoration" href="/signup">Sign up</a></p>
                                <p className="legal-copy">By logging in, you agree to Yelp's
                                 <a className="legal-link no-decoration"
                                       href="https://www.yelp.com/static?p=tos"> Terms of Service</a> and
                                    <a className="legal-link no-decoration"
                                       href="https://www.yelp.com/tos/privacy_policy"> Privacy
                                        Policy</a></p>
                            </div>
                            <div className="mt-2">
                                <input className="mb-2 form-control"
                                       onChange={(e) =>
                                           setLoginUser({...loginUser, username: e.target.value})}
                                       placeholder="username"/>
                                <input className="mb-2 form-control"
                                       onChange={(e) =>
                                           setLoginUser({...loginUser, password: e.target.value})}
                                       placeholder="password" type="password"/>
                                <button onClick={login}
                                        className="btn btn-danger btn-width">Login
                                </button>
                            </div>
                            <div className="sub-text-box">
                                <small>New to yelp? <a className="no-decoration" href="/signup">Sign up</a></small>
                            </div>
                        </div>

                    </div>
                    <div className="d-none d-md-block col-6 col-md-6 col-lg-5 col-xl-6">
                        <div className="picture-container">
                            <img src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png" width={300}/>
                        </div>
                    </div>
               </div>
            </div>
        </div>
    );
}

export default Login;
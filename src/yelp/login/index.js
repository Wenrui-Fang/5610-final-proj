import {useNavigate} from "react-router-dom";
import * as service from "../../services/auth-service";
import {useState} from "react";

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
                Yelp
            </div>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-10 col-md-10 col-lg-7 col-xl-6 flex-container"
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
                            <div>
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
                    <div className="col-2 col-md-2 col-lg-1 col-xl-2">
                        <div className="picture-container">
                            <img src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png"/>
                        </div>
                    </div>
               </div>
            </div>
        </div>
    );
}

export default Login;
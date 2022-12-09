import {useNavigate} from "react-router-dom";
import * as service from "../../services/auth-service";
import {useState} from "react";

function Signup() {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();
    const signup = () => {
        const user = {
            ...newUser,
            joined: (new Date()).getDate().toString(),
            followings: 0,
            followers: 0
        }
        service.signup(user)
            .then(()=>navigate(`/profile/${user.username}`))
            .catch(e => alert(e));
    }

    return (
        <div>
            <div className="login-banner bg-danger">
                Yelp
            </div>
            <div className="container">
                <div className="row mt-5 mb-5">
                    <div className="col-10 col-md-10 col-lg-7 col-xl-6 flex-container"
                         style={{"position": "relative"}} >
                        <div className="signup-form-container">
                            <div className="header">
                                <h2 className="login-title text-danger fw-bold">Sign Up for Yelp</h2>
                                <p className="subheading"><b>Connect with great local businesses</b></p>
                                <p className="legal-copy">By continuing, you agree to Yelp’s
                                    <a className="legal-link no-decoration"
                                       href="https://www.yelp.com/static?p=tos"> Terms of Service</a> and
                                    <a className="legal-link no-decoration"
                                       href="https://www.yelp.com/tos/privacy_policy"> Privacy
                                        Policy</a></p>
                            </div>
                            <div>
                                <input className="mb-2 form-control" placeholder="First Name"
                                        onChange={(e) =>
                                            setNewUser({...newUser, firstName: e.target.value})}/>
                                <input className="mb-2 form-control" placeholder="Last Name"
                                       onChange={(e) =>
                                           setNewUser({...newUser, lastName: e.target.value})}/>
                                <input className="mb-2 form-control"
                                       onChange={(e) =>
                                           setNewUser({...newUser, username: e.target.value})}
                                       placeholder="username"/>
                                <input className="mb-2 form-control"
                                       onChange={(e) =>
                                           setNewUser({...newUser, password: e.target.value})}
                                       placeholder="password" type="password"/>
                                <input className="mb-2 form-control"
                                       onChange={(e) =>
                                           setNewUser({...newUser, email: e.target.value})}
                                       placeholder="Email"/>
                                <input className="mb-2 form-control"
                                       onChange={(e) =>
                                           setNewUser({...newUser, zipcode: e.target.value})}
                                       placeholder="ZIP code"/>
                                <div className="label-birth">
                                    <label>Birthday</label>
                                </div>
                                <input className="mb-2 form-control"
                                       onChange={(e) =>
                                           setNewUser({...newUser, dateOfBirth: e.target.value})}
                                       type="Date"/>
                                <button onClick={signup}
                                        className="btn btn-danger btn-width">Sign up
                                </button>
                            </div>
                            <div className="sub-text-box">
                                <small>Already on Yelp? <a className="no-decoration" href="/login">Log in</a></small>
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

export default Signup;
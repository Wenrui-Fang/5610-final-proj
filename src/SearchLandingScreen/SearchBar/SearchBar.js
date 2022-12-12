import React, {useState} from 'react';
import styles from './index.module.css';
import { Link, useNavigate } from "react-router-dom";

export function SearchBar(props) {
    const [term, setTerm] = useState(props.term || '');
    const [location, setLocation] = useState(props.location || '');

    const navigate = useNavigate();

    function submit(e) {
        // To clean up the url to be http://localhost:3000/search
        if (!location || !term) {
            navigate('');
            return;
        }

        if (props.onSearchLandingPage) {
            navigate(`?find_desc=${term}&find_loc=${location}`);
        } else {
            navigate(`/search/?find_desc=${term}&find_loc=${location}`);
        }

        if(typeof props.search === 'function') {
            props.search([term, location]);
        }
        e.preventDefault();
    }

    const sizeClass = props.small ? '' : 'is-medium';
    return (
        <div className="wd-home_banner position-relative">
            <div className="row pt-3">
                <div className="col-3">
                    <Link to="/" className="text-decoration-none">
                        <h1 className="ps-3 fw-bolder text-black">
                            Yelp
                            <i className="bi bi-yelp text-danger ms-2"></i>
                        </h1>
                    </Link>
                </div>
                <div className="col-6 pt-1">
                    <div className="row">
                        <div className={styles.landing}>
                            <div className={styles['search-area']}>
                                <form onSubmit={submit}>
                            <div className="field has-addons">
                                <p className="control">
                                    <button className={`button is-static ${sizeClass}`}>Search</button>
                                </p>
                                <p className="control">
                                    <input className={`input ${sizeClass} ${styles['input-control']}`}
                                           onChange={(e) => setTerm(e.target.value)}
                                           type="text"
                                           value={term}
                                           placeholder="burgers, piazza, beer"
                                    />
                                </p>
                                <div className="control">
                                    <div className={`button is-static ${sizeClass}`}>NEAR</div>
                                </div>
                                <p className="control">
                                    <input className={`input ${sizeClass} ${styles['input-control']}`}
                                           onChange={(e) => setLocation(e.target.value)}
                                           type="text"
                                           value={location}
                                           placeholder="Where"/>
                                </p>
                                <div className={`button ${sizeClass} ${styles['search-button']}`} onClick={submit}>
                                    <span className={`icon is-small ${styles['search-icon']}`}><i className="bi bi-search fw-bolder"></i></span>
                                </div>
                            </div>
                        </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3 pt-1">
                    <h3 className="text-black float-end pe-5">
                        {!props.loggedIn &&
                            <>
                                <button className="btn btn-outline-dark me-2 fw-bolder">
                                    <Link to="/login" className="text-decoration-none text-black">Log In</Link>
                                </button>
                                <button className="btn btn-danger fw-bolder">
                                    <Link to="/signup" className="text-decoration-none text-white">Sign Up</Link>
                                </button>
                            </>
                        }
                        {props.loggedIn &&
                            <>
                                <Link to={`/profile/${props.currentUser.username}`}
                                      className="text-decoration-none text-black">
                                    <i className="bi bi-person-circle fs-2"></i>
                                </Link>
                            </>
                        }
                    </h3>
                </div>
            </div>
        </div>
    );
}
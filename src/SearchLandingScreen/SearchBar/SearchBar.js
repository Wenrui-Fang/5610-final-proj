import React, {useState} from 'react';
import styles from './index.module.css';
import { useNavigate } from "react-router-dom";

export function SearchBar(props) {
    const [location, setLocation] = useState(props.location || '');

    const navigate = useNavigate();

    function submit(e) {
        navigate(`?find_loc=${location}`);
        if(typeof props.search === 'function') {
            props.search(location);
        }
        console.log(location);
        e.preventDefault();
    }

    const sizeClass = props.small ? '' : 'is-medium';
    return (
        <div className={styles.landing}>
            <div className={styles['search-area']}>
        <form onSubmit={submit}>
            <div className="field has-addons">
                <p className="control">
                    <button className={`button is-static ${sizeClass}`}>Search</button>
                </p>
                <p className="control">
                    <input className={`input ${sizeClass} ${styles['input-control']}`}
                           onChange={(e) => setLocation(e.target.value)}
                           type="text"
                           value={location}
                           placeholder="Where"/>
                </p>
                <div className={`button ${sizeClass} ${styles['search-button']}`} onClick={submit}>
                    <span className={`icon is-small ${styles['search-icon']}`}><i className="fas fa-search"></i></span>
                </div>
            </div>
        </form>
            </div>
        </div>
    );
}
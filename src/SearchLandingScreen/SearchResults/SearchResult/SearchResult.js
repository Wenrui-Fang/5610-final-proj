import React from 'react';
import styles from './index.module.css';
import StarRating from "../../../StarRate";
import {Link} from "react-router-dom";

export function SearchResult(props) {
    const b = props.business;
    const loggedIn = props.loggedIn;
    if (!b) {
        return (<div/>);
    }

    const tags = b.categories.map(category => (<span className={`tag ${styles['business-tag']}`} key={b.id + category.title}>{category.title}</span>));

    let addressLines;
    if(b.location.hasOwnProperty('display_address')) {
        addressLines = b.location.display_address.map(addressLine => <p key={b.id + addressLine}>{addressLine}</p>);
    }

    return (
        <Link to={loggedIn ? `/detail/${b.id}`: "/login"} className="text-decoration-none text-black">
            <div className={styles['search-result']}>
                {b.image_url && <img src={b.image_url} alt='business' className={styles['business-image']}/>}
                <div className={styles['business-info']}>
                    <h2 className="">{b.name}</h2>
                    <StarRating rating={b.rating}/>
                    <p>{b.price} {tags}</p>
                </div>
                <div className={styles['contact-info']}>
                    <p>{b.phone}</p>
                    {addressLines}
                    {b.location.formatted_address && <p>{b.location.formatted_address}</p>}
                </div>
            </div>
        </Link>
    )
}
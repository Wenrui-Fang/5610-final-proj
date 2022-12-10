import React from 'react';
import styles from './index.css';

export function Spinner() {
    return (
        <div className={`button ${styles.spinner}`}>Loading</div>
    );
}
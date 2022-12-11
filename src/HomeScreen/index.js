import React, {useState} from "react";
import "./home.css"
import { SearchBar } from "../SearchLandingScreen/SearchBar/SearchBar";
import HomePostsList from "../HomePostsList";

const HomeComponent = () => {

    return (
        <>
                <SearchBar/>
                <HomePostsList/>
        </>
    );
};
export default HomeComponent;

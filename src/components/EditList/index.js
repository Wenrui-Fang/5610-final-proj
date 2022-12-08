import {useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import Search from "../Search";
import * as foodServices from "../../service/foodServices";
import FoodGallery from "../FoodGallery";
import {INITIAL_PAGES} from "../../service/utils";
import Pagination from "../Pagination";
import NoFoodFound from "../NoFoodFound";


const EditList = ({currList={listName: "", food: []}, submitHandler}) => {
    
    const navigate = useNavigate();
    const [listName, setListName] = useState(currList.listName);
    const [searchResults, setSearchResults] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [pages, setPages] = useState(INITIAL_PAGES);
    const [allowNextPages, setAllowNextPages] = useState(false);
    const [foodSelected, setFoodSelected] = useState(currList.food);
    const [query, setQuery] = useState("");
    const searchFood = useCallback(
        () => {
            if (query) {
                foodServices.searchFood(query, currPage)
                    .then(results => {
                        setSearchResults(results)
                        setAllowNextPages(results.length > 0);
                    })
                    .catch(err => alert(err.response.data.error));
            }
        }, [currPage, query]
    )
    const searchInputOnChangeHandler = (e) => {
        const newQuery = e.target.value.trim();
        if (newQuery) {
            setQuery(newQuery);
            setCurrPage(1);
            setPages(INITIAL_PAGES);
        }
    }
    const addFoodOnClickHandler = (food) => {
        const isFound = foodSelected.some((element) => {
            return element.id === food.id;
          });
          const newFoodList = !isFound ? [...foodSelected, food] : foodSelected;
    
          if (isFound) {
            alert("Food is already in the list.");
          }else{
            setFoodSelected(newFoodList);
          }
    }
    const deleteMSOnClickHandler = (food) => {
        let deleteSelectedList = foodSelected.filter(i => i.id !== food.id)
        setFoodSelected(deleteSelectedList);
    }

    const loggedIn = useSelector(isLoggedIn);
    const init = () => {
        if (!loggedIn) {
            navigate("/login");
            return;
        }
        searchFood()
    }

    useEffect(init, [loggedIn, navigate, searchFood]);
    return (
        <div className={"row"}>
            <div className={"m-3 mb-0"}>
                <div className={"search"}>
                    <h4 className="text-primary">List Name</h4>
                    <div className={"d-inline-block"}>
                        <input className={"form-control mb-3 mt-2"} type={"text"} value={listName ? listName : ""}
                               onChange={(e) => setListName(e.target.value)} required placeholder="Give this list a name"/>
                    </div>
                </div>
            </div>
            <Search inputOnChangeHandler={searchInputOnChangeHandler} />
            <div className={"col-12"}>
                <h4 className="ps-3 text-primary">Food In Your List</h4>
                <div className={"p-4"}>
                    <div className="row bg-light">
                        {foodSelected &&
                            foodSelected.map((litem, t) => {
                                return (
                                    <div className="col-12 border p-3" key={t}>
                                        <div className={"row align-items-start"}>
                                            <div className={"d-none d-md-block col-md-2 col-lg-1 pt-1"}>
                                                <img src={`${litem.poster_path ? `${process.env.REACT_APP_FOOD_BASE_URL}/w342/${litem.poster_path}` : ""}`} className="img-fluid" alt="Poster Not Found" />
                                            </div>
                                            <div className="col">
                                                <div className={"row align-items-center"}>
                                                    <h4 className="col fs-4">{litem.title}</h4>
                                                    <i className="col-2 col-md-1 fas fa-times text-center" style={{color: 'red'}} onClick={() => deleteMSOnClickHandler(litem)}/>
                                                </div>
                                                <p className="fs-6"> Release Date: {litem.release_date}</p>
                                                {litem.overview && <p className="fs-6">Description: <span className={"text-secondary"}>{litem.overview}</span></p>}
                                            </div>
                                        </div>
                                    </div>

                                );
                            })}
                    </div>
                </div>
            </div>
            <div className={"col-4 col-md-2 m-3"}>
                <button className="btn btn-primary rounded-pill w-100"
                        onClick={() => submitHandler({listName: listName, food: foodSelected.map(m => m.id)})}>Submit</button>
            </div>
            <div className={"col-12 p-4"}>
                <div className={"bg-light p-4 border"}>
                    {
                        searchResults.length > 0 &&
                        <FoodGallery food={searchResults} posterOnClickHandler={(arg) => {}} addFoodOnClickHandler={addFoodOnClickHandler}/>
                    }
                    {
                        searchResults.length === 0 &&
                        <NoFoodFound/>
                    }
                    <Pagination currPage={currPage} setCurrPage={setCurrPage} setPages={setPages} pages={pages} allowNextPages={allowNextPages}/>
                </div>
            </div>
        </div>
    )
};
export default EditList;
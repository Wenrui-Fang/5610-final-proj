import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import HomeComponent from "./HomeScreen";
import DetailComponent from "./FoodDetailScreen";
import SearchComponent from "./SearchLandingScreen";

function App() {
    return (
        <>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/" element={<HomeComponent/>}/>
                        <Route path="/search" element={<SearchComponent/>}/>
                        <Route path="/detail" element={<DetailComponent/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;

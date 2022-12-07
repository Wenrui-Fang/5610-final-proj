import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Login from "./yelp/login";
import Signup from "./yelp/signup";
import Profile from "./yelp/profile";

function App() {
  return (
      <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/profile" element={<Profile/>}/>
            </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;

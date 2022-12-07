import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import Login from "./yelp/login";
import Signup from "./yelp/signup";
import Profile from "./yelp/profile";
import EditProfile from "./yelp/profile/edit-profile";

function App() {
  return (
      <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/profile/:username/edit" element={<EditProfile/>}/>
                <Route path="/profile/:username" element={<Profile/>}/>
                <Route path="/profile/:username/*" element={<Profile />}/>
            </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;

import React from "react";
// import Signup from "./Signup";
// import Login from "./Login";
// import Lobby from "./Lobby";
// import Game from "./Game";
// import WaitingLobby from "./WaitingLobby";
// import "./style/index.css";
import Login from './Login'
import SearchComponent from "./SearchComponent";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignUp from "./SignUp";
import StartPage from "./StartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<SearchComponent />} />
        <Route path="/gamePage" element={<StartPage />} />
      </Routes>
    </Router>
  );
}




export default App;

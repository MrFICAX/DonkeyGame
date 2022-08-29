import React from "react";
import LoginWrapper from './LoginWrapper'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignUpWrapper from "./SignUpWrapper";
import StartPageWrapper from "./StartPageWrapper";
import WelcomeWrapper from "./WelcomeWrapper";
import GameLobbyWrapper from "./GameLobbyWrapper";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeWrapper />} />
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/signup" element={<SignUpWrapper />} />
        <Route path="/gameLobby" element={<GameLobbyWrapper />} />
        <Route path="/startpage" element={<StartPageWrapper />} />
      </Routes>
    </Router>
  );
}




export default App;

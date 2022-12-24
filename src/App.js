import './App.css';
import React from "react";
import axios from "axios";
import {BrowserRouter, Router, Route, NavLink, Routes} from "react-router-dom";
import LeaguesHomePage from "./LeaguesHomePage";
import TeamInformation from "./TeamInformation";


class App extends React.Component {

    state = {}

    render() {
        return (
            <div>
                <div className="Title">
                    <label> Football </label>
                </div>

                <BrowserRouter>
                    <NavLink to={"/LeaguesHomePage"}> HomePage </NavLink>
                    <Routes>
                        <Route path={"/LeaguesHomePage"} element={<LeaguesHomePage/>}/>
                    </Routes>

                </BrowserRouter>
            </div>
        );
    }
}

export default App;

import './App.css';
import React from "react";
import axios from "axios";
import {BrowserRouter, Router, Route, NavLink, Routes} from "react-router-dom";
import LeaguesHomePage from "./LeaguesHomePage";
import GeneralStatistics from "./GeneralStatistics";
import LeagueResultsHistory from "./LeagueResultsHistory";
import TopScorersTable from "./TopScorersTable";


class App extends React.Component {

    state = {}

    render() {
        return (
            <div className="App">
                <div className="Title">
                    <label> Football </label>
                </div>

                <BrowserRouter>
                    <NavLink to={"/LeaguesHomePage"}>HomePage</NavLink>
                    <NavLink to={"/GeneralStatistics"}>GeneralStatistics</NavLink>
                    <NavLink to={"/LeagueResultsHistory"}>LeagueResultsHistory</NavLink>
                    <NavLink to={"/TopScorersTable"}>TopScorersTable</NavLink>

                    <Routes>
                        <Route path={"/LeaguesHomePage"} element={<LeaguesHomePage/>}/>
                        <Route path={"/GeneralStatistics"} element={<GeneralStatistics/>}/>
                        <Route path={"/LeagueResultsHistory"} element={<LeagueResultsHistory/>}/>
                        <Route path={"/TopScorersTable"} element={<TopScorersTable/>}/>
                        <Route path={"*"} element={<LeaguesHomePage/>}/>
                        <Route path={"/"} element={<LeaguesHomePage/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;

import './App.css';
import React from "react";
import axios from "axios";
import {BrowserRouter, Router, Route, NavLink, Routes} from "react-router-dom";
import LeaguesHomePage from "./LeaguesHomePage";
import GeneralStatisticsPage from "./GeneralStatistics";
import LeagueResultsHistoryPage from "./LeagueResultsHistoryPage";
import TopScorersTablePage from "./TopScorersTable";
import PrintLeaguesTable from "./PrintLeaguesTable";
import leaguesHomePage from "./LeaguesHomePage";
import PrintTeamTable from "./PrintTeamTable";


class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="Title">
                    <label> Football </label>
                </div>
                <BrowserRouter>
                    <div className="NavLink">
                        <NavLink style={{margin: "30px"}} to={"/LeaguesHomePage"}>Home Page</NavLink>
                        <NavLink style={{margin: "30px"}} to={"/LeagueResultsHistoryPage"}>League Results History</NavLink>
                        <NavLink style={{margin: "30px"}} to={"/GeneralStatistics"}>General Statistics</NavLink>
                        <NavLink style={{margin: "30px"}} to={"/TopScorersTable"}>Top Scorers Table</NavLink>
                    </div>

                    <Routes>
                        <Route path={"/LeaguesHomePage"} element={<LeaguesHomePage/>}/>
                        <Route path={"/LeagueResultsHistoryPage"} element={<LeagueResultsHistoryPage/>}/>
                        <Route path={"/GeneralStatistics"} element={<GeneralStatisticsPage/>}/>
                        <Route path={"/TopScorersTable"} element={<TopScorersTablePage/>}/>
                        <Route path={"*"} element={<LeaguesHomePage/>}/>
                        <Route path={"/"} element={<LeaguesHomePage/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;

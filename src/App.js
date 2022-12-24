import './App.css';
import React from "react";
import axios from "axios";
import {BrowserRouter, Router, Route, NavLink, Routes} from "react-router-dom";
import LeaguesHomePage from "./LeaguesHomePage";
import TeamInformation from "./TeamInformation";


class App extends React.Component {

    state = {
        domain: 'https://app.seker.live/fm1/',
        leaguesList: [],
        teamList: [],
        teamId: 0,
        leagueName: "",
        description: "Those are the existing leagues:",
    }

    componentDidMount() {
        this.getLeagues();
    }

    getLeagues = () => {
        axios.get(this.state.domain + 'leagues')
            .then((response) => {
                this.setState(this.state.leaguesList = response.data)
            });
    }

    getTeam = (id, name) => {
        this.state.teamId = id
        this.state.leagueName = name
        axios.get(this.state.domain + '/teams/' + this.state.teamId)
            .then((response) => {
                this.setState(this.state.teamList = response.data)
                this.setState(this.state.description = "Those are the groups in the " + this.state.leagueName + " league:")
            })
    }

    render() {
        return (
            <div className="Main">
                <div className="Title">
                    <label> Football </label>
                </div>
                <div>
                    {this.state.description}
                </div>
                <table>
                    {this.state.leaguesList.map((league, index) => {
                        return (
                            //onClick={() => alert(league.name)}
                            <tr onClick={() => this.getTeam(league.id, league.name)}>
                                <td>
                                    {league.name}
                                </td>
                            </tr>
                        )
                    })
                    }
                </table>
                <BrowserRouter>
                    <NavLink to={"/TeamInformation"}>{this.state.leagueName}</NavLink>
                    <Routes>
                        <Route path={"/TeamInformation"} element={<TeamInformation/>}/>>
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

import './App.css';
import React from "react";
import axios from "axios";
import {BrowserRouter, Router, Route, NavLink, Routes} from "react-router-dom";
import LeaguesHomePage from "./LeaguesHomePage";
import TeamInformation from "./TeamInformation";


class App extends React.Component {

    state = {
        domain: 'https://app.seker.live/fm1/',
        LeaguesList: [],

    }

    componentDidMount() {
        this.getLeagues();
    }

    getLeagues = () => {
        axios.get(this.state.domain + 'leagues')
            .then((response) => {
                this.setState(this.state.LeaguesList = response.data)
            });
    }

    chooseTeam = (league) => {
        alert(league.name)
    }


    render() {
        return (
            <div className="Main">
                <div className="Title">
                    <label> Football </label>
                </div>
                <table>
                    {this.state.LeaguesList.map((league, index) => {
                        return (
                            <tr onClick={this.chooseTeam}>
                                <TeamInformation
                                    id={league.id}
                                    name={league.name}
                                />
                            </tr>

                        )
                    })}

                </table>
            </div>
        );
    }
}

export default App;

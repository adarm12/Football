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
        teamList: [],
        team: 1,
        leagueName: "spanish",
        description: "",
    }

    componentDidMount() {
        this.getTeam();
    }

    getLeagues = () => {
        axios.get(this.state.domain + 'leagues')
            .then((response) => {
                this.setState(this.state.LeaguesList = response.data)
            });
    }

    getTeam = () => {
        axios.get(this.state.domain + '/teams/' + this.state.team)
            .then((response) => {
                this.setState(this.state.teamList = response.data)
                this.setState(this.state.description = "Those are the groups in the " + this.state.leagueName + " league:")
            })
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
                <div>
                    {this.state.description}
                </div>
                <table>
                    {this.state.teamList.map((league, index) => {
                        return (
                            <tr>
                                {league.name}
                                {/*<TeamInformation*/}
                                {/*    id={league.id}*/}
                                {/*    name={league.name}*/}
                                {/*/>*/}
                            </tr>
                        )
                    })
                    }
                </table>
            </div>
        );
    }
}

export default App;

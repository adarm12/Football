import React from "react";
import axios from "axios";
import PrintLeaguesTable from "./PrintLeaguesTable";
import PrintPlayersTable from "./PrintPlayersTable";
import PrintTeamTable from "./PrintTeamTable";
import App from "./App";

class LeaguesHomePage extends React.Component {
    state = {
        domain: 'https://app.seker.live/fm1/',
        leaguesList: [],
        leagueId: 0,
        leagueName: "",
        leaguesDescription: "These are the existing leagues:",
        teamList: [],
        teamId: 0,
        teamName: "",
        teamsDescription: "",
        playerList: [],
        playersDescription: "",
    }

    //https://app.seker.live/fm1/squad/2/560

    componentDidMount() {
        this.getLeagues();
    }

    getLeagues = () => {
        axios.get(this.state.domain + 'leagues')
            .then((response) => {
                this.setState({leaguesList: response.data})
            });
    }

    getTeam = (id, name) => {
        this.state.leagueId = id
        this.state.leagueName = name
        axios.get(this.state.domain + '/teams/' + this.state.leagueId)
            .then((response) => {
                this.setState(this.state.teamList = response.data)
                this.setState(this.state.teamsDescription = "These are the groups in the " + this.state.leagueName + " league:")
            })
        // {alert(this.state.leaguesList.length)}
    }

    getPlayersList = (teamId, teamName) => {
        this.state.teamId = teamId
        this.state.teamName = teamName
        axios.get(this.state.domain + '/squad/' + this.state.leagueId + '/' + this.state.teamId)
            .then((response) => {
                this.setState(this.state.playerList = response.data)
                this.setState(this.state.playersDescription = "These are the players in the " + this.state.teamName + " team:")
            })
    }

    render() {
        return (
            <div className="Main">
                <div>
                    {this.state.leaguesDescription}
                </div>
                <div>
                    <PrintLeaguesTable leaguesList={this.state.leaguesList} getTeams={this.getTeam}/>
                    <div>
                        {this.state.teamsDescription}
                    </div>
                    <PrintTeamTable teamList={this.state.teamList} getPlayers={this.getPlayersList}/>
                    <div>
                        {this.state.playersDescription}
                    </div>
                    <PrintPlayersTable players={this.state.playerList}/>
                </div>
            </div>
        );
    }
}

export default LeaguesHomePage;
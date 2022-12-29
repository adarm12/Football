import React from "react";
import axios from "axios";
import PrintLeaguesTable from "./PrintLeaguesTable";
import PrintPlayersTable from "./PrintPlayersTable";
import PrintTeamTable from "./PrintTeamTable";
import LeagueResultsHistory from "./LeagueResultsHistory";

class LeaguesHomePage extends React.Component {

    state = {
        domain: 'https://app.seker.live/fm1/',
        leaguesList: [],
        leagueId: 0,
        leagueName: "",
        teamList: [],
        teamId: 0,
        teamName: "",
        playerList: [],
        description: "Those are the existing leagues:",

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
                this.setState(this.state.description = "Those are the groups in the " + this.state.leagueName + " league:")
            })
    }

    getPlayersList = (teamId, teamName) => {
        this.state.teamId = teamId
        this.state.teamName = teamName
        axios.get(this.state.domain + '/squad/' + this.state.leagueId + '/' + this.state.teamId)
            .then((response) => {
                this.setState(this.state.playerList = response.data)
            })
    }

    getTeamScoreHistory() {
        axios.get(this.state.domain + '/squad/' + this.state.leagueId + '/' + this.state.teamId)
            .then((response) => {
                this.setState(this.state.playerList = response.data)
            })
    }

    render() {
        return (
            <div className="Main">
                <div>
                    {this.state.description}
                </div>
                <div>
                    <PrintLeaguesTable leaguesList={this.state.leaguesList} getTeams={this.getTeam}/>
                    <PrintTeamTable teamList={this.state.teamList} getPlayers={this.getPlayersList}/>
                    <PrintPlayersTable players={this.state.playerList}/>
                </div>
            </div>
        );
    }
}

export default LeaguesHomePage;
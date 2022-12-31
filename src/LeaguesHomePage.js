import React from "react";
import axios from "axios";
import PrintLeaguesTable from "./PrintLeaguesTable";
import PrintPlayersTable from "./PrintPlayersTable";
import PrintTeamTable from "./PrintTeamTable";
import App from "./App";
import GeneralStatistics from "./GeneralStatistics";
import PrintScoreTeamHistory from "./PrintScoreTeamHistory";
import PrintDescription from "./PrintDescription";

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
        historyList: [],
        historyDescription: "",
        homeTeamScore: 0,
        awayTeamScore: 0,
    }

    //https://app.seker.live/fm1/squad/2/560


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
        this.state.leagueId = id
        this.state.leagueName = name
        axios.get(this.state.domain + '/teams/' + this.state.leagueId)
            .then((response) => {
                this.setState(this.state.teamList = response.data)
                this.setState(this.state.teamsDescription = "These are the groups in the " + this.state.leagueName + " league:")
            })
        // {alert(this.state.leaguesList.length)}
    }


    getPlayersAndHistory = (teamId, teamName) => {
        this.state.teamId = teamId
        this.state.teamName = teamName

        this.getPlayersList(teamId, teamName)
        this.getHistory(teamId, teamName)
    }


    getPlayersList = (teamId, teamName) => {
        axios.get(this.state.domain + '/squad/' + this.state.leagueId + '/' + this.state.teamId)
            .then((response) => {
                this.setState(this.state.playerList = response.data)
                this.setState(this.state.playersDescription = "These are the players in the " + this.state.teamName + " team:")
            })
    }

    getHistory = (teamId, teamName) => {
        this.state.teamId = teamId
        this.state.teamName = teamName
        axios.get(this.state.domain + '/history/' + this.state.leagueId + '/' + this.state.teamId)
            .then((response) => {
                this.setState(this.state.historyList = response.data)
                this.setState(this.state.historyDescription = "This is the history of: " + this.state.teamName + " team:")

            })

    }

    getScore = () => {
        {debugger}
        if (this.state.historyList.home === true) {
            this.state.homeTeamScore++
        }
        if (this.state.historyList.home === false) {
            this.state.awayTeamScore++
        }
    }

    // getTeamScoreHistory() {
    //     axios.get(this.state.domain + '/squad/' + this.state.leagueId + '/' + this.state.teamId)
    //         .then((response) => {
    //             this.setState(this.state.playerList = response.data)
    //         })
    // }

    render() {
        return (
            <div className="Main">
                <div>
                    <PrintLeaguesTable leaguesList={this.state.leaguesList} getTeams={this.getTeam}
                                       description={this.state.leaguesDescription}/>
                    <PrintTeamTable teamList={this.state.teamList}
                                    getPlayersAndHistory={this.getPlayersAndHistory}
                                    description={this.state.teamsDescription}/>
                    <td>
                        <PrintPlayersTable players={this.state.playerList}
                                           description={this.state.playersDescription}/>
                    </td>
                    <td>
                        <PrintScoreTeamHistory history={this.state.historyList}
                                               description={this.state.historyDescription}
                                               getScore={this.getScore}/>
                        {this.getScore} result: {this.state.homeTeamScore}
                    </td>
                </div>
            </div>
        );
    }
}

export default LeaguesHomePage;
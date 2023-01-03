import React from "react";
import axios from "axios";
import PrintLeaguesTable from "./PrintLeaguesTable";
import PrintPlayersTable from "./PrintPlayersTable";
import PrintTeamTable from "./PrintTeamTable";
import PrintScoreTeamHistory from "./PrintScoreTeamHistory";


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
        scoreList: [],
        homeTeamScoreList: [],
        awayTeamScoreList: [],
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
                this.getNewHistoryList(response.data)
                this.countHomeTeamScore(response.data)
                this.countAwayTeamScore(response.data)
                this.setState(this.state.historyDescription = "This is the history of - " + this.state.teamName + " team:")
            })
    }
    getNewHistoryList = (history) => {
        let list = [];
        for (let i = 0; i < history.length; i++) {
            for (let j = 0; j < history[i].goals.length; j++) {
                list.push(history[i].goals[j])
            }
        }
        this.getTeamsScore(list)
    }
    //https://app.seker.live/fm1/squad/2/560


    getTeamsScore = (list) => {
        let scoreList = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].home === true)
                scoreList.push(1)
            else if (list[i].home === false)
                scoreList.push(0)

        }
        this.setState(this.state.scoreList = scoreList)
        // alert(this.state.scoreList[1])
        // alert(this.state.scoreList.length)
    }

    countHomeTeamScore = (history) => {
        let score = [];
        let counter = 0;
        for (let i = 0; i < history.length; i++) {
            let homeScore = 0;
            for (let j = 0; j < history[i].goals.length; j++) {
                if (this.state.scoreList[counter] === 1) {
                    homeScore++
                    counter++
                } else {
                    counter++
                }
            }
            score.push(homeScore)
        }
        this.setState(this.state.homeTeamScoreList = score)
    }

    countAwayTeamScore = (history) => {
        let score = [];
        let counter = 0;
        for (let i = 0; i < history.length; i++) {
            let awayScore = 0;
            for (let j = 0; j < history[i].goals.length; j++) {
                if (this.state.scoreList[counter] === 0) {
                    awayScore++
                    counter++
                } else {
                    counter++
                }
            }
            score.push(awayScore)
        }
        this.setState(this.state.awayTeamScoreList = score)
        // alert(this.state.awayScoreList[6])
        // alert(this.state.awayScoreList.length)
    }

    render() {
        return (
            <div className="Main">
                <header style={{width: 170}}>
                    <th>Leagues Home Page</th>
                </header>
                <div>
                    <PrintLeaguesTable leaguesList={this.state.leaguesList} getTeams={this.getTeam}
                                       description={this.state.leaguesDescription}/>
                    <PrintTeamTable teamList={this.state.teamList}
                                    getPlayersAndHistory={this.getPlayersAndHistory}
                                    description={this.state.teamsDescription}/>
                    <PrintPlayersTable players={this.state.playerList}
                                       description={this.state.playersDescription}/>
                    <PrintScoreTeamHistory history={this.state.historyList}
                                           description={this.state.historyDescription}
                                           homeScoreList={this.state.homeTeamScoreList}
                                           awayScoreList={this.state.awayTeamScoreList}
                    />
                </div>
            </div>
        );
    }
}

export default LeaguesHomePage;
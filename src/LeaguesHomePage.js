import React from "react";
import axios from "axios";
import PrintLeaguesTable from "./PrintLeaguesTable";
import PrintPlayersTable from "./PrintPlayersTable";
import PrintTeamTable from "./PrintTeamTable";
import PrintTeamScoreHistory from "./PrintTeamScoreHistory";


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
        homeTeamGoalsList: [],
        awayTeamGoalsList: [],
        teamDifferenceList: [],
        homeTeamScoreList: [],
        awayTeamScoreList: [],
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
        this.state.leagueId = id
        this.state.leagueName = name
        axios.get(this.state.domain + '/teams/' + this.state.leagueId)
            .then((response) => {
                this.setState(this.state.teamList = response.data)
                this.setState(this.state.teamsDescription = "These are the groups in the " + this.state.leagueName + " league:")
            })
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
                this.countTeamGoals(response.data, 1)
                this.countTeamGoals(response.data, 0)
                this.teamDifferenceCounter()
                this.countTeamScore()
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

    getTeamsScore = (list) => {
        let scoreList = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].home === true)
                scoreList.push(1)
            else
                scoreList.push(0)

        }
        this.setState(this.state.scoreList = scoreList)
    }

    countTeamGoals = (goalsArray, team) => {
        let score = [];
        let counter = 0;
        for (let i = 0; i < goalsArray.length; i++) {
            let goalsCounter = 0;
            for (let j = 0; j < goalsArray[i].goals.length; j++) {
                counter++
                if (this.state.scoreList[counter] === team) {
                    goalsCounter++
                }
            }

            score.push(goalsCounter)
        }

        if (team === 1) {
            this.setState(this.state.homeTeamGoalsList = score)
        } else {
            this.setState(this.state.awayTeamGoalsList = score)
        }
    }

    teamDifferenceCounter = () => {
        let difference = [];
        let value = 0;
        for (let i = 0; i < this.state.homeTeamGoalsList.length; i++) {
            value = this.state.homeTeamGoalsList[i] - this.state.awayTeamGoalsList[i]
            difference.push(value)
        }
        this.setState(this.state.teamDifferenceList = difference)
        // alert(this.state.differenceList[8])
    }

    countTeamScore = () => {
        let homeScore = [];
        let awayScore = [];
        for (let i = 0; i < this.state.homeTeamGoalsList.length; i++) {
            if (this.state.homeTeamGoalsList[i] === this.state.awayTeamGoalsList[i]) {
                homeScore.push(1)
                awayScore.push(1)
            } else if (this.state.homeTeamGoalsList[i] > this.state.awayTeamGoalsList[i]) {
                homeScore.push(3)
                awayScore.push(0)
            } else if (this.state.homeTeamGoalsList[i] < this.state.awayTeamGoalsList[i]) {
                homeScore.push(0)
                awayScore.push(3)
            }
        }
        this.setState(this.state.homeTeamScoreList = homeScore)
        // alert(this.state.homeTeamScoreList.length)
        this.setState(this.state.awayTeamScoreList = awayScore)
    }


    // countAwayTeamGoals = (history) => {
    //     let score = [];
    //     let counter = 0;
    //     for (let i = 0; i < history.length; i++) {
    //         let awayScore = 0;
    //         for (let j = 0; j < history[i].goals.length; j++) {
    //             if (this.state.scoreList[counter] === 0) {
    //                 awayScore++
    //                 counter++
    //             } else {
    //                 counter++
    //             }
    //         }
    //         score.push(awayScore)
    //     }
    //     this.setState(this.state.awayTeamScoreList = score)
    //     // alert(this.state.awayScoreList[6])
    //     // alert(this.state.awayScoreList.length)
    // }

    render() {
        return (
            <div className="Main">
                <div className="miniTitle">Leagues Home Page</div>
                <div>
                    <PrintLeaguesTable leaguesList={this.state.leaguesList} getTeams={this.getTeam}
                                       description={this.state.leaguesDescription}/>
                    <PrintTeamTable teamList={this.state.teamList}
                                    getPlayersAndHistory={this.getPlayersAndHistory}
                                    description={this.state.teamsDescription}/>
                    <PrintPlayersTable players={this.state.playerList}
                                       description={this.state.playersDescription}/>
                    {this.state.historyList.length > 0 ?
                        <PrintTeamScoreHistory history={this.state.historyList}
                                               description={this.state.historyDescription}
                                               homeGoalsList={this.state.homeTeamGoalsList}
                                               awayGoalsList={this.state.awayTeamGoalsList}
                                               teamDifference={this.state.teamDifferenceList}
                                               homeScoreList={this.state.homeTeamScoreList}
                                               awayScoreList={this.state.awayTeamScoreList}
                        />
                        : <div></div>}

                </div>
            </div>
        );
    }
}

export default LeaguesHomePage;
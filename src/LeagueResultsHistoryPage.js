import React from "react";
import PrintLeaguesTable from "./PrintLeaguesTable";
import PrintHistoryTable from "./PrintHistoryTable";
import axios from "axios";
import PrintTeamTable from "./PrintTeamTable";

class LeagueResultsHistoryPage extends React.Component {

    state = {
        domain: 'https://app.seker.live/fm1/',
        leaguesList: [],
        leagueId: 0,
        leagueName: "",
        leaguesDescription: "These are the existing leagues:",
        historyList: [],
        tableDescription: "",
        scoreList: [],
        homeScoreList: [],
        awayScoreList: [],
        differenceList: [],

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

    getLeagueHistory = (id, name) => {
        this.state.leagueId = id
        this.state.leagueName = name
        axios.get(this.state.domain + '/history/' + this.state.leagueId)
            .then((response) => {
                this.setState(this.state.historyList = response.data)
                this.getNewHistoryList(response.data)
                this.countHomeGoals(response.data)
                this.countAwayGoals(response.data)
                this.differenceCounter()
                this.setState(this.state.tableDescription = "These are the" + this.state.leagueName + " league history results")
            })
    }
    getNewHistoryList = (history) => {
        let list = [];
        for (let i = 0; i < history.length; i++) {
            for (let j = 0; j < history[i].goals.length; j++) {
                list.push(history[i].goals[j])
            }
        }
        this.getGoals(list)
    }

    getGoals = (list) => {
        let scoreList = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].home === true)
                scoreList.push(1)
            else
                // if (list[i].home === false)
                scoreList.push(0)

        }
        this.setState(this.state.scoreList = scoreList)
    }

    countHomeGoals = (history, league) => {
        let score = [];
        let counter = 0;
        for (let i = 0; i < history.length; i++) {
            let homeScore = 0;
            for (let j = 0; j < history[i].goals.length; j++) {
                counter++
                if (this.state.scoreList[counter] === league) {
                    homeScore++
                }
            }
            score.push(homeScore)
        }
        if (league === 1) {
            this.setState(this.state.homeScoreList = score)
        } else {
            this.setState(this.state.awayScoreList = score)
        }
    }


    differenceCounter = () => {
        let difference = [];
        let value = 0;
        for (let i = 0; i <this.state.homeScoreList.length; i++) {
            value = this.state.homeScoreList[i] - this.state.awayScoreList[i]
            difference.push(value)
        }
        this.setState(this.state.differenceList = difference)
    }


    render() {
        return (
            <div className="Main">
                <div className="miniTitle">Leagues Results History</div>

                <div>
                    <PrintLeaguesTable leaguesList={this.state.leaguesList} getTeams={this.getLeagueHistory}
                                       description={this.state.leaguesDescription}/>


                    <PrintHistoryTable historyList={this.state.historyList}
                                       homeScoreList={this.state.homeScoreList}
                                       awayScoreList={this.state.awayScoreList}
                                       difference={this.state.differenceList}
                                       description={this.state.tableDescription}/>
                </div>
            </div>
        );
    }

}

export default LeagueResultsHistoryPage;
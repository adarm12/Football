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
        // alert(this.state.scoreList[1])
        // alert(this.state.scoreList.length)
    }

    countHomeGoals = (history) => {
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
        this.setState(this.state.homeScoreList = score)
    }

    countAwayGoals = (history) => {
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
        this.setState(this.state.awayScoreList = score)
        // alert(this.state.awayScoreList[6])
        // alert(this.state.awayScoreList.length)
    }

    differenceCounter = () => {
        let difference = [];
        let value = 0;
        for (let i = 0; i < this.state.homeScoreList.length; i++) {
            value = this.state.homeScoreList[i] - this.state.awayScoreList[i]
            difference.push(value)
        }
        this.setState(this.state.differenceList = difference)
        // alert(this.state.differenceList[8])
    }


    render() {
        return (
            <div className="Main">
                <div className="miniTitle">Leagues Results History</div>

                <div>
                    <PrintLeaguesTable leaguesList={this.state.leaguesList} getTeams={this.getLeagueHistory}
                                       description={this.state.leaguesDescription}/>
                    {this.state.historyList.length > 0 ?
                        <PrintHistoryTable historyList={this.state.historyList}
                                           homeScoreList={this.state.homeScoreList}
                                           awayScoreList={this.state.awayScoreList}
                                           difference={this.state.differenceList}
                                           description={this.state.tableDescription}/> : <div></div>}
                </div>
            </div>
        );
    }

}

export default LeagueResultsHistoryPage;
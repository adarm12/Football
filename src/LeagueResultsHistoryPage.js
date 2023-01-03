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

    //https://app.seker.live/fm1/history/2/500

    getLeagueHistory = (id, name) => {
        this.state.leagueId = id
        this.state.leagueName = name
        axios.get(this.state.domain + '/history/' + this.state.leagueId)
            .then((response) => {
                this.setState(this.state.historyList = response.data)
                this.getNewHistoryList(response.data)
                this.setState(this.state.tableDescription = "These are the" + this.state.leagueName + " league history results")
            })
    }
    getNewHistoryList = (history) => {
        let list = [];
        for (let i = 0; i < history.length; i++) {
            for (let j = 0; j < history[i].goals.length; j++) {
                list.push(history[i].goals[j].scorer)
            }
        }
        // this.TopScore(list)
    }

    render() {
        return (
            <div className="Main">
                <div>
                    <PrintLeaguesTable leaguesList={this.state.leaguesList} getTeams={this.getLeagueHistory}
                                       description={this.state.leaguesDescription}/>
                    <PrintHistoryTable historyList={this.state.historyList}
                                       description={this.state.tableDescription}/>
                </div>
            </div>
        );
    }

}

export default LeagueResultsHistoryPage;
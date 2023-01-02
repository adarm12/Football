import React from "react";
import axios from "axios";
import PrintLeaguesTable from "./PrintLeaguesTable";
import LeaguesHomePage from "./LeaguesHomePage";
import PrintTeamTable from "./PrintTeamTable";
import PrintPlayersTable from "./PrintPlayersTable";
import PrintScoreTeamHistory from "./PrintScoreTeamHistory";
import PrintTopScoreTable from "./PrintTopScoreTable";

class TopScorersTable extends React.Component {
    state = {
        domain: 'https://app.seker.live/fm1/',
        leaguesList: [],
        leagueId: 0,
        leagueName: "",
        leaguesDescription: "These are the existing leagues:",
        leagueHistoryList: [],
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
                this.setState(this.state.leagueHistoryList = response.data)
                this.setState(this.state.tableDescription = "These are top 3 players in the " + this.state.leagueName + " league:")
            })
        // {alert(this.state.leagueId.length)}
    }


    render() {
        return (
            <div className="Main">
                <div>
                    <PrintLeaguesTable leaguesList={this.state.leaguesList} getTeams={this.getLeagueHistory}
                                       description={this.state.leaguesDescription}/>
                    <PrintTopScoreTable teamList={this.state.leagueHistoryList}
                                    description={this.state.tableDescription}/>
                </div>
            </div>
        );
    }
}

//     state = {
//         domain: 'https://app.seker.live/fm1/',
//         leaguesList: [],
//         leagueTeams: [],
//         playerList: [],
//         teamHistory: []
//
//     }
//
//     componentDidMount() {
//         this.getLeagues()
//     }
//
//     getLeagues = () => {
//
//         axios.get(this.state.domain + 'leagues')
//             .then((response) => {
//                 this.setState({
//                     leaguesList: response.data
//                 })
//             });
//     }
//
//     getScorers = (leagueId) => {
//
//         axios.get(this.state.domain+"teams/"+leagueId)
//             .then((response) => {
//                 //debugger
//                 this.state.leagueTeams = response.data
//                 this.setState({
//                     leaguesList: []
//                 })
//                 this.state.leagueTeams.map((team) => {
//                     this.getPlayers(team,leagueId)
//                 })
//         })
//     }
//
//     getPlayers = (team,leagueId) => {
//         axios.get(this.state.domain+"squad/"+leagueId+"/"+team.id)
//             .then((response) => {
//                 this.state.playerList = response.data
//
//             })
//
//         axios.get(this.state.domain+"history/"+leagueId+"/"+team.id)
//             .then((response) => {
//
//                 this.state.teamHistory = response.data
//             })
//
//
//     }
//
//
//
//     render() {
//         return (
//             <div className={"main"}>
//                 <div>
//                     Top scorers table
//                 </div>
//
//                 {this.state.leaguesList.map((league) => {
//                     return (
//                         <button onClick={() => this.getScorers(league.id)}> {league.name}</button>
//                     )
//                 })}
//             </div>
//         );
//     }
//
// }


export default TopScorersTable;
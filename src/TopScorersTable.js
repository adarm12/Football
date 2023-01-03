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
        topPlayersList: [],
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
                this.setState(this.state.topPlayersList = response.data)
                this.getNewHistoryList(response.data)
                this.setState(this.state.tableDescription = "These are top 3 players in the " + this.state.leagueName + " league:")
            })
    }

    getNewHistoryList = (history) => {
        let list = [];
        for (let i = 0; i < history.length; i++) {
            for (let j = 0; j < history[i].goals.length; j++) {
                list.push(history[i].goals[j].scorer)
            }
        }
        this.TopScore(list)
    }

    TopScore = (list) => {
        let playersList = [];
        let newTopPlayersList = [];
        for (let i = 0; i < list.length; i++) {
            let goalsCounter = 1;
            for (let j = i + 1; j < list.length; j++) {
                if (list[i].id === list[j].id)
                    goalsCounter++
            }
            const playerDetails = {
                firstName: list[i].firstName,
                lastName: list[i].lastName,
                id: list[i].id,
                goals: goalsCounter,
            }
            playersList.push(playerDetails)
        }
        // alert(playersList.length)

        playersList = playersList.filter((firstPlayer, index, self) =>
            index === self.findIndex((secondPlayer) => (
                secondPlayer.id === firstPlayer.id

            )))
        playersList.sort((firstPlayer, secondPlayer) => {
            if (firstPlayer.goals > secondPlayer.goals) {
                return -1;
            }
            if (secondPlayer.goals > firstPlayer.goals) {
                return 1
            }
            return 0;
        })
        for (let i = 0; i < 3; i++) {
            newTopPlayersList.push(playersList[i])
        }
        this.setState(this.state.topPlayersList = newTopPlayersList)
    }


    render() {
        return (
            <div className="Main">
                <div>
                    <PrintLeaguesTable leaguesList={this.state.leaguesList} getTeams={this.getLeagueHistory}
                                       description={this.state.leaguesDescription}/>
                    {/*{this.state.topPlayersList.length}*/}
                    <PrintTopScoreTable historyList={this.state.topPlayersList}
                                        description={this.state.tableDescription}/>
                </div>
            </div>
        );
    }

}


export default TopScorersTable;

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



import React from "react";
import axios from "axios";
import PrintLeaguesTable from "./PrintLeaguesTable";
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
                <div className="miniTitle">Top Scores Table</div>
                <div>
                    <PrintLeaguesTable leaguesList={this.state.leaguesList} getTeams={this.getLeagueHistory}
                                       description={this.state.leaguesDescription}/>
                    {this.state.topPlayersList.length > 0 ?
                        <PrintTopScoreTable historyList={this.state.topPlayersList}
                                            description={this.state.tableDescription}/> : <div></div>}
                </div>
            </div>
        );
    }

}


export default TopScorersTable;


// import React from "react";
// import axios, {get} from "axios";
//
// class TopScorersTable extends React.Component {
//
//     state = {
//         domain: 'https://app.seker.live/fm1/',
//         leaguesList: [],
//         leagueTeams: [],
//         playerList: [],
//         playersGoals: new Map([]),
//         leagueHistory: [],
//         topScorers: {}
//
//     }
//
//     componentDidMount() {
//         this.getLeagues()
//     }
//
//     getLeagues = () => {
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
//         axios.get(this.state.domain + "teams/" + leagueId)
//             .then((response) => {
//                 //debugger
//                 this.state.leagueTeams = response.data
//                 this.setState({
//                     leaguesList: []
//                 })
//                 this.state.leagueTeams.map((team) => {
//                     this.getPlayers(team, leagueId)
//                 })
//                 this.getGoalsAndTop3(leagueId);
//                 console.log(this.state.playersGoals)
//             })
//     }
//
//     getGoalsAndTop3 = (leagueId) => {
//         axios.get(this.state.domain + "history/" + leagueId)
//             .then((response) => {
//                 this.state.leagueHistory = response.data
//
//                 let flag = false;
//                 this.state.leagueHistory.map((game) => {  //fill map with players and their goals
//                     game.goals.map((goal) => {
//                         let player;
//                         this.state.playersGoals.forEach((val, key) => {
//                             if (key.id === goal.scorer.id) {
//                                 player = key;
//                             }
//                         });
//                         const currentGoals = this.state.playersGoals.get(player);
//                         const updateGoals = currentGoals + 1;
//                         this.state.playersGoals.set(player, updateGoals);
//                     })
//                     flag = true;
//                 })
//
//                 if (flag) {  // find the top 3 from map
//                     // alert("ok")
//                     let top3Scorers = ["", "", ""];
//                     let top3Goals = [0, 0, 0];
//
//
//                     for (const key of this.state.playersGoals.keys()) {
//                         for (let i = 0; i < 3; i++) {
//                             if (this.state.playersGoals.get(key) > top3Goals[i]) {
//                                 top3Goals[i] = this.state.playersGoals.get(key)
//                                 top3Scorers[i] = key.firstName + "  " + key.lastName
//                                 break;
//                             }
//                         }
//                     }
//                     console.log(top3Goals)
//                     console.log(top3Scorers)
//
//                     const finalJson = top3Scorers.reduce((acc, key, index) => {
//                         acc[key] = top3Goals[index];
//                         return acc;
//                     }, {});
//                     console.log(finalJson)
//
//                     this.setState({
//                         topScorers: finalJson
//                     })
//                 }
//             })
//     }
//
//     getPlayers = (team, leagueId) => {
//         axios.get(this.state.domain + "squad/" + leagueId + "/" + team.id)
//             .then((response) => {
//                 this.state.playerList = response.data
//
//                 this.state.playerList.map((player) => {
//                     this.state.playersGoals.set(player, 0)
//                 })
//
//             })
//     }
//
//     render() {
//         return (
//             <div className={"main"}>
//                 <header>
//                     <th> Top scorers table</th>
//                 </header>
//
//                 {this.state.leaguesList.map((league) => {
//                     return (
//                         <button onClick={() => this.getScorers(league.id)}> {league.name}</button>
//                     )
//                 })}
//                 <pre>{JSON.stringify(this.state.topScorers, null, 3).substring(1).slice(0, -1)}</pre>
//             </div>
//         );
//     }
// }
//
//
// export default TopScorersTable;
import React from "react";
import axios, {get} from "axios";
import PrintLeaguesTable from "./PrintLeaguesTable";
import LeaguesHomePage from "./LeaguesHomePage";

class TopScorersTable extends React.Component{

    state = {
        domain: 'https://app.seker.live/fm1/',
        leaguesList: [],
        leagueTeams: [],
        playerList: [],
        playersGoals: new Map([]),
        leagueHistory: [],
        top3Scorers: []

    }

    componentDidMount() {
        this.getLeagues()
    }

    getLeagues = () => {

        axios.get(this.state.domain + 'leagues')
            .then((response) => {
                this.setState({
                    leaguesList: response.data
                })
            });
    }

    getScorers = (leagueId) => {

        axios.get(this.state.domain+"teams/"+leagueId)
            .then((response) => {
                //debugger
                this.state.leagueTeams = response.data
                this.setState({
                    leaguesList: []
                })
                this.state.leagueTeams.map((team) => {
                    this.getPlayers(team,leagueId)
                })
                this.getLeagueHistory(leagueId);
                console.log(this.state.playersGoals)
                console.log(this.state.top3Scorers)

        })

    }

    getTheScorers = () => {

    }


    getLeagueHistory = (leagueId) => {
        axios.get(this.state.domain+"history/"+leagueId)
            .then((response) => {
                this.state.leagueHistory = response.data

                this.state.leagueHistory.map((game) => {
                    game.goals.map((goal) => {
                        let player;
                        this.state.playersGoals.forEach((val, key) => {
                            if (key.id === goal.scorer.id) {
                                player = key;
                            }
                        });
                        const currentGoals = this.state.playersGoals.get(player);
                        const updateGoals = currentGoals+1
                        this.state.playersGoals.set(player, updateGoals);
                    })
                })

                this.state.top3Scorers = ["","",""];
                let goals = [0,0,0];
                this.state.playersGoals.forEach((val,key) => {
                    for (let i=0; i<3; i++) {
                        if (val>goals[i]) {
                            goals[i] = val
                            this.state.top3Scorers[i] = key.firstName+" "+key.lastName
                            break;
                        }
                    }
                })

            })
    }

    getPlayers = (team,leagueId) => {
        axios.get(this.state.domain+"squad/"+leagueId+"/"+team.id)
            .then((response) => {
                this.state.playerList = response.data

                this.state.playerList.map((player) => {
                    this.state.playersGoals.set(player, 0)
                })

            })


    }




    render() {
        return (
            <div className={"main"}>
                <div>
                    Top scorers table
                </div>

                {this.state.leaguesList.map((league) => {
                    return (
                        <button onClick={() => this.getScorers(league.id)}> {league.name}</button>
                    )
                })}
            </div>
        );
    }

}


export default TopScorersTable;
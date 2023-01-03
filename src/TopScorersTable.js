import React from "react";
import axios, {get} from "axios";
import PrintLeaguesTable from "./PrintLeaguesTable";
import LeaguesHomePage from "./LeaguesHomePage";
import {wait} from "@testing-library/user-event/dist/utils";
import GetLeagues from "./GetLeagues";
import getLeagues from "./GetLeagues";

class TopScorersTable extends React.Component{

    state = {
        domain: 'https://app.seker.live/fm1/',
        leaguesList: [],
        leagueTeams: [],
        playerList: [],
        playersGoals: new Map([]),
        leagueHistory: [],
        topScorers: {
        }

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
                this.getGoalsAndTop3(leagueId);
                console.log(this.state.playersGoals)

        })

    }

    getTheScorers = () => {

    }


    getGoalsAndTop3 = (leagueId) => {
        axios.get(this.state.domain+"history/"+leagueId)
            .then((response) => {
                this.state.leagueHistory = response.data

                let flag = false;
                this.state.leagueHistory.map((game) => {  //fill map with players and their goals
                    game.goals.map((goal) => {
                        let player;
                        this.state.playersGoals.forEach((val, key) => {
                            if (key.id === goal.scorer.id) {
                                player = key;
                            }
                        });
                        const currentGoals = this.state.playersGoals.get(player);
                        const updateGoals = currentGoals+1;
                        this.state.playersGoals.set(player, updateGoals);
                    })
                    flag = true;
                })

                if (flag) {  // find the top 3 from map
                    alert("ok")
                    let top3Scorers = ["","",""];
                    let top3Goals = [0,0,0];


                    for (const key of this.state.playersGoals.keys()) {
                             for (let i=0; i<3; i++) {
                                 if (this.state.playersGoals.get(key)>top3Goals[i]) {
                                     top3Goals[i] = this.state.playersGoals.get(key)
                                     top3Scorers[i] = key.firstName+"  "+key.lastName
                                     break;
                                 }
                            }
                    }
                    console.log(top3Goals)
                    console.log(top3Scorers)

                    const finalJson = top3Scorers.reduce((acc, key, index) => {
                        acc[key] = top3Goals[index];
                        return acc;
                    }, {});
                    console.log(finalJson)

                    this.setState({
                        topScorers: finalJson
                    })


                }
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

                <pre>{JSON.stringify(this.state.topScorers,null,3).substring(1).slice(0, -1)}</pre>
            </div>
        );
    }

}


export default TopScorersTable;
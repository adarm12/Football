import React from "react";
import axios from "axios";
import PrintLeaguesTable from "./PrintLeaguesTable";
import LeaguesHomePage from "./LeaguesHomePage";

class TopScorersTable extends React.Component{

    state = {
        domain: 'https://app.seker.live/fm1/',
        leaguesList: [],
        leagueTeams: [],
        playerList: [],
        playersGoals: new Map([]),
        leagueHistory: []

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

                //the map- playersGoals has a problem in get and set (line 59), after fixing it should be done
        })

    }


    getLeagueHistory = (leagueId) => {
        axios.get(this.state.domain+"history/"+leagueId)
            .then((response) => {
                this.state.leagueHistory = response.data

                this.state.leagueHistory.map((game) => {
                    game.goals.map((goal) => {
                        const currentGoals = this.state.playersGoals.get(goal.scorer);
                        const updateGoals = currentGoals+1
                        this.state.playersGoals.set(goal.scorer, updateGoals);
                    })
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
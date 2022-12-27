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
        teamHistory: []

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
        })
    }

    getPlayers = (team,leagueId) => {
        axios.get(this.state.domain+"squad/"+leagueId+"/"+team.id)
            .then((response) => {
                this.state.playerList = response.data

            })

        axios.get(this.state.domain+"history/"+leagueId+"/"+team.id)
            .then((response) => {

                this.state.teamHistory = response.data
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
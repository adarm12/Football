import React from "react";
import axios from "axios";

class TopScorersTable extends React.Component{

    state = {
        domain: 'https://app.seker.live/fm1/',
        leaguesList: [],
        teamList: [],
        top3Scorers: [],
        top3ScorersForProcess: [],

    }

    componentDidMount() {
        this.getLeagues();
    }

    getLeagues = () => {
        axios.get(this.state.domain + 'leagues')
            .then((response) => {
                this.setState({
                    leaguesList: response.data
                })
            });
    }

    getScorers = (leagueId, leagueName) => {

        debugger
        axios.get(this.state.domain + '/teams/' + leagueId)
            .then((response) =>  {
                this.state.teamList = response.data
            })
        this.setState({
            leagueList: []
        })
        this.getTeam(this.state.teamList[0])
    }

    getTeam = (team) => {
        alert(team.name)
    }

    getTopThreeFromTeam = () => {

    }

    render() {
        return (
            <div className={"main"}>
                <div>
                    Top scorers table
                </div>

                {this.state.leaguesList.map((league,index) => {
                    return(
                        <div onClick={() => this.getScorers(league.id,league.name)}>{league.name}</div>
                    )
                })}


            </div>
        );
    }

}


export default TopScorersTable;
import React from "react";
import axios from "axios";
import PrintLeaguesTable from "./PrintLeaguesTable";
import PrintPlayersTable from "./PrintPlayersTable";

class LeaguesHomePage extends React.Component {
    state = {
        domain: 'https://app.seker.live/fm1/',
        currentList: [],
        playerList: [],
        leagueId: 0,
        teamId: 0,
        leagueName: "",
        description: "Those are the existing leagues:",
    }

    componentDidMount() {
        this.getLeagues();
    }

    getLeagues = () => {
        axios.get(this.state.domain + 'leagues')
            .then((response) => {
                this.setState({currentList: response.data})
            });
    }

    getTeam = (id, name) => {
        this.state.leagueId = id
        this.state.leagueName = name
        axios.get(this.state.domain + '/teams/' + this.state.leagueId)
            .then((response) => {
                this.setState(this.state.currentList = response.data)
                this.setState(this.state.description = "Those are the groups in the " + this.state.leagueName + " league:")
            })
    }

    getPlayersList = () => {
        // /squad/{leagueId}/{teamId}

    }

    render() {
        return (
            <div className="Main">
                <div>
                    {this.state.description}
                </div>
                <div>
                    <PrintLeaguesTable leagues={this.state.currentList} chooseTeam={this.getTeam}/>
                    {/*<PrintPlayersTable team = {this.state.currentList} />*/}
                </div>
            </div>
        );
    }
}

export default LeaguesHomePage;
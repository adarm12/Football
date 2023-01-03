import React from "react";
import PrintLeaguesTable from "./PrintLeaguesTable";
import axios from "axios";

class generalStatistics extends React.Component {

    state = {
        domain: 'https://app.seker.live/fm1/',
        leaguesList: [],
        leagueHistory: [],
        generalStats: {
            flag: false

        }

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

    getLeagueHistory = (leagueId) => {

        axios.get(this.state.domain + "history/" + leagueId)
            .then((response) => {

                this.setState({
                    leaguesList: []
                })

                this.state.leagueHistory = response.data

                this.countGoalsByHalves()
                this.earliestAndLatestGoal()
                this.bestAndWorstRound()

                this.state.generalStats.flag = true
                this.setState({
                    generalStats: this.state.generalStats
                })
            })
    }

    countGoalsByHalves = () => {

        let counterFirstHalf = 0;
        let counterSecondHalf = 0;
        this.state.leagueHistory.map((game) => {
            const gameGoals = game.goals;
            gameGoals.map((goal) => {
                if (goal.minute <= 45) {
                    counterFirstHalf++
                } else {
                    counterSecondHalf++
                }
            })
        })

        this.state.generalStats.firstHalfGoals = counterFirstHalf
        this.state.generalStats.secondHalfGoals = counterSecondHalf

    }


    earliestAndLatestGoal = () => {
        let earliestMin = 100;
        let earliestGoal;
        let latestMin = -1;
        let latestGoal;

        this.state.leagueHistory.map((game) => {
            const gameGoals = game.goals;
            gameGoals.map((goal) => {
                if (goal.minute < earliestMin) {
                    earliestMin = goal.minute;
                    earliestGoal = goal;
                }
                if (goal.minute > latestMin) {
                    latestMin = goal.minute;
                    latestGoal = goal;
                }
            })
        })

        this.state.generalStats.earliestGoal = earliestGoal
        this.state.generalStats.latestGoal = latestGoal
    }

    bestAndWorstRound = () => {
        const rounds = this.state.leagueHistory[this.state.leagueHistory.length - 1].round;
        let goalsCounters = new Array(rounds + 1);
        for (let i = 0; i < goalsCounters.length; i++) {
            goalsCounters[i] = 0;
        }

        this.state.leagueHistory.map((game) => {
            const goals = game.goals.length;
            goalsCounters[game.round] += goals;
        })

        const maxGoals = Math.max(...goalsCounters);
        const bestRound = goalsCounters.indexOf(maxGoals);
        const minGoals = Math.min(...goalsCounters.slice(1));
        const worstRound = goalsCounters.indexOf(minGoals);

        this.state.generalStats.mostGoalsRound = bestRound
        this.state.generalStats.lessGoalsRound = worstRound


    }

    render() {
        return (
            <div>
                <header>
                    <th> General statistics</th>
                </header>
                {this.state.leaguesList.map((league) => {
                    return (
                        <table onClick={() => {
                            this.getLeagueHistory(league.id)
                        }}> {league.name}</table>
                    )
                })}


                {
                    this.state.generalStats.flag == true ?
                        <table>
                            <div>goals scored in the first half: {this.state.generalStats.firstHalfGoals}</div>
                            <div>goals scored in the second half: {this.state.generalStats.secondHalfGoals}</div>
                            <div>earliest goal scored at
                                minute: {this.state.generalStats.earliestGoal.minute} by {this.state.generalStats.earliestGoal.scorer.firstName} {this.state.generalStats.earliestGoal.scorer.lastName}</div>
                            <div>latest goal scored at
                                minute: {this.state.generalStats.latestGoal.minute} by {this.state.generalStats.latestGoal.scorer.firstName} {this.state.generalStats.latestGoal.scorer.lastName}</div>
                            <div>most goals were in round: {this.state.generalStats.mostGoalsRound}</div>
                            <div>less goals were in round: {this.state.generalStats.lessGoalsRound}</div>
                        </table>
                        :
                        <div></div>
                }

            </div>

        )
    }
}

export default generalStatistics;
import React from "react";
import PrintDescription from "./PrintDescription";

function PrintTeamScoreHistory(props) {
    //https://app.seker.live/fm1/history/2/500
    return (
        <div>
            <PrintDescription description={props.description}/>
            <table className="TeamScoreHistory">
                <td>
                    <header> Round</header>
                    {props.history.map((history) => {
                        return (
                            <tr>
                                <td>
                                    {history.round}
                                </td>
                            </tr>
                        )
                    })
                    }
                </td>
                <td>
                    <header> Games Number</header>
                    {props.history.map((history) => {
                        return (
                            <tr>
                                <td>
                                    {history.goals.length}
                                </td>
                            </tr>
                        )
                    })
                    }
                </td>
                <td>
                    <header> Home Team</header>
                    {props.history.map((history) => {
                        return (
                            <tr>
                                <td>
                                    {history.homeTeam.name}
                                </td>
                            </tr>
                        )
                    })
                    }
                </td>
                <td>
                    <header> Home Team Goals</header>
                    {props.homeScoreList.map((homeScoreList) => {
                        return (
                            <tr>
                                <td>
                                    {homeScoreList}
                                </td>
                            </tr>
                        )
                    })
                    }
                </td>
                <td>
                    <header> Away Team</header>
                    {props.history.map((history) => {
                        return (
                            <tr>
                                <td>
                                    {history.awayTeam.name}
                                </td>
                            </tr>
                        )
                    })
                    }
                </td>
                <td>
                    <header> Away Team Goals</header>
                    {props.awayScoreList.map((awayScoreList) => {
                        return (
                            <tr>
                                <td>
                                    {awayScoreList}
                                </td>
                            </tr>
                        )
                    })
                    }
                </td>
                <td>
                    <header>Difference</header>
                    {props.teamDifference.map((teamDifference) => {
                        return (
                            <tr>
                                <td>
                                    {teamDifference}
                                </td>
                            </tr>
                        )
                    })
                    }
                </td>
            </table>
        </div>
    )
}

export default PrintTeamScoreHistory;
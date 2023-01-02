import printTeamTable from "./PrintTeamTable";
import React from "react";
import PrintDescription from "./PrintDescription";

function PrintScoreTeamHistory(props) {
    //https://app.seker.live/fm1/history/2/500
    return (
        <div>
            <div>
                <PrintDescription description={props.description}/>
            </div>

            <table>
                <header>
                    {/*<td>*/}
                    {/*    history: {props.history.length}*/}
                    <td>
                        Round
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
                        home Team
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
                        Home Team Win
                        {props.history.map((history, index) => {
                            return (
                                history.goals.map((cell, cellIndex) => {
                                    return (
                                        <tr>
                                            <td>
                                                {cell.id}
                                            </td>
                                        </tr>
                                    )})
                            )
                        })
                        }
                    </td>
                    <td>
                        Away Team
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
                        Away Team Win
                        {/*{props.history.map((history, index) => {*/}
                        {/*    return (*/}
                        {/*        history.goals.map((cell, cellIndex) => {*/}
                        {/*            return (*/}
                        {/*                <tr>*/}
                        {/*                    <td>*/}
                        {/*                        {cell.id}*/}
                        {/*                    </td>*/}
                        {/*                </tr>*/}
                        {/*            )})*/}
                        {/*    )*/}
                        {/*})*/}
                        {/*}*/}
                    </td>
                    <td>
                        Goal Difference
                    </td>
                </header>
            </table>
        </div>
    )
}

export default PrintScoreTeamHistory;
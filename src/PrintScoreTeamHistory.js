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
                        {props.history.map((history,index) => {
                            return (
                                <tr>
                                    <td>
                                        {history.goals.length}
                                    </td>
                                </tr>)

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
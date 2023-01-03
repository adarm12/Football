import React from "react";
import PrintDescription from "./PrintDescription";

function PrintScoreTeamHistory(props) {
    //https://app.seker.live/fm1/history/2/500
    return (
        <div>
            <PrintDescription description={props.description}/>
            <table>
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
                    <header> Home Team Win</header>
                    {props.history.map((history, index) => {
                        return (
                            history.goals.map((cell, cellIndex) => {
                                return (
                                    <tr>
                                        <td>
                                            {cell.id}
                                        </td>
                                    </tr>
                                )
                            })
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
                    <header> Away Team Win</header>
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
        </table>
</div>
)
}

export default PrintScoreTeamHistory;
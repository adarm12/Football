import React from "react";
import PrintDescription from "./PrintDescription";

function PrintHistoryTable(props) {
    return (
        <div>
            <PrintDescription description={props.description}/>
            <table className="historyLeaguesTable">
                <td>
                    <header>Round</header>
                    {props.historyList.map((history) => {
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
                    <header>Games Number</header>
                    {props.historyList.map((history) => {
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
                    <header>Home Team Name</header>
                    {props.historyList.map((history) => {
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
                    <header>Home Team Goals</header>
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
                    <header>Away Team Name</header>
                    {props.historyList.map((history) => {
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
                    <header>Away Team Goals</header>
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
                    {props.difference.map((difference) => {
                        return (
                            <tr>
                                <td>
                                    {difference}
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

export default PrintHistoryTable;
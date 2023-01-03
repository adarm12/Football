import React from "react";
import PrintDescription from "./PrintDescription";

function PrintHistoryTable(props) {
    return (
        <div>
            <PrintDescription description={props.description}/>
            <table className="historyLeaguesTable">
                <td>
                    <header> Round</header>
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
                    <header> Home Team Name</header>
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
                    <header> Home Team Score</header>
                    {props.historyList.map((history, index) => {
                        return (
                            history.goals.map((cell, cellIndex) => {
                                return (
                                    <tr>
                                        <td>
                                            {cell.home === true? "1" : "0"}
                                        </td>
                                    </tr>
                                )
                            })
                        )
                    })
                    }
                </td>
                <td>
                    <header>Away Team Score</header>
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
                    <header>
                        Away Team Score
                        {props.historyList.map((history, index) => {
                            return (
                                history.goals.map((cell, cellIndex) => {
                                    return (
                                        <tr>
                                            <td>
                                                {cell.home === false? "1" : "0"}
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                        })
                        }
                    </header>
                </td>

            </table>
        </div>
    )
}

export default PrintHistoryTable;
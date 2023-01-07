import PrintDescription from "./PrintDescription";
import React from "react";

function PrintTopScoreTable(props) {
    return (
        <div>

            <PrintDescription description={props.description}/>
            <table className="teamTable">
                <td>
                    <header>Player Name</header>
                    {props.historyList.map((historyList) => {
                        return (
                            <tr>
                                <td>
                                    {historyList.firstName} {historyList.lastName}
                                </td>
                            </tr>
                        )
                    })
                    }
                </td>
                <td>
                    <header>Goals Number</header>
                    {props.historyList.map((historyList) => {
                        return (
                            <tr>
                                <td>
                                    {historyList.goals}
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

export default PrintTopScoreTable;
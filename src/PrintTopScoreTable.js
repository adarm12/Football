import PrintDescription from "./PrintDescription";
import React from "react";

function PrintTopScoreTable(props) {
    return (
        <div>

            <PrintDescription description={props.description}/>
            <table style={{width : 250}} className="teamTable">
                <td>
                    Player Name
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
                    goals Number
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
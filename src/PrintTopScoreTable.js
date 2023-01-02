import PrintDescription from "./PrintDescription";
import React from "react";

function PrintTopScoreTable(props) {
    return (
        <div>
            <PrintDescription description={props.description}/>
            <table className="teamTable">
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
                    {/*{props.historyList.map((team, index) => {*/}
                    {/*    return (*/}
                    {/*        team.goals.map((list, cellIndex) => {*/}
                    {/*            return (*/}
                    {/*                <tr>*/}
                    {/*                    <td>*/}
                    {/*                        {list.scorer.firstName} {list.scorer.lastName}*/}
                    {/*                    </td>*/}
                    {/*                </tr>*/}
                    {/*            )*/}
                    {/*        })*/}
                    {/*    )*/}
                    {/*})*/}
                    {/*}*/}
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
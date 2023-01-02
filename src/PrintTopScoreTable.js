import PrintDescription from "./PrintDescription";
import React from "react";

function PrintTopScoreTable(props) {
    return (
        <div>
            <PrintDescription description={props.description}/>
            <table className="teamTable">
                {props.teamList.map((team, index) => {
                    return (
                        team.goals.map((list, cellIndex) => {
                            return (
                                <tr>
                                    <td>
                                        {list.scorer.firstName} {list.scorer.lastName}

                                    </td>
                                </tr>
                            )
                        })
                    )
                })
                }
            </table>
        </div>
    )
}

export default PrintTopScoreTable;
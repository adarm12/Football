import React from "react";
import PrintDescription from "./PrintDescription";

function PrintTeamTable(props) {
    return (
        <div>
            <PrintDescription description = {props.description} />
            <table>
                {props.teamList.map((team) => {
                    return (
                        <tr>
                            <td onClick={() => props.getPlayersAndHistory(team.id, team.name)}>
                                {team.name}
                            </td>
                        </tr>
                    )
                })
                }
            </table>
        </div>
    )
}

export default PrintTeamTable;
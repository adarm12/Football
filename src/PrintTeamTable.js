import React from "react";

function PrintTeamTable(props) {
    return (
        <div>
            <table>
                {props.teamList.map((team) => {
                    return (
                        <tr>
                            <td onClick={() => props.get(team.id, team.name)}>
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
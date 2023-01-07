import React from "react";
import PrintDescription from "./PrintDescription";

function PrintTeamTable(props) {
    return (
        <div>
            <PrintDescription description = {props.description} />
            <table className="TeamTable">
                {props.teamList.map((team) => {
                    return (
                            <tr onClick={() => props.getPlayersAndHistory(team.id, team.name)}>
                                {team.name}
                            </tr>
                    )
                })
                }
            </table>
        </div>
    )
}

export default PrintTeamTable;
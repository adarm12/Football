import React from "react";

function PrintLeaguesTable(props) {
    return (
        <div>
            <table>
                {props.leaguesList.map((league) => {
                    return (
                        <tr onClick={() => props.getTeams(league.id, league.name)}>
                            <td>
                                {league.name}
                            </td>
                        </tr>
                    )
                })
                }
            </table>
        </div>
    )
}

export default PrintLeaguesTable;
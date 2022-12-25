import React from "react";

function PrintLeaguesTable(props)
{
    return(
        <div>
            <table>
                {props.leagues.map((league, index) => {
                    return (
                        <tr onClick={() => props.chooseTeam(league.id, league.name)}>
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
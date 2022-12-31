import React from "react";
import axios from "axios";
import PrintDescription from "./PrintDescription";

function PrintLeaguesTable(props) {
    return (

        <div>
            <PrintDescription description={props.description}/>
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
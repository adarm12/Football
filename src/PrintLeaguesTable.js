import React from "react";
import PrintDescription from "./PrintDescription";

function PrintLeaguesTable(props) {
    return(
        <div>
            <PrintDescription description={props.description}/>
            <table className="leaguesTable">
                {props.leaguesList.map((league) => {
                    return (
                        <tr onClick={() => props.getTeams(league.id, league.name)}>
                            {league.name}
                        </tr>
                    )

                })
                }
            </table>
        </div>
    )
}

export default PrintLeaguesTable;
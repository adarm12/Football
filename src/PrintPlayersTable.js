import React from "react";
import PrintDescription from "./PrintDescription";

function PrintPlayersTable(props)
{
    return(
        <div>
            <div>
                <PrintDescription description = {props.description} />
            </div>
            <table>
                {props.players.map((player) => {
                    return (
                        <tr>
                            <td>
                                {player.firstName} {player.lastName}
                            </td>
                        </tr>
                    )
                })
                }
            </table>
        </div>
    )
}

export default PrintPlayersTable;
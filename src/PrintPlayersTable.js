import React from "react";
import PrintDescription from "./PrintDescription";

function PrintPlayersTable(props) {

    return (
        <table>
            <PrintDescription description={props.description}/>
            <table style={{width: 400}} className="playersTable">
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
        </table>
    )
}

export default PrintPlayersTable;
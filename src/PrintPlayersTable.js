import React from "react";
import PrintDescription from "./PrintDescription";

function PrintPlayersTable(props) {

    return (
        <div>
            <PrintDescription description={props.description}/>
            <table style={{margin: "auto"}} className="playersTable">
                    {props.players.map((player) => {
                        return (
                            <tr>
                                    {player.firstName} {player.lastName}
                            </tr>
                        )
                    })
                    }
            </table>
        </div>
    )
}

export default PrintPlayersTable;
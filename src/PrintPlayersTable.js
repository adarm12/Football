import React from "react";

function PrintPlayersTable(props)
{
    return(
        <div>
            <table>
                {props.team.map((t, index) => {
                    return (
                        <tr>
                            <td>
                                {t.name}
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
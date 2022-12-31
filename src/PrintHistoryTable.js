import React from "react";

function PrintHistoryTable(props) {
    return (
        <div>
            <div className= "historyLeaguesTable" >
                <td>
                    <header>
                       Round
                    </header>
                </td>
                <td>
                    <header>
                       Home Team Name
                    </header>
                </td>
                <td>
                    <header>
                       Home Team Score
                    </header>
                </td>
                <td>
                    <header>
                        Away Team Score
                    </header>
                </td>
                <td>
                    <header>
                        Away Team Score
                    </header>
                </td>

            </div>
        </div>
    )
}

export default PrintHistoryTable;
import printTeamTable from "./PrintTeamTable";

function PrintScoreTeamHistory() {
    //https://app.seker.live/fm1/history/2/500
    return (
        <div>
            <table>
                <header>
                    <td>
                        Team Name
                    </td>
                    <td>
                        Round
                    </td>
                    <td>
                        Games Number
                    </td>
                    <td>
                        Win
                    </td>
                    <td>
                        Equality
                    </td>
                    <td>
                        Score
                    </td>
                    {/*<td>*/}
                    {/*    Goal Difference*/}
                    {/*</td>*/}
                </header>
            </table>
        </div>
    )
}

export default PrintScoreTeamHistory;
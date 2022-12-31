import printTeamTable from "./PrintTeamTable";
import React from "react";

function PrintScoreTeamHistory(props) {
    //https://app.seker.live/fm1/history/2/500
    return (
        <div>
            <table>
                <header>
                    <td>
                        {props.history.length}
                        {/*{props.history.map((his) => {*/}
                        {/*    return (*/}
                        {/*        <tr>*/}
                        {/*            <td>*/}
                        {/*                {his.round}*/}
                        {/*            </td>*/}
                        {/*        </tr>*/}
                        {/*    )*/}
                        {/*})*/}
                        {/*}*/}
                    {/*</td>*/}
                    {/*<td>*/}
                    {/*    Games Number*/}
                    {/*</td>*/}
                    {/*<td>*/}
                    {/*    Win*/}
                    {/*</td>*/}
                    {/*<td>*/}
                    {/*    Equality*/}
                    {/*</td>*/}
                    {/*<td>*/}
                    {/*    Score*/}
                    {/*</td>*/}
                    {/*/!*<td>*!/*/}
                    {/*/!*    Goal Difference*!/*/}
                    </td>
                </header>
            </table>
        </div>
    )
}

export default PrintScoreTeamHistory;
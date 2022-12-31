import React from "react";
import PrintLeaguesTable from "./PrintLeaguesTable";
import PrintHistoryTable from "./PrintHistoryTable";

class LeagueResultsHistoryPage extends React.Component {

    render() {
        return (
            <div>
                League results history

                <PrintHistoryTable />


            </div>
        )
    }
}

export default LeagueResultsHistoryPage;
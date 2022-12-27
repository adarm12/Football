import React from "react";
import axios from "axios";
import PrintLeaguesTable from "./PrintLeaguesTable";
import LeaguesHomePage from "./LeaguesHomePage";

class TopScorersTable extends React.Component{

    state = {
        domain: 'https://app.seker.live/fm1/',



    }



    render() {
        return (
            <div className={"main"}>
                <div>
                    Top scorers table
                </div>

            </div>
        );
    }

}


export default TopScorersTable;
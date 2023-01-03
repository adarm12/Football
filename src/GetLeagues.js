import axios from "axios";

function GetLeagues(domain) {

    axios.get(domain + 'leagues')
        .then((response) => {
            alert("ok")
            return response.data
        });

}

export default GetLeagues


import axios from 'axios';

const Api = () => {

    const getData = () => {
        
        const api = 'https://api.kenoby.com/positions';

        const config = { headers: {"x-tenant": "55b7e031299d4e33019c1c5a",  "x-version": "3.0.0" }};

        return axios.get(api, config);
    }

    return {
        getData
    }
}

export default Api;
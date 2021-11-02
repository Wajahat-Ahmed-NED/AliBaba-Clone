import axios from 'axios';

const instance = axios.create({
    baseURL:'http://localhost:5001/onlinewebmobile-86b64/us-central1/api'
    // ' // api {cloud funtion} URL
});

export default instance;
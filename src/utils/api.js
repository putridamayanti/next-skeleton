import axios from "axios";

const Instance = axios.create({
    baseURL: process.env.API_URL
});

const Api = {
    Instance
}

export default Api;
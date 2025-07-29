import Axios from "axios";

const axios = Axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});

export default axios;
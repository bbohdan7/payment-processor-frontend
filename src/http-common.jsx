import axios from 'axios';

export default axios.create({
    baseURL: "http://192.168.0.131:30920/payment-processor/api/",
    headers: {
        "Content-Type": "application/json"
    }
});

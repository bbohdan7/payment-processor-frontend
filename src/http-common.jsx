import axios from 'axios';

export default axios.create({
    baseURL: "http://192.168.0.103:32555/payment-processor/api/",
    headers: {
        "Content-Type": "application/json"
    }
});
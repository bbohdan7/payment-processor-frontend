import axios from 'axios';

export default axios.create({
    baseURL: "http://payment-processor-backend:9080/payment-processor/api/",
    headers: {
        "Content-Type": "application/json"
    }
});
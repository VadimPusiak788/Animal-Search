import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://djangoanimal-env.eba-emiqdphm.eu-central-1.elasticbeanstalk.com/api/',
    timeout: 5000,
    headers: {
        'Authorization': "Token " + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

export default axiosInstance;
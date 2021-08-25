import axios from 'axios';

// axios.defaults.baseURL = "http://169.239.171.102:8083";
// axios.defaults.baseURL = "https://mymawingu.azurewebsites.net";
// axios.defaults.baseURL = "https://mymawingu-mysql.mawingunetworks.com/";
axios.defaults.baseURL = "https://admin.mawingunetworks.com";

axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
})

axios.interceptors.response.use(response => {
    console.log('Response:', response)
    return response
})

export default axios;
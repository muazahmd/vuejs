import axios from 'axios'

const axiosClient = axios.create({
  baseURL: "",
  headers: {
    'token': '2222',
  }
});


export default axiosClient;


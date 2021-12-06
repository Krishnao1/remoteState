import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.mystral.in',
  });

export default instance;
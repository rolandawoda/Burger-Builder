import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-my-app.firebaseio.com/'
});

export default instance;
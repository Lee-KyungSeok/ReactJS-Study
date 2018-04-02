import axios from 'axios';

const API_KEY = ''

export function getAPOD(date = '') {
    return axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`);
}

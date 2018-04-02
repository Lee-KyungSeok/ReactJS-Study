import axios from 'axios';

const API_KEY = 'DchvVpGt5YgIv9Tq7XAA2KvJV5QWXSFaOYwdbf5e'

export function getAPOD(date = '') {
    return axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`);
}
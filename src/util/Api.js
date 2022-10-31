import axios from 'axios';

export const httpClient = axios.create({
  baseURL: `https://api.sevensafeservices.com/api/`, //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});

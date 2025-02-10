import { GREEN_API_URL } from '@/lib/constants/api';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: GREEN_API_URL,
});

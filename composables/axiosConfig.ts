import axios from 'axios';
const config = useRuntimeConfig()
const baseURL = config.public.env === "local"
    ? "http://localhost:8000/api/"
    : "http://192.168.1.104:8000/api/"
const app = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
app.interceptors.response.use(
    response => (response),
    error => (Promise.reject(error.response.data.err))
)

export default app;
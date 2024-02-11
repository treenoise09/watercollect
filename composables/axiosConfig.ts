import axios from 'axios';
const config = useRuntimeConfig()
const baseURL = config.public.base_url
console.log(baseURL)
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
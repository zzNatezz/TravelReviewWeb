import axios from "axios"

const axiosInstance = axios.create({
    url: "https://be-travel-review.vercel.app",
    withCredentials: true
})


export default axiosInstance
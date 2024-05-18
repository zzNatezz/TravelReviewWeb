import axios from "axios";
import { loginFail, loginStart, loginSuccess } from "./authState";
import toast from "react-hot-toast";

export const ApiLogin = async (user:any, dispatch : any, router :any) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("https://be-travel-review.vercel.app/v1/auth/login", user)
        dispatch(loginSuccess(res.data));
        toast.success('Login Successfully')
        router.push('/')
    } catch (error) {
        toast.error('Please double check email and password')
        dispatch(loginFail())
    }
}
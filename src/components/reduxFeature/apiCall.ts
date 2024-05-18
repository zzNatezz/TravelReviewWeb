import axios from "axios";
import { loginFail, loginStart, loginSuccess } from "./authState";
import toast from "react-hot-toast";
import { registerFail, registerStart, registerSuccess } from "./registerRedux";

export const ApiLogin = async (user:any, dispatch : any, router :any) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("https://be-travel-review.vercel.app/v1/auth/login", user,{withCredentials : true})
        dispatch(loginSuccess(res.data));
        toast.success('Login Successfully')
        router.push('/')
    } catch (error) {
        toast.error('Please double check email and password')
        dispatch(loginFail())
    }
}

export const ApiRegister = async (user : any, dispatch : any, router : any) => {
    dispatch(registerStart());
    try {
        await axios.post("https://be-travel-review.vercel.app/v1/auth/register", user)
        await dispatch(registerSuccess()).then(() =>toast.success('Register Successfully'));
        router.push('/login')
    } catch (error) {
        toast.error('Something went wrong, please try again')
        dispatch(registerFail())
    }
}
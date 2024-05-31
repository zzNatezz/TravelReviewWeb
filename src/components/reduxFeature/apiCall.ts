import axios from "axios";
import { loginFail, loginStart, loginSuccess } from "./authState";
import toast from "react-hot-toast";
import { registerFail, registerStart, registerSuccess } from "./registerRedux";
import { getUserListFail, getUserListStart, getUserListSuccess } from "./getAlluser";
import { getPostFail, getPostStart, getPostSuccess } from "./getPostId";


export const ApiLogin = async (user:any, dispatch : any, router :any) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("https://be-travel-review.vercel.app/v1/auth/login", user,{withCredentials : true})
        dispatch(loginSuccess(res.data));
        toast.success('Login Successfully')
        router.push('/')
    } catch (error) {
        toast.error('Please double check email and password')
        console.log(error);
        
        dispatch(loginFail())
    }
}

export const ApiRegister = async (user : any, dispatch : any, router : any) => {
    dispatch(registerStart());
    try {
        await axios.post("https://be-travel-review.vercel.app/v1/auth/register", user)
        dispatch(registerSuccess());
        toast.success('Register Successfully');
        router.push('/login')
    } catch (error) {
        toast.error('Something went wrong, please try again')
        console.log(error);
        
        dispatch(registerFail())
    }
}

// export const ApiRefToken = async() =>{
//     try {
//         const res = await axios.post("https://be-travel-review.vercel.app/v1/auth/refresh",{withCredentials : true})
//         console.log(res);
//         toast.success("Authenticated")
//         return res.data
//     } catch (error :any) {
//         toast.error(error?.response?.data)
//         console.log(error);
        
//     }
// }

export const ApiGetAllUser = async(accessToken : any ,dispatch : any , axiosJWT : any) =>{
    dispatch(getUserListStart());
    try {
        const res = await axiosJWT.get('https://be-travel-review.vercel.app/v1/user', {
            headers : {token : `Bearer ${accessToken}`}
        }); 
        dispatch(getUserListSuccess(res.data))
    } catch (error) {
        dispatch(getUserListFail())
        console.log(error);
        
    }
}

export const ApiGetpostWithID = async(postId : string , dispatch : any) =>{
    dispatch(getPostStart())
    try {
        const res = await axios.get(`https://be-travel-review.vercel.app/v1/content/${postId}`)
        dispatch(getPostSuccess(res.data))
    } catch (error) {
        dispatch(getPostFail())
        console.log(error);
        
    }
}

import axios from "axios";
import { loginFail, loginStart, loginSuccess } from "../components/reduxFeature/authState";
import toast from "react-hot-toast";
import { registerFail, registerStart, registerSuccess } from "../components/reduxFeature/registerRedux";
import { getUserListFail, getUserListStart, getUserListSuccess } from "../components/reduxFeature/getAlluser";
import { getPostFail, getPostStart, getPostSuccess } from "../components/reduxFeature/getPostId";
import { postFail, postStart, postSuccess } from "../components/reduxFeature/postState";
import { removedPostFail, removedPostStart, removedPostSuccess } from "../components/reduxFeature/removePost";
import { loadingEnd, loadingStart } from "../components/reduxFeature/reloadingState";
import { ModifyContentEnd, ModifyContentStart, ModifyContentSuccess } from "@/components/reduxFeature/modifyContent";


export const ApiLogin = async (user:any, dispatch : any, router :any) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("https://be-travel-review.vercel.app/v1/auth/login", user,{withCredentials : true})
        dispatch(loginSuccess(res.data));
        localStorage.setItem('AC', JSON.stringify(res.data) || "");
        toast.success('Login Successfully');
        router.push('/');
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

export const ApiPost = async(userId : string, content : any ,dispatch : any) => {
    dispatch(postStart());
    try {
        const res = await axios.post(`https://be-travel-review.vercel.app/v1/content/${userId}`,content);
        dispatch(postSuccess(res.data));
        toast.success("Post successfully");

    } catch (error) {
        dispatch(postFail());
        console.log(error);
        
    }
}

export const ApiRemovePost = async(userId : string, postId : string, dispatch : any) => {
    dispatch(removedPostStart());
    try {
        const res = await axios.delete(`https://be-travel-review.vercel.app/v1/content/${userId}/${postId}`);        
        dispatch(removedPostSuccess());
        toast.success(res?.data)
    } catch (error : any) {
        const mes_err = error?.response?.data;
        toast.error(mes_err);
        dispatch(removedPostFail());
    }
}

export const ApiContentModify = async( userId : string, postId : string, content : any, dispatch : any) => {
    dispatch(ModifyContentStart());
    try {
        const res = await axios.put(`https://be-travel-review.vercel.app/v1/content/string/${userId}/${postId}`,content);
        toast.success(res?.data)
        dispatch(ModifyContentSuccess(res.data));
        dispatch(ModifyContentEnd());
    } catch (error) {
        toast.error('Something went wrong')
        console.log(error);
        dispatch(ModifyContentEnd());
    }
}
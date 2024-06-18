import axios from "axios";
import { loginFail, loginStart, loginSuccess } from "../components/reduxFeature/authState";
import toast from "react-hot-toast";
import { registerFail, registerStart, registerSuccess } from "../components/reduxFeature/registerRedux";
import { getUserListFail, getUserListStart, getUserListSuccess } from "../components/reduxFeature/getAlluser";
import { getPostFail, getPostStart, getPostSuccess } from "../components/reduxFeature/getPostId";
import { postFail, postStart, postSuccess } from "../components/reduxFeature/postState";
import { removedPostFail, removedPostStart, removedPostSuccess } from "../components/reduxFeature/removePost";
import { ModifyContentEnd, ModifyContentStart, ModifyContentSuccess } from "@/components/reduxFeature/modifyContent";
import { CommentPostFail, CommentPostStart, CommentPostSuccess } from "@/components/reduxFeature/postCommentState";
import { modifyCmtEnd, modifyCmtStart, modifyCmtSuccess } from "@/components/reduxFeature/modifyCmt";
import { removedCommentEnd, removedCommentStart, removedCommentSuccess } from "@/components/reduxFeature/removeCmtState";
import { likeEnd, likeError, likeFinish, likeStart } from "@/components/reduxFeature/isLike";
import { useSelector } from "react-redux";
import { loadingEnd, loadingStart } from "@/components/reduxFeature/reloadingState";
import { QuserFail, QuserStart, QuserSuccess } from "@/components/reduxFeature/qUser";


export const ApiLogin = async (user:any, dispatch : any, router :any) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("https://be-travel-review.vercel.app/v1/auth/login", user,{withCredentials : true})
        dispatch(loginSuccess(res?.data)); 
        toast.success('Login Successfully');
        localStorage.setItem('gbl_au_tk', JSON.stringify(res?.data))
        router.push('/');
    } catch (error : any) {
        toast.error(error?.response?.data)
        console.log("login error =>",error);
        dispatch(loginFail())       
    }

}


export const ApiRefToken = async() =>{
    try {
        const res = await axios.post("https://be-travel-review.vercel.app/v1/auth/refresh",{},{withCredentials : true})
        toast.success("Authenticated");
        localStorage.setItem('gbl_au_tk', JSON.stringify(res?.data))        
        return res?.data?.new_access_token
    } catch (error :any) {
        toast.error(error?.response?.data)        
    }

}

export const ApiGetAllUser = async(accessToken : any ,dispatch : any , axiosJWT : any) =>{
    dispatch(getUserListStart());
    try {
        const res = await axiosJWT.get('https://be-travel-review.vercel.app/v1/user', {
            headers : {token : `Bearer ${accessToken}`}
        });
        console.log(res?.data);
             
        dispatch(getUserListSuccess(res.data))
    } catch (error) {
        dispatch(getUserListFail())
        console.log(error);
        
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

export const ApiPost = async( accessToken : any, userId : string, form : any ,dispatch : any, axiosJWT : any ) => {
    dispatch(postStart());
    try {
        const res = await axiosJWT.post(`https://be-travel-review.vercel.app/v1/content/${userId}`,form,{
            headers : {token : `Bearer ${accessToken}`}
        });
        console.log(accessToken);
        

        dispatch(postSuccess(res.data));
        toast.success("Post successfully");

    } catch (error : any) {
        dispatch(postFail());
        toast.error(error?.response?.data)        
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
    } catch (error : any) {
        toast.error(error?.response?.data)
        dispatch(ModifyContentEnd());
    }
}

export const ApiPostComment = async(userId : string, postId : string, content : any, dispatch : any) =>{
    dispatch(CommentPostStart());
    try {
        const res = await axios.post(`https://be-travel-review.vercel.app/v1/comment/${userId}/${postId}`,content);
        toast.success(res?.data);
        dispatch(CommentPostSuccess(res.data));
        dispatch(CommentPostFail());
    } catch (error : any) {
        toast.error(error?.response?.data)
        dispatch(CommentPostFail());
        
    }
}

export const ApiModifyCmt = async(userId : string, postId : string | null, cmtId : string, content : any, dispatch : any) => {
    dispatch(modifyCmtStart());
    try {
        const res = await axios.put(`https://be-travel-review.vercel.app/v1/comment/${postId}/${userId}/${cmtId}`,content);
        toast.success(res?.data);
        dispatch(modifyCmtSuccess(res.data))
        dispatch(modifyCmtEnd())
    } catch (error : any) {
        toast.error(error?.response?.data)
        dispatch(modifyCmtEnd())
    }
}

export const ApiRemoveCmt = async(userId : string, postId : string |null , cmtId : string, dispatch : any) => {
    dispatch(removedCommentStart());
    try {
        const res = await axios.delete(`https://be-travel-review.vercel.app/v1/comment/${postId}/${userId}/${cmtId}`);
        toast.success(res?.data);
        dispatch(removedCommentSuccess(res.data));
        dispatch(removedCommentEnd());
    } catch (error : any) {
        toast.error(error?.response?.data);
        dispatch(removedCommentEnd());
    }
}

export const ApiLikePost = async (userId : string, postId : string, dispatch : any) => {
    dispatch(likeStart())
    try {
        const res = await axios.put(`https://be-travel-review.vercel.app/v1/like/${userId}/${postId}`)
        dispatch(likeEnd())
    } catch (error : any) {
        toast.error(error?.response?.data)
        dispatch(likeError())
    }
}

export const  LikedPost = async (userId : string, dispatch : any) => {
    try {
        const res = await axios.get(`https://be-travel-review.vercel.app/v1/like/${userId}`)        
        dispatch(likeFinish(res?.data[0]?.listLike))
    } catch (error : any) {

        
    }
}

export const ApiLogOut = async (dispatch : any , router : any) => {
    try {
        const res = await axios.post('https://be-travel-review.vercel.app/v1/auth/logout',{})
        localStorage.removeItem('gbl_au_tk')
        router.push('/login');
        dispatch(loginFail())
        toast.success(res?.data)
    } catch (error) {
        console.log(error);
   }
}
export const Api_Q_user = async (dispatch : any, keyword : string) => {
    dispatch(QuserStart())
    try {
        const res = await axios.get(`https://be-travel-review.vercel.app/v1/user/query/${keyword}`)
        dispatch(QuserSuccess(res?.data))
    } catch (error) {
        console.log(error);
        dispatch(QuserFail())
   }
}

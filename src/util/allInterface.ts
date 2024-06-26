import axios from "axios";
import { JwtPayload } from "jwt-decode";
import { StaticImageData } from "next/image";

export   interface IuserLogin {
    user: {
        _id : string
      email: string,
      userName : string,
      admin : boolean,
      avatar : any
      
    };
  }

  
export interface IFormLogin {
  email: string;
  password: string;
}

  export interface InewAccessToken{
    new_access_token : string
  }

  export interface IReview extends StaticImageData{
    review ?: any
  }

  export interface IpopUp {
    item : any,
    index ?: number,
    avatar : string
    isUserId : string
  }

  export interface ICommentListInAPI{
    _id : any,
    comment : any,
    userId : any
  }

  export interface IReloading{
    size : number,
    className : string
  }

  export interface IuserJWTPayLoad extends JwtPayload{
    user ?: any
  }

  export interface IEditComment {
    item : any,
    index ?: number,
    postId: string | null;
  }

  export interface IEditPostUp {
    item : any,
    index ?: number,
  }

  export let axiosJWT = axios.create({
    withCredentials: true,
  });

  export interface IDebounce {
    cb : any,
    delay : Number
  }
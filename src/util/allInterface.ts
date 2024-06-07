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

  export interface InewAccessToken{
    new_access_token : string
  }

  export interface IReview extends StaticImageData{
    review ?: any
  }

  export interface IpopUp {
    item : any,
    index ?: number,
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

  export interface IEditComment extends IpopUp {
    postId: string | null;
  }
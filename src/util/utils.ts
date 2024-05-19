export   interface IuserLogin {
    user: {
        _id : string
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string,
      admin : boolean
      
    };
  }

  export interface InewAccessToken{
    new_access_token : string
  }
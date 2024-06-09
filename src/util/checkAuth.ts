import { loginFail, loginSuccess } from '@/components/reduxFeature/authState';
import { jwtDecode } from 'jwt-decode';

const checkAuth = (dispatch : any , user : string) => {

    try {
        const decode = jwtDecode(user);
        if (!decode) throw new Error("Invalid token");
        dispatch(loginSuccess(user));
      } catch (error) {
        dispatch(loginFail());
      }
}


export default checkAuth
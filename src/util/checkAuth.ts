import { loginFail, loginSuccess } from '@/components/reduxFeature/authState';
import { jwtDecode } from 'jwt-decode';

const checkAuth = (dispatch : any) => {
    const getAcFromLocal = global?.window.localStorage.getItem("AC")
    ? JSON.parse(localStorage.getItem("AC") || "")
    : null;
    try {
        const decode = jwtDecode(getAcFromLocal);
        if (!decode) throw new Error("Invalid token");
        dispatch(loginSuccess(getAcFromLocal));
      } catch (error) {
        dispatch(loginFail());
      }
}


export default checkAuth
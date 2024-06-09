import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../components/reduxFeature/authState";
import { ApiRefToken } from "../apiCall";

function CallRefToken() {
  const user = useSelector((state: any) => state.authState.currentUser);

  const dispatch = useDispatch();

  let axiosJWT = axios.create({
    withCredentials: true,
  });
  axiosJWT.interceptors.request.use(
    async (config: any) => {
      let date: Date = new Date();
      const decoded_user = jwtDecode<JwtPayload>(user);
      if (decoded_user?.exp && decoded_user.exp < date.getTime() / 1000) {
        const data: any = await ApiRefToken();

        const decode_data = jwtDecode<JwtPayload>(data?.data?.new_access_token);

        const refreshToken: any = { ...decoded_user, ...decode_data };

        dispatch(loginSuccess(refreshToken));
        config.headers["token"] = "Bearer" + data?.data?.new_access_token;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}

export default CallRefToken;

"use client";
import { loginSuccess } from "@/components/reduxFeature/authState";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { ApiGetAllUser, ApiRefToken } from "./apiCall";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const IsAuth = () => {
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
        console.log("data =>", typeof data);

        // const decode_data = jwtDecode<JwtPayload>(data);
        // console.log("decode_data =>", typeof decode_data);

        // const refreshToken: any = { ...decoded_user, ...decode_data };
        // console.log("refreshToken =>", refreshToken);

        dispatch(loginSuccess(data));
        config.headers["token"] = "Bearer" + data;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return (
    <div>
      <button onClick={() => ApiGetAllUser(user, dispatch, axiosJWT)}>
        {" "}
        Click me to get the toast
      </button>
    </div>
  );
};

export default IsAuth;

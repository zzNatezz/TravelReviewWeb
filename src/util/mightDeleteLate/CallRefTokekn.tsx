"use client";

import React from "react";
import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../components/reduxFeature/authState";
import { ApiGetAllUser } from "../apiCall";

function CallRefToken() {
  const userList = useSelector((state: any) => state.userList.listUser);

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
        // const data: any = await ApiRefToken(); //<-- API refersh token đang bị lỗi

        const data = await axios.post("http://localhost:3001/v1/auth/refresh", {
          withCredentials: true,
        });

        const decode_data = jwtDecode<JwtPayload>(data?.data?.new_access_token);
        console.log("decode_data =>", decode_data);

        const refreshToken: any = { ...decoded_user, ...decode_data };
        console.log(" refreshToken = >", refreshToken);

        dispatch(loginSuccess(refreshToken));
        config.headers["token"] = "Bearer" + data?.data?.new_access_token;
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
        Click me to get the user list
      </button>
    </div>
  );
}

export default CallRefToken;

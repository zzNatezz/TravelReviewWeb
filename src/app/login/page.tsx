import React from "react";
import Image from "next/image";
import icon from "@/asset/icon/icon";
import SwitchImg from "@/components/loginForm/SwitchImg";
import LoginForm from "@/components/loginForm/LoginForm";
import LoginOthers from "@/components/loginForm/LoginOthers";

const Login = () => {
  return (
    <div className="flex flex w-screen h-screen justify-center items-center gap-x-[15rem]">
      <div className="flex flex-col gap-[2rem] w-[305px]">
        <Image src={icon.Logo_black} alt="" />
        <div>
          <h1 className="text-[40px]">
            <b>Login</b>
          </h1>
          <div className="font-Montserrat">
            Login to access your Golobe account
          </div>
        </div>
        <LoginForm />
        <LoginOthers />
      </div>
      <SwitchImg />
    </div>
  );
};

export default Login;

import React from "react";
import Image from "next/image";
import SwitchImg from "@/components/loginForm/SwitchImg";
import icon from "@/asset/icon/icon";
import ForgotPForm from "@/components/loginForm/Forgot/ForgotPForm";
import BackLogin from "@/components/loginForm/Forgot/BackLogin";

const forgotPassword = () => {
  return (
    <div className="flex flex w-screen h-screen justify-center items-center gap-x-[15rem]">
      <div className="flex flex-col gap-[2rem] w-[305px]">
        <BackLogin />
        <Image src={icon.Logo_black} alt="" />
        <div>
          <h1 className="text-[40px]">
            <b>Forgot password ?</b>
          </h1>
          <div className="font-Montserrat">
            Don&apos;t worry, type your email and set the new password
          </div>
        </div>
        <ForgotPForm />
      </div>
      <SwitchImg />
    </div>
  );
};

export default forgotPassword;

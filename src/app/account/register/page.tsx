import React from "react";
import Image from "next/image";
import icon from "@/asset/icon/icon";
import SwitchImg from "@/components/loginForm/SwitchImg";
import LoginOthers from "@/components/loginForm/LoginOthers";
import SignUpForm from "@/components/loginForm/SignUpForm";

const register = () => {
  return (
    <div className="flex flex-row-reverse w-screen h-screen justify-center items-center gap-x-[15rem]">
      <div className="flex flex-col gap-[2rem]">
        <Image src={icon.Logo_black} alt="" />
        <div>
          <h1 className="text-[40px]">
            <b>Sign Up</b>
          </h1>
          <div className="font-Montserrat">
            Let&apos;s get you all st up so you can access your personal
            account.
          </div>
        </div>
        <SignUpForm />
        <LoginOthers />
      </div>
      <SwitchImg />
    </div>
  );
};

export default register;

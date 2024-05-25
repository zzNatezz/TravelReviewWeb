"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import icon from "@/asset/icon/icon";
import { ApiRegister } from "@/components/reduxFeature/apiCall";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

interface SignUpValue {
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  email: string;
  password: string;
  confirm_password: string;
}

const SignUpForm = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [emailUser, setEmailUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = (form: any, e: any) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      const newUser = {
        email: emailUser,
        password,
      };
      ApiRegister(newUser, dispatch, router);
    } else {
      return toast.error("Password do not match");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValue>();

  return (
    <div className="flex flex-col items-center gap-[2rem]">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="font-Montserrat flex flex-col items-center gap-y-[2rem]"
        action="submit"
      >
        <div className="flex justify-between gap-[1rem]">
          <div className="relative">
            <label className="absolute bottom-[1.5rem] left-[1rem] bg-white px-[5px] text-[0.8rem]">
              User name &#40;Optional&#41;
            </label>
            <input
              {...register("firstName")}
              className="outline outline-1 rounded-[5px] w-[30rem] h-[2rem] text-[0.7rem] px-[0.2rem]"
              type="text"
              placeholder="Type your name)"
            />
          </div>
        </div>
        <div className="flex justify-between gap-[1rem]">
          <div className="relative">
            <label className="absolute bottom-[1.5rem] left-[1rem] bg-white px-[5px] text-[0.8rem]">
              Email
            </label>
            <input
              {...register("email", {
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Email is invalid",
                },
              })}
              className="outline outline-1 rounded-[5px] w-[30rem] h-[2rem] text-[0.7rem] px-[0.2rem]"
              type="text"
              placeholder="Type email"
              required
              value={emailUser}
              onChange={(e) => setEmailUser(e.target.value)}
            />
          </div>
        </div>
        {errors.email && (
          <p className="w-[30rem] h-[0.1rem] text-red-500 text-[0.7rem] text-center">
            {errors.email.message}
          </p>
        )}
        {/* End of Email and phone Number */}
        <div className="flex flex-col gap-[2em] ">
          <div className="relative flex items-center">
            <input
              {...register("password", {
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message:
                    "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:",
                },
              })}
              className="outline outline-1 rounded-[5px] w-[30rem] h-[2rem] text-[0.7rem] px-[0.2rem]"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Image
              onClick={() => setShowPass(!showPass)}
              className="absolute right-0 pr-1"
              height="20"
              width="20"
              src={showPass ? icon.eye_open : icon.eye_closed}
              alt=""
            ></Image>
            <div className="absolute bottom-[1.5rem] left-[1rem] bg-white px-[5px] text-[0.8rem]">
              Password
            </div>
          </div>
          <div className="relative flex items-center">
            <input
              {...register("confirm_password", {
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message:
                    "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:",
                },
              })}
              className="outline outline-1 rounded-[5px] w-[30rem] h-[2rem] text-[0.7rem] px-[0.2rem]"
              type={showPass ? "text" : "password"}
              placeholder="Please confirm your password"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <Image
              onClick={() => setShowPass(!showPass)}
              className="absolute right-0 pr-1"
              height="20"
              width="20"
              src={showPass ? icon.eye_open : icon.eye_closed}
              alt=""
            ></Image>
            <div className="absolute bottom-[1.5rem] left-[1rem] bg-white px-[5px] text-[0.8rem]">
              Confirm password
            </div>
          </div>

          {errors.password && (
            <p className="w-[19rem] text-red-500 text-[0.7rem]">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-center gap-[0.5rem] self-start ">
          <input type="checkbox" />
          <label className="text-[0.8rem]">
            I agree to all the <b className="text-red-500">Term</b> and
            <b className="text-red-500"> Privacy Policies</b>
          </label>
        </div>
        <button
          type="submit"
          className="outline-cyan-300 outline-1 rounded-[5px] w-[30rem] h-[2rem] text-[0.7rem] px-[0.2rem] bg-cyan-300 text-[1rem] text-white font-bold"
        >
          Create Account
        </button>
      </form>
      <div className="text-center border-b border-gray-600 w-[19rem] leading-[0.1em] mx-0 mt-[10px] mb-[20px]">
        <span className="bg-white text-[0.7rem] px-[0.2rem]">
          Or Sign Up with
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;

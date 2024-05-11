"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import icon from "@/asset/icon/icon";
import Link from "next/link";

interface SignUpValue {
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  email: string;
  password: string;
  confirm_password: string;
}
//absolute bottom-[1.5rem] left-[1rem] bg-white px-[5px] text-[0.8rem]

const SignUpForm = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValue>();
  const onSubmit = (data: SignUpValue) => {
    console.log("data", data);
  };
  return (
    <div className="flex flex-col items-center gap-[2rem]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-Montserrat flex flex-col items-center gap-y-[2rem]"
        action="submit"
      >
        <div className="flex justify-between gap-[1rem]">
          <div className="relative">
            <label className="absolute bottom-[1.5rem] left-[1rem] bg-white px-[5px] text-[0.8rem]">
              First Name
            </label>
            <input
              {...register("firstName")}
              className="outline outline-1 rounded-[5px] w-[14.5rem] h-[2rem] text-[0.7rem] px-[0.2rem]"
              type="text"
              placeholder="Type your name"
            />
          </div>
          <div className="relative">
            <label className="absolute bottom-[1.5rem] left-[1rem] bg-white px-[5px] text-[0.8rem]">
              Last Name
            </label>
            <input
              {...register("lastName")}
              className="outline outline-1 rounded-[5px] w-[14.5rem] h-[2rem] text-[0.7rem] px-[0.2rem]"
              type="text"
              placeholder="Type your name"
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
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Email is invalid",
                },
              })}
              className="outline outline-1 rounded-[5px] w-[14.5rem] h-[2rem] text-[0.7rem] px-[0.2rem]"
              type="text"
              placeholder="Type email"
              required
            />
          </div>
          <div className="relative">
            <label className="absolute bottom-[1.5rem] left-[1rem] bg-white px-[5px] text-[0.8rem]">
              Phone number
            </label>
            <input
              {...register("phoneNumber")}
              className="outline outline-1 rounded-[5px] w-[14.5rem] h-[2rem] text-[0.7rem] px-[0.2rem]"
              type="text"
              placeholder="Type your phone number"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[2em] ">
          <div className="relative flex items-center">
            <input
              {...register("password", {
                required: "password is required",
                pattern: {
                  value: /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/,
                  message:
                    "Password need minimum eight characters, at least one letter and one number",
                },
              })}
              className="outline outline-1 rounded-[5px] w-[30rem] h-[2rem] text-[0.7rem] px-[0.2rem]"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              required
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
          {errors.email && (
            <p className="w-[19rem] text-red-500 text-[0.7rem]">
              {errors.email.message}
            </p>
          )}
          <div className="relative flex items-center">
            <input
              {...register("confirm_password", {
                required: "Password do not match",
                pattern: {
                  value: /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/,
                  message:
                    "Password need minimum eight characters, at least one letter and one number",
                },
              })}
              className="outline outline-1 rounded-[5px] w-[30rem] h-[2rem] text-[0.7rem] px-[0.2rem]"
              type={showPass ? "text" : "password"}
              placeholder="Please confirm your password"
              required
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
        <button className="outline-cyan-300 outline-1 rounded-[5px] w-[30rem] h-[2rem] text-[0.7rem] px-[0.2rem] bg-cyan-300">
          <b className="text-[1rem] text-white">Create Account</b>
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

"use client";
import icon from "@/asset/icon/icon";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
// import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

interface IFormLogin {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailUser, setEmailUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>();
  const onSubmit = async () => {
    setLoading(true);
    try {
      const user = await axios.post(
        "https://be-travel-review.vercel.app/v1/auth/login",
        { email: emailUser, password: password }
      );
      if (user) {
        console.log(user);

        toast.success("Login successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-[2rem]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-Montserrat flex flex-col items-center gap-y-[1rem]"
        action="submit"
      >
        <div className="flex flex-col gap-[1em] ">
          <div className="relative">
            <input
              {...register("email", {
                required: "email is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "The email is incorrect",
                },
              })}
              className="outline outline-1 rounded-[5px] w-[19rem] h-[2rem] text-[0.7rem] px-[0.2rem]"
              type="text"
              placeholder="Type email"
              required
              value={emailUser}
              onChange={(e) => setEmailUser(e.target.value)}
            />
            <div className="absolute bottom-[1.5rem] left-[1rem] bg-white px-[5px] text-[0.8rem] ">
              Email
            </div>
          </div>

          {errors.email && (
            <p className="w-[19rem] text-red-500 text-[0.7rem]">
              {errors.email.message}
            </p>
          )}
          <div className="relative flex items-center">
            <input
              {...register("password", {
                required: "password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message:
                    "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:",
                },
              })}
              className="outline outline-1 rounded-[5px] w-[19rem] h-[2rem] text-[0.7rem] px-[0.2rem]"
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

          {errors.password && (
            <p className="w-[19rem] text-red-500 text-[0.7rem]">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between w-[19rem]">
          <div className="flex items-center gap-x-[0.2rem]">
            <label className="text-[0.7rem] " htmlFor="">
              Remember me
            </label>
            <input type="checkbox" name="Remember me" id="" />
          </div>
          <Link
            className="text-red-400	text-[0.7rem]"
            href="/account/forgotPassword"
          >
            Forgot Password
          </Link>
        </div>
        <button className="outline-cyan-300 outline-1 rounded-[5px] w-[19rem] h-[2rem] text-[0.7rem] px-[0.2rem] bg-cyan-300">
          <b className="text-[1rem] text-white">Log In</b>
        </button>
        <div className="font-[roboto] text-[0.7rem]">
          Don&apos;t have an account?
          <Link
            className="text-red-400 text-[1rem] pl-[1rem]"
            href="/account/register"
          >
            Sign Up
          </Link>
        </div>
      </form>
      <div className="text-center border-b border-gray-600 w-[19rem] leading-[0.1em] mx-0 mt-[10px] mb-[20px]">
        <span className="bg-white text-[0.5rem] px-[0.2rem]">
          Or login with
        </span>
      </div>
    </div>
  );
};

export default LoginForm;

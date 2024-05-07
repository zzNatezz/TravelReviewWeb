import Link from "next/link";
import React from "react";

const LoginForm = () => {
  return (
    <form
      className="font-Montserrat flex flex-col items-center gap-y-[1rem]"
      action="submit"
    >
      <div className="flex flex-col gap-[1em] ">
        <input
          className="outline outline-1 rounded-[5px] w-[19rem] h-[2rem] text-[0.7rem] px-[0.2rem]"
          type="text"
          placeholder="Type user name"
          required
        />
        <input
          className="outline outline-1 rounded-[5px] w-[19rem] h-[2rem] text-[0.7rem] px-[0.2rem]"
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <div className="flex items-center justify-between w-[19rem]">
        <div className="flex items-center gap-x-[0.2rem]">
          <label className="text-[0.7rem] " htmlFor="">
            Remember me
          </label>
          <input type="checkbox" name="" id="" />
        </div>
        <Link className="text-red-400	text-[0.7rem]" href="">
          Forgot Password
        </Link>
      </div>
      <button className="outline-cyan-300 outline-1 rounded-[5px] w-[19rem] h-[2rem] text-[0.7rem] px-[0.2rem] bg-cyan-300">
        <b className="text-[1rem] text-white">Log In</b>
      </button>
      <div className="font-[roboto] text-[0.7rem]">
        Don&apos;t have an account?
        <Link className="text-red-400" href="">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;

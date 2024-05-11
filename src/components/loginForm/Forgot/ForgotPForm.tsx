"use client";

import React from "react";
import { useForm } from "react-hook-form";

interface forgotFormvalue {
  email: string;
}
//absolute bottom-[1.5rem] left-[1rem] bg-white px-[5px] text-[0.8rem]
const ForgotPForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotFormvalue>();
  const onSubmit = (data: forgotFormvalue) => {
    console.log("data", data);
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
                  message: "The email is invalid",
                },
              })}
              className="outline outline-1 rounded-[5px] w-[19rem] h-[2rem] text-[0.7rem] px-[0.2rem]"
              type="text"
              placeholder="Type email"
              required
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
        </div>
        <button className="outline-cyan-300 outline-1 rounded-[5px] w-[19rem] h-[2rem] text-[0.7rem] px-[0.2rem] bg-cyan-300">
          <b className="text-[1rem] text-white">Submit</b>
        </button>
      </form>
    </div>
  );
};

export default ForgotPForm;

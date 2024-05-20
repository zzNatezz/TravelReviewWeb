"use client";
import image from "@/asset/picture/image";
import React, { useState } from "react";
import Image from "next/image";
import { IReview } from "@/util/utils";

const DoUThink = () => {
  const [thinking, setThinking] = useState<string>("");
  const [avatar, setAvatar] = useState<IReview>();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(thinking);
  };

  const updateAvatar = (e: any) => {
    avatar && URL.revokeObjectURL(avatar.review);
    const processingImag = e.target.files[0];
    if (e.target.files.length !== 0) {
      processingImag.review = URL.createObjectURL(processingImag);
    }
    setAvatar(processingImag);
  };

  return (
    <div className=" bg-white w-[50rem] h-[10rem] flex items-center gap-[2rem] justify-center rounded-[20px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mt-[-5rem] z-[100]">
      <div className="">
        <label htmlFor="imagine">
          <input
            id="imagine"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => updateAvatar(e)}
          />
          {avatar === undefined ? (
            <Image
              className="rounded-[50%] cursor-pointer;"
              style={{ width: "6rem", height: "6rem" }}
              src={image.avatar}
              alt="loading..."
            />
          ) : (
            <Image
              className="rounded-[50%] cursor-pointer;"
              style={{ width: "6rem", height: "6rem" }}
              src={avatar.review}
              alt="loading..."
            />
          )}
        </label>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="h-[3rem] py-[1rem] w-[30rem] rounded-[20px] px-[10px] outline outline-[1px]"
          type="text"
          placeholder="Do you want to share any things ?"
          value={thinking}
          onChange={(e) => setThinking(e.target.value)}
        />
        <button
          className="ml-[2rem] h-[3rem] w-[5rem] rounded-[10px] text-white bg-cyan-300"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DoUThink;

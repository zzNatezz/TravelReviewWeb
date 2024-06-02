"use client";
import React, { useState } from "react";
import Image from "next/image";
import image from "@/asset/picture/image";
import { IReview, IuserLogin } from "@/util/allInterface";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { ApiPost } from "../reduxFeature/apiCall";
import { postFail } from "../reduxFeature/postState";

const StatusBar = () => {
  const [thinking, setThinking] = useState<string>("");
  const [avatar, setAvatar] = useState<IReview>();
  const [picture, setPicture] = useState<any>();

  const user = global?.window.localStorage.getItem("AC")
    ? JSON.parse(localStorage.getItem("AC") || "")
    : null;
  const dispatch = useDispatch();

  const handlePost = (e: any) => {
    e.preventDefault();
    try {
      const content = { content: thinking, file: picture };
      const decodeUser = jwtDecode<IuserLogin>(user);
      if (!decodeUser)
        throw new Error("Please login or reload page, something went wrong");
      const userId = decodeUser?.user?._id;
      ApiPost(userId, content, dispatch);
      setThinking("");
    } catch (error) {
      dispatch(postFail());
    }
  };

  const updateAvatar = (e: any) => {
    avatar && URL.revokeObjectURL(avatar.review);
    const processingImag = e.target.files[0];
    if (e.target.files.length !== 0) {
      processingImag.review = URL.createObjectURL(processingImag);
    }
    setAvatar(processingImag);
  };

  const updatePicture = (e: any) => {
    const processingImag = e.target.files[0];
    if (e.target.files.length !== 0) {
      processingImag.review = URL.createObjectURL(processingImag);
    }
    setPicture(processingImag.review);
  };

  return (
    <div className="flex flex-row items-center gap-[2rem]">
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
              style={{ width: "4.5rem", height: "4.5rem" }}
              src={image.avatar}
              alt="loading..."
            />
          ) : (
            <Image
              className="rounded-[50%] cursor-pointer;"
              style={{ width: "4.5rem", height: "4.5rem" }}
              src={avatar.review}
              alt="loading..."
            />
          )}
        </label>
      </div>
      <form
        className="flex flex-row items-center gap-[2rem]"
        onSubmit={handlePost}
      >
        <div>
          <label className="cursor-pointer" htmlFor="imagine">
            {/* <Image
              className="rounded-[50%] cursor-pointer"
              width={30}
              height={30}
              src={icon.picture}
              alt="upload picture ?"
            /> */}
            <input
              // className="opacity-0 absolute z-[-1]"
              name="filename"
              type="file"
              style={{ display: "block" }}
              onChange={(e) => updatePicture(e)}
            />
          </label>
          {picture && (
            <div>
              <Image width={100} height={100} src={picture} alt="" />
            </div>
          )}

          <input
            className="h-[3rem] py-[1rem] w-[30rem] rounded-[20px] px-[10px] outline outline-[1px]"
            type="text"
            placeholder="Do you want to share anything ?"
            value={thinking}
            onChange={(e) => setThinking(e.target.value)}
          />
        </div>
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

export default StatusBar;

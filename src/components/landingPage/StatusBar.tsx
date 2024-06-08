"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IReview, IuserLogin } from "@/util/allInterface";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { ApiPost } from "../../util/apiCall";
import { postFail } from "../reduxFeature/postState";
import icon from "@/asset/icon/icon";

const StatusBar = () => {
  const [thinking, setThinking] = useState<string>("");
  // const [avatar, setAvatar] = useState<IReview>();
  const [picture, setPicture] = useState<string | null>(null);
  const [userAvatar, setuserAvatar] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [processingImag, setProcessingImag] = useState<any>();

  useEffect(() => {
    try {
      const user = global?.window?.localStorage?.getItem("AC")
        ? JSON?.parse(localStorage?.getItem("AC") || "")
        : null;
      const decodeUser = jwtDecode<IuserLogin>(user);
      if (!decodeUser)
        throw new Error("Please login or reload page, something went wrong");
      setUserId(decodeUser?.user?._id);
      setuserAvatar(decodeUser?.user?.avatar?.url);
    } catch (error) {
      console.log(error);
    }
  }, [picture]);

  const dispatch = useDispatch();

  const handlePost = (e: any) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("content", thinking);
      form.append("file", processingImag);
      ApiPost(userId, form, dispatch);
      setThinking("");
      setPicture(null);
    } catch (error) {
      dispatch(postFail());
    }
  };

  // const updateAvatar = (e: any) => {
  //   const processingImag = e.target.files[0];
  //   if (e.target.files.length !== 0) {
  //     processingImag.review = URL.createObjectURL(processingImag);
  //   }
  //   setAvatar(processingImag);
  // };

  const updatePicture = (e: any) => {
    try {
      const processingImag = e.target.files[0];
      setProcessingImag(processingImag);
      if (e.target.files.length !== 0) {
        processingImag.review = URL.createObjectURL(processingImag);
      }
      setPicture(processingImag?.review);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row items-center gap-[2rem]">
      <Image
        width={45}
        height={45}
        className="rounded-[50%] cursor-pointer"
        style={{ width: "4.5rem", height: "4.5rem" }}
        src={!userAvatar ? icon.defaultAvatar : userAvatar}
        alt="loading..."
      />
      <form
        className="flex flex-row items-center gap-[2rem]"
        onSubmit={handlePost}
      >
        <div>
          <label className="cursor-pointer" htmlFor="previewPicture">
            <Image
              className="rounded-[50%] cursor-pointer"
              width={30}
              height={30}
              src={icon.picture}
              alt="upload picture ?"
            />
            <input
              className=" w-[0.1px] h-[0.1px] hidden z-[-1]"
              id="previewPicture" //id này phải trùng vs htmlFor
              name="imagine"
              type="file"
              onChange={(e) => updatePicture(e)}
            />
          </label>
          {picture && (
            <div className="relative py-[1rem] w-max">
              <Image width={100} height={100} src={picture} alt="" />
              <Image
                onClick={() => setPicture(null)}
                className="absolute top-[1rem] right-[0] "
                width={20}
                height={20}
                src={icon.picturecloseIcon}
                alt=""
              />
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

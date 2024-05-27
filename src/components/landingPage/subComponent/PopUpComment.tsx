"use client";
import React, { useState } from "react";
import Image from "next/image";
import timeFormat from "@/util/timeFormat";
import icon from "@/asset/icon/icon";
import image from "@/asset/picture/image";
import { IpopUp } from "@/util/utils";
import { modalClose } from "@/components/reduxFeature/modal";
import { useDispatch } from "react-redux";

const PopUpComment = ({ item, index }: IpopUp) => {
  const [comment, setComment] = useState<string>();
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    document.body.style.overflow = "auto";
    dispatch(modalClose());
  };

  const handleComment = (e: any) => {
    e.preventDefault();
    console.log(comment);
  };

  return (
    <div
      key={index}
      className="flex gap-x-[3rem] items-start justify-around p-[1rem]"
    >
      <div className="bg-gray-200 p-[1rem] rounded-[2rem] ">
        <Image
          className=""
          unoptimized
          src={item?.image?.url}
          alt=""
          width={500}
          height={300}
          sizes="(max-width: 60rem)"
        />
      </div>
      <div className="">
        <div className="flex items-center justify-between w-[30rem]">
          <div className="flex gap-x-[1rem]">
            <Image
              style={{
                borderRadius: "50%",
                overflow: "hidden",
                width: 90,
                height: 90,
              }}
              width="90"
              height="90"
              unoptimized
              src={
                item?.manWhoCreate?.avatar
                  ? item?.manWhoCreate?.avatar
                  : icon.defaultAvatar
              }
              alt="avatar"
            />
            {/* time format */}
            <div>
              <h1>{item?.manWhoCreate?.userName}</h1>
              <div>{timeFormat(item?.createAt)}</div>
            </div>
          </div>
          <Image
            onClick={() => handleCloseModal()}
            width={40}
            height={40}
            src={icon.closeIcon}
            alt="click me to close"
          />
        </div>
        <div className="my-[2rem]">{item?.content}</div>
        <hr className="my-[2rem]" />
        <form onSubmit={handleComment}>
          <div className="flex gap-x-[1rem] items-center justify-between ">
            <Image
              className="rounded-[50%] cursor-pointer;"
              style={{ width: "5rem", height: "5rem" }}
              src={image.avatar}
              alt="loading..."
            />
            <input
              className="h-[3rem] py-[1rem] w-[20rem] rounded-[20px] px-[10px] outline outline-[1px]"
              type="text"
              placeholder="Do you want to comment any thing ?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="h-[3rem] w-[5rem] rounded-[10px] text-white bg-cyan-300"
              type="submit"
            >
              Comment
            </button>
          </div>
        </form>
        <hr className="my-[2rem]" />
        <div>ALL comments will be rendered here</div>
      </div>
    </div>
  );
};

export default PopUpComment;

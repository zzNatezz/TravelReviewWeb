"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import timeFormat from "@/util/timeFormat";
import icon from "@/asset/icon/icon";
import image from "@/asset/picture/image";
import { IpopUp } from "@/util/utils";
import { modalClose } from "@/components/reduxFeature/modal";
import { useDispatch } from "react-redux";
import axios from "axios";

const PopUpComment = ({ item, index }: IpopUp) => {
  const [comment, setComment] = useState<string>();
  const [commentList, setCommentList] = useState<any[]>([]);
  console.log(commentList);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    document.body.style.overflow = "auto";
    dispatch(modalClose());
  };

  const handleComment = (e: any) => {
    e.preventDefault();
    console.log(comment);
  };
  useEffect(() => {
    const fetch = async (postId: any) => {
      try {
        const res: any = await axios.get(
          `https://be-travel-review.vercel.app/v1/comment/${postId}`
        );

        setCommentList(res?.data?.comment);
      } catch (error) {
        console.log(error);
      }
    };
    fetch(item._id);
  }, []);

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
                item?.manWhoCreate?.avatar?.url === ""
                  ? icon.defaultAvatar
                  : item?.manWhoCreate?.avatar?.url
              }
              alt="avatar"
            />
            {/* time format */}
            <div>
              <h1 className="font-bold text-xl">
                {item?.manWhoCreate?.userName}
              </h1>
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
        <div className="border-t-2 my-[2rem] pt-[2rem] w-[30rem] ">
          {commentList?.map((item: any, index: number) => (
            <div
              key={index}
              className={
                index % 2 === 0
                  ? "bg-white p-[1rem] flex items-center justify-between gap-x-[0.5rem]"
                  : "bg-gray-200 rounded-xl p-[1rem] flex items-center justify-between gap-x-[1rem] "
              }
            >
              <div className="flex items-center gap-x-[1rem]">
                <div className="flex flex-col items-center gap-x-[0.5rem] ">
                  <div className="w-max">{item?.userId?.userName}</div>
                  <Image
                    style={{ width: "50px", height: "50px" }}
                    width={200}
                    height={200}
                    unoptimized
                    src={
                      item?.userId.avatar.url === ""
                        ? icon.defaultAvatar
                        : item?.userId.avatar.ur
                    }
                    alt=""
                  />
                </div>
                <div className="">{item?.comment}</div>
              </div>
              <Image width={30} height={30} src={icon.settingIcon} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopUpComment;

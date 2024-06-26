"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import timeFormat from "@/util/timeFormat";
import icon from "@/asset/icon/icon";
import { modalClose } from "@/components/reduxFeature/modal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { IpopUp } from "@/util/allInterface";

import { ApiPostComment } from "@/util/apiCall";
import Reloading from "@/components/reloading/Reloading";
import TippyEditComment from "./TippyEditComment";
import EditComment from "../IsEdit/EditComment";

const PopUpCommentWithOutImg = ({ item, index, avatar, isUserId }: IpopUp) => {
  const [comment, setComment] = useState<string>();
  const [commentList, setCommentList] = useState<any[]>([]);
  const [postId, setPostId] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const userId = isUserId;
  const userAvatar: string = avatar;

  const isCommentFetching = useSelector(
    (state: any) => state.commentPost.isFetching
  );
  const deleteCmtFetching = useSelector(
    (state: any) => state.removeCmt.isFetching
  );
  const isIndex = useSelector((state: any) => state.isIndex.index);
  const fetchingCmt = useSelector((state: any) => state.modifyCmt.isFetching);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    document.body.style.overflow = "auto";
    dispatch(modalClose());
  };

  const handleComment = (e: any) => {
    e.preventDefault();
    try {
      const postId = item._id;
      const content = { comment: comment };
      ApiPostComment(userId, postId, content, dispatch);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async (postId: any) => {
      try {
        setLoading(true);
        const res: any = await axios.get(
          `https://be-travel-review.vercel.app/v1/comment/${postId}`
        );
        setCommentList(res?.data?.comment);

        setLoading(false);
        setPostId(item._id);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetch(item._id);
  }, [isCommentFetching, deleteCmtFetching, fetchingCmt]);

  return (
    <div
      key={index}
      className="flex flex-col items-center content overflow-auto gap-y-[2rem] m-h-[1000px] "
    >
      <div className="flex items-center justify-between w-[52.65rem] pt-[1rem]">
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
      <div className="p-2rem w-[52.65rem] overflow-auto">{item?.content}</div>
      <form onSubmit={handleComment}>
        <div className="flex flex-row items-center gap-[2rem] w-40[rem]">
          <Image
            className="rounded-[50%] cursor-pointer grid place-items-center"
            style={{ width: "4.5rem", height: "4.5rem" }}
            width={50}
            height={50}
            src={userAvatar ? userAvatar : icon.defaultAvatar}
            alt="loading..."
          />
          <input
            className="h-[3rem] py-[1rem] w-[40rem] rounded-[20px] px-[10px] outline outline-[1px]"
            type="text"
            placeholder="Do you want to comment any things ?"
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

      <div className="border-t-2 my-[2rem] pt-[2rem] w-[40rem] flex flex-col justify-center  max-h-[600px] overflow-auto">
        {(isCommentFetching || loading || deleteCmtFetching || fetchingCmt) && (
          <Reloading size={50} className="" />
        )}
        {commentList?.map((item: any, index: number) => (
          <div
            key={index}
            className="bg-white p-[1rem] flex items-start justify-between gap-x-[0.5rem]"
          >
            <div className="flex items-start gap-x-[1rem]">
              <div className="flex flex-col items-center gap-x-[0.5rem] ">
                <div className="w-max">{item?.userId?.userName}</div>
                <Image
                  style={{ width: "50px", height: "50px" }}
                  width={200}
                  height={200}
                  src={
                    item?.userId.avatar.url === ""
                      ? icon.defaultAvatar
                      : item?.userId.avatar.url
                  }
                  alt=""
                />
              </div>
              {isIndex === index ? (
                <EditComment item={item} postId={postId} />
              ) : (
                <div className="bg-gray-200 rounded-xl p-[1rem] flex items-center justify-between gap-x-[1rem] ">
                  {item?.comment}
                </div>
              )}
            </div>
            {item?.userId._id === userId ? (
              <TippyEditComment item={item} index={index} postId={postId} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopUpCommentWithOutImg;

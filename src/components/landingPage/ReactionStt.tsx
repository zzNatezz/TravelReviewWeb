"use client";
import icon from "@/asset/icon/icon";
import React, { useEffect } from "react";
import Image from "next/image";
import { IEditPostUp } from "@/util/allInterface";
import { useDispatch, useSelector } from "react-redux";
import { ApiLikePost, LikedPost } from "@/util/apiCall";

interface IReactStt extends IEditPostUp {
  userId: string;
}
const ReactionStt = ({ item, userId }: IReactStt) => {
  const all_like = useSelector((state: any) => state.listLike.listLike);

  const dispatch = useDispatch();

  const handleReact = () => {
    ApiLikePost(userId, item?._id, dispatch);
  };
  const likeFetching = useSelector(
    (state: any) => state.listLike.isLikeFetching
  );

  useEffect(() => {
    LikedPost(userId, dispatch);
  }, [likeFetching]);

  return (
    <div
      onClick={() => handleReact()}
      className="flex items-center gap-x-[0.5rem] hover:bg-rose-400 rounded-xl px-[0.4rem] "
    >
      {all_like?.includes(item?._id) ? (
        <>
          <Image width={24} height={24} src={icon.hearActice} alt="" />
          <div>Liked</div>
        </>
      ) : (
        <>
          <Image width={24} height={24} src={icon.heatUnactive} alt="" />
          <div>Reaction</div>
        </>
      )}
    </div>
  );
};

export default ReactionStt;

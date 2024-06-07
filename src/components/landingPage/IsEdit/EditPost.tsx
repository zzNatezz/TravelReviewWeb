"use client";
import React, { useState } from "react";
import { IpopUp, IuserLogin } from "@/util/allInterface";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setIndex, unSetIndex } from "@/components/reduxFeature/handleEdit";
import { jwtDecode } from "jwt-decode";
import { ApiContentModify } from "@/util/apiCall";
import { ModifyContentEnd } from "@/components/reduxFeature/modifyContent";

const EditPost = ({ item, index }: IpopUp) => {
  const content = item?.content;
  const [contentEdit, setContentEdit] = useState<string>(content);
  const dispatch = useDispatch();
  const getAcFromLocal = global?.window?.localStorage?.getItem("AC")
    ? JSON?.parse(localStorage?.getItem("AC") || "")
    : null;

  const handleSubmitEdit = (e: any) => {
    e.preventDefault();
    try {
      const content = { content: contentEdit };
      const decodeUser = jwtDecode<IuserLogin>(getAcFromLocal);
      if (!decodeUser)
        throw new Error("Please login or reload page, something went wrong");
      const userId = decodeUser?.user?._id;
      const postId = item?._id;
      ApiContentModify(userId, postId, content, dispatch);
      dispatch(unSetIndex());
    } catch (error) {
      console.log(error);
      dispatch(ModifyContentEnd());
    }
  };
  const handleCancleEdit = (e: any) => {
    e.preventDefault();
    dispatch(unSetIndex());
  };

  return (
    <form onSubmit={handleSubmitEdit} className="flex flex-col gap-y-[2rem]">
      <textarea
        className={
          content.length <= 315
            ? "w-[100%] outline outline-1 rounded-xl px-[0.5rem] px-[1rem]"
            : "w-[100%] h-[20rem] outline outline-1 rounded-xl px-[0.5rem] px-[1rem]"
        }
        name="editShow"
        value={contentEdit}
        onChange={(e) => setContentEdit(e.target.value)}
      />

      <div className="flex items-center justify-between">
        <button
          className="py-[1rem] px-[0.5rem] bg-cyan-300 text-white rounded-xl "
          onClick={(e) => handleCancleEdit(e)}
        >
          Cancle
        </button>
        <button
          type="submit"
          className="py-[1rem] px-[0.5rem] bg-rose-500 text-white rounded-xl "
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditPost;

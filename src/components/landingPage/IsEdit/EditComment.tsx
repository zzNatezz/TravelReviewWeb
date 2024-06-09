"use client";
import React, { useState } from "react";
import { IEditComment, IuserLogin } from "@/util/allInterface";
import { useDispatch, useSelector } from "react-redux";
import { unSetIndex } from "@/components/reduxFeature/handleEdit";
import { jwtDecode } from "jwt-decode";
import { ApiModifyCmt } from "@/util/apiCall";
import { modifyCmtEnd } from "@/components/reduxFeature/modifyCmt";
import Reloading from "@/components/reloading/Reloading";

const EditComment = ({ item, index, postId }: IEditComment) => {
  const content = item?.comment;
  const [contentEdit, setContentEdit] = useState<string>(content);
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.authState.currentUser);

  const handleSubmitEdit = (e: any) => {
    e.preventDefault();
    try {
      const content = { content: contentEdit };
      const decodeUser = jwtDecode<IuserLogin>(user);
      if (!decodeUser)
        throw new Error("Please login or reload page, something went wrong");
      const userId = decodeUser?.user?._id;
      const cmtId = item?._id;

      ApiModifyCmt(userId, postId, cmtId, content, dispatch);
      dispatch(unSetIndex());
    } catch (error) {
      console.log(error);
      dispatch(modifyCmtEnd());
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
          content.length <= 100
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

export default EditComment;

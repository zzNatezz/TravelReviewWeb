"use client";
import Tippy from "@tippyjs/react/headless";
import Image from "next/image";
import icon from "@/asset/icon/icon";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { IEditComment, IuserLogin } from "@/util/allInterface";
import { setIndex } from "@/components/reduxFeature/handleEdit";
import { ApiRemoveCmt } from "@/util/apiCall";

const TippyEditComment = ({ item, index, postId }: IEditComment) => {
  const [visible, setVisible] = useState<boolean>(false);
  const user = useSelector((state: any) => state.authState.currentUser);

  const dispatch = useDispatch();

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const handleRemoveComment = (e: any) => {
    e.preventDefault();
    try {
      const decodeUser = jwtDecode<IuserLogin>(user);
      if (!decodeUser)
        throw new Error("Please login or reload page, something went wrong");
      const userId = decodeUser?.user?._id;
      const cmtId = item._id;

      ApiRemoveCmt(userId, postId, cmtId, dispatch);
      setVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = (e: any) => {
    e.preventDefault();
    dispatch(setIndex(index));
    setVisible(false);
  };

  return (
    <Tippy
      onClickOutside={hide}
      placement="right-start"
      visible={visible}
      interactive
      render={(attrs) => (
        <div
          className="box flex flex-col items-start text-xl mr-[4rem] gap-[2rem]"
          tabIndex={1}
          {...attrs}
        >
          <button
            onClick={(e) => handleEditPost(e)}
            className="bg-cyan-300 rounded-[1rem] px-[1rem] text-white "
          >
            Edit
          </button>
          <button
            onClick={(e) => handleRemoveComment(e)}
            className="bg-orange-600 rounded-[1rem] px-[1rem] text-white  "
          >
            Remove
          </button>
        </div>
      )}
    >
      <Image
        className=" p-[0.5rem] hover:bg-gray-200 rounded-[50%] "
        onClick={visible ? hide : show}
        width={50}
        height={50}
        src={icon.settingIcon}
        alt="setting"
      />
    </Tippy>
  );
};

export default TippyEditComment;

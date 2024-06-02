"use client";
import Tippy from "@tippyjs/react/headless";
import Image from "next/image";
import icon from "@/asset/icon/icon";
import React, { useState } from "react";
import { ApiRemovePost } from "@/components/reduxFeature/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { IpopUp, IuserLogin } from "@/util/allInterface";

const TippyEdit = ({ item, index }: IpopUp) => {
  const [visible, setVisible] = useState<boolean>(false);
  const getAcFromLocal = global?.window?.localStorage?.getItem("AC")
    ? JSON?.parse(localStorage?.getItem("AC") || "")
    : null;

  const isIndex = useSelector((state: any) => state.isEdit.index);
  const dispatch = useDispatch();

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const handleRemovePost = (e: any) => {
    e.preventDefault();
    try {
      const decodeUser = jwtDecode<IuserLogin>(getAcFromLocal);
      if (!decodeUser)
        throw new Error("Please login or reload page, something went wrong");
      const userId = decodeUser?.user?._id;
      const postId = item._id;
      ApiRemovePost(userId, postId, dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tippy
      onClickOutside={hide}
      placement="bottom"
      visible={visible}
      interactive
      render={(attrs) => (
        <div
          className="box flex flex-col items-end text-xl mr-[4rem] gap-[2rem]"
          tabIndex={1}
          {...attrs}
        >
          <button className="bg-cyan-300 rounded-[1rem] px-[1rem] text-white ">
            Edit
          </button>
          <button
            onClick={(e) => handleRemovePost(e)}
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

export default TippyEdit;

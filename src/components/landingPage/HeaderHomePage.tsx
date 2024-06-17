"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import icon from "@/asset/icon/icon";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { IuserLogin } from "@/util/allInterface";
import { ApiLogOut } from "@/util/apiCall";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { searchStart } from "../reduxFeature/openSearch";

const HeaderHomePage = () => {
  const [userId, setUserId] = useState<string>("");

  const [userName, setUserName] = useState<string>("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = (e: any) => {
    e.preventDefault();
    ApiLogOut(dispatch, router);
  };

  const handleFind = (e: any) => {
    if (!userId) {
      router.push("/login");
    } else dispatch(searchStart());
  };

  useEffect(() => {
    try {
      const getAcFromLocal = global?.window?.localStorage?.getItem("gbl_au_tk")
        ? JSON?.parse(localStorage?.getItem("gbl_au_tk") || "")
        : null;
      const decodeUser = jwtDecode<IuserLogin>(getAcFromLocal);
      setUserName(decodeUser?.user?.userName);
      setUserId(decodeUser?.user?._id);
    } catch (error) {}
  }, []);

  return (
    <div className="w-[1380px] flex justify-between pt-[3rem] sticky top-[0] px-[1.5rem] items-center">
      <div className=" flex items-start flex-col gap-[20px]">
        <div className="flex item-center gap-[5px] px-[1rem] py-[0.1rem] rounded-xl w-[max] bg-gray-200 ">
          <Image
            width="24"
            height="24"
            src={icon.icon_airplane}
            alt="icon_airplane"
          />
          <div className="text-white">Find Flight</div>
        </div>
        <div className="flex item-center gap-[5px] px-[1rem] py-[0.1rem] rounded-xl w-[max] bg-gray-200 ">
          <Image
            className="filter invert-[1]"
            width="24"
            height="24"
            src={icon.icon_bed}
            alt="icon_airplane"
          />
          <div className="text-white">Find Stay</div>
        </div>
        <div className="flex item-center gap-[5px] px-[1rem] py-[0.2rem] rounded-xl w-[max] bg-gray-200 ">
          <Image
            className=""
            width="24"
            height="24"
            src={icon.searchIcon}
            alt="searchIcon"
          />
          <div onClick={(e) => handleFind(e)} className="text-white">
            Find ?
          </div>
        </div>
      </div>
      {!userId ? (
        <button
          style={{ position: "-webkit-sticky" }}
          className="sticky top-[0] text-cyan-300 w-[max] px-[1rem] bg-slate-300 rounded-xl font-bold"
        >
          <Link className="hover:animate-ping" href="/account/register">
            Sign-Up
          </Link>
        </button>
      ) : (
        <div
          style={{ position: "-webkit-sticky" }}
          className="sticky top-[0] flex gap-[20px]"
        >
          <button className="font-Roboto text-white px-[1rem] py-[0.5rem] bg-slate-300 rounded-xl ">
            <Link href="">
              Hi, {""}
              {userName}
            </Link>
          </button>
          <button
            onClick={(e) => handleLogOut(e)}
            className="text-white outline outline-1 font-Roboto bg-rose-500 text-[1.2rem] rounded-[0.5rem] px-[0.4rem] shadow-sm"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderHomePage;

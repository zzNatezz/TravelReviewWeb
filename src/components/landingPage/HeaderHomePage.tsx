"use client";
import React from "react";
import Image from "next/image";
import icon from "@/asset/icon/icon";
import Link from "next/link";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { IuserLogin } from "@/util/allInterface";
import CallRefToken from "@/util/mightDeleteLate/CallRefTokekn";

const HeaderHomePage = () => {
  const user = useSelector((state: any) => state.authState.currentUser);
  console.log("user===>", user);

  const isError = useSelector((state: any) => state.authState.error);
  console.log("isError===>", isError);

  return (
    <div className="w-[1380px] flex justify-between pt-[3rem] sticky top-[0] px-[1.5rem] items-center">
      <div className="w-[30vh] flex items-center flex-col gap-[20px]">
        <div className="flex item-center gap-[5px] px-[1rem] rounded-xl w-[max] bg-gray-200 ">
          <Image
            width="24"
            height="24"
            src={icon.icon_airplane}
            alt="icon_airplane"
          />
          <div className="text-white">Find Flight</div>
        </div>
        <div className="flex item-center gap-[5px] px-[1rem] rounded-xl w-[max] bg-gray-200 ">
          <Image
            className="filter invert-[1]"
            width="24"
            height="24"
            src={icon.icon_bed}
            alt="icon_airplane"
          />
          <div className="text-white">Find Stay</div>
        </div>
      </div>
      {!user || isError ? (
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
              {jwtDecode<IuserLogin>(user)?.user?.userName}
            </Link>
          </button>
          <button className="text-white outline outline-1 font-Roboto bg-rose-500 text-[1.2rem] rounded-[0.5rem] px-[0.4rem] shadow-sm">
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderHomePage;

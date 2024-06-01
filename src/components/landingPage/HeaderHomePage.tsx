"use client";
import React from "react";
import Image from "next/image";
import icon from "@/asset/icon/icon";
import Link from "next/link";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { IuserLogin } from "@/util/allInterface";

const HeaderHomePage = () => {
  const user = useSelector((state: any) => state.authState.currentUser);

  return (
    <div className="w-[1380px] flex justify-between pt-[3rem] absolute px-[1.5rem]">
      <div className="w-[30vh] flex items-center gap-[20px]">
        <div className="flex item-center gap-[5px]">
          <Image
            width="24"
            height="24"
            src={icon.icon_airplane}
            alt="icon_airplane"
          />
          <div className="text-white">Find Flight</div>
        </div>
        <div className="flex item-center gap-[5px]">
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
      {!user ? (
        <div className="flex gap-[20px]">
          <button className="text-white">
            <Link href="/login">Login</Link>
          </button>
          <button className="text-white">
            <Link href="/account/register">Sign-Up</Link>
          </button>
        </div>
      ) : (
        <div className="flex gap-[20px]">
          <button className="text-green-700">
            <Link href="">
              Hi {""}
              {jwtDecode<IuserLogin>(user)?.user.firstName === ""
                ? jwtDecode<IuserLogin>(user)?.user.email
                : jwtDecode<IuserLogin>(user)?.user.firstName}
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

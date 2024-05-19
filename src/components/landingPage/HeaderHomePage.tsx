"use client";
import React from "react";
import Image from "next/image";
import icon from "@/asset/icon/icon";
import Link from "next/link";
import { useSelector } from "react-redux";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { IuserLogin } from "@/util/utils";

const HeaderHomePage = () => {
  const user = useSelector((state: any) => state.authState.currentUser);

  return (
    <div className="w-[1080px] flex justify-between pt-[1rem]">
      <div className="w-[30vh] flex items-center gap-[20px]">
        <div className="flex item-center gap-[5px]">
          <Image
            className="filter invert-[1]"
            width="24"
            height="24"
            src={icon.icon_airplane}
            alt="icon_airplane"
          />
          <div className="text-green-700">Find Flight</div>
        </div>
        <div className="flex item-center gap-[5px]">
          <Image
            className="filter invert-[1]"
            width="24"
            height="24"
            src={icon.icon_bed}
            alt="icon_airplane"
          />
          <div className="text-green-700">Find Stay</div>
        </div>
      </div>
      <Image src={icon.Logo} alt="golobe_logo" />

      {!user ? (
        <div className="flex gap-[20px]">
          <button className="text-green-700">
            <Link href="/login">Login</Link>
          </button>
          <button className="text-green-700">
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

"use client";
import React, { useEffect, useState } from "react";
import StatusBar from "./StatusBar";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { IuserJWTPayLoad } from "@/util/allInterface";

const DoUThink = () => {
  const [userId, setUserId] = useState<string>("");
  const isError = useSelector((state: any) => state.authState.error);
  const user = useSelector((state: any) => state.authState.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const getAcFromLocal = global?.window?.localStorage?.getItem("gbl_au_tk")
        ? JSON?.parse(localStorage?.getItem("gbl_au_tk") || "")
        : null;
      const decodeUser = jwtDecode<IuserJWTPayLoad>(getAcFromLocal);
      setUserId(decodeUser?.user?._id);
    } catch (error) {}
  }, []);

  return (
    <div
      style={{ position: "-webkit-sticky" }}
      className=" sticky top-[0] bg-white w-[50rem] flex flex-col items-center gap-[2rem] justify-center rounded-[20px] shadow-[0_15px_30px_-15px_rgba(0,0,0,0.5)] mt-[-5rem] z-[2] p-[2rem]"
    >
      {!userId ? (
        <button className="hover:animate-ping ml-[2rem] h-[3rem] w-[10rem] rounded-[10px] bg-cyan-300 self-center">
          <Link href="/login" className="animate-ping-low text-white">
            Click me to login
          </Link>
        </button>
      ) : (
        <StatusBar />
      )}
    </div>
  );
};

export default DoUThink;

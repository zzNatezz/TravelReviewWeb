"use client";
import React, { useEffect } from "react";
import StatusBar from "./StatusBar";
import { useDispatch, useSelector } from "react-redux";
import checkAuth from "@/util/checkAuth";
import Link from "next/link";

const DoUThink = () => {
  const isError = useSelector((state: any) => state.authState.error);
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuth(dispatch);
  });
  return (
    <div
      style={{ position: "-webkit-sticky" }}
      className=" sticky top-[0] bg-white w-[50rem] flex flex-col items-center gap-[2rem] justify-center rounded-[20px] shadow-[0_15px_30px_-15px_rgba(0,0,0,0.5)] mt-[-5rem] z-[2] p-[2rem]"
    >
      {isError ? (
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

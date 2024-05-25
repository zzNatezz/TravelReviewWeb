"use client";
import React from "react";
import StatusBar from "./subComponent/StatusBar";

const DoUThink = () => {
  return (
    <div className="bg-white w-[50rem]flex flex-col items-center gap-[2rem] justify-center rounded-[20px] shadow-[0_15px_30px_-15px_rgba(0,0,0,0.5)] mt-[-5rem] z-[100] p-[2rem]">
      <StatusBar />
    </div>
  );
};

export default DoUThink;

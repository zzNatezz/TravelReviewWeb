"use client";

import React from "react";
import Image from "next/image";
import icon from "@/asset/icon/icon";
import { useRouter } from "next/navigation";

const BackLogin = () => {
  const router = useRouter();
  return (
    <div className="flex items-center" onClick={() => router.push("/login")}>
      <Image width="16" height="16" src={icon.back_arrow} alt="" />
      <span> &nbsp; Back </span>
    </div>
  );
};

export default BackLogin;

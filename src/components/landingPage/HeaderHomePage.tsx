import React from "react";
import Image from "next/image";
import icon from "@/asset/icon/icon";
import Link from "next/link";

const HeaderHomePage = () => {
  return (
    <div className="w-[1080px] flex justify-between">
      <div className="w-[30Pvh] flex items-center gap-[20px]">
        <div className="flex item-center gap-[5px]">
          <Image
            className="filter invert-[1]"
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
      <Image src={icon.Logo} alt="golobe_logo" />
      <div className="flex gap-[20px]">
        <button className="text-white">
          <Link href="/login">Login</Link>
        </button>
        <button className="text-white">
          <Link href="/account/register">Sign-Up</Link>
        </button>
      </div>
    </div>
  );
};

export default HeaderHomePage;

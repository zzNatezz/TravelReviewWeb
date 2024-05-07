import React from "react";
import Image from "next/image";
import icon from "@/asset/icon/icon";

const LoginOthers = () => {
  return (
    <div className="flex items-center justify-around">
      <div className="">
        <Image src={icon.icon_fb} alt="fb_icon" />
      </div>
      <div>
        <Image src={icon.icon_google} alt="gg_icon" />
      </div>
      <div>
        <Image src={icon.icon_apple} alt="apple_icon" />
      </div>
    </div>
  );
};

export default LoginOthers;

import React from "react";
import HeaderHomePage from "@/components/landingPage/HeaderHomePage";
import Image from "next/image";
import image from "@/asset/picture/image";
import icon from "@/asset/icon/icon";
import DoUThink from "@/components/landingPage/DoUThink";
import Allpost from "@/components/landingPage/Allpost";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center w-screen h-screen">
      <HeaderHomePage />
      <Image className="absolute pt-[3rem]" src={icon.Logo} alt="golobe_logo" />

      <Image
        className="pt-[1rem] brightness-75 z-[-100] "
        width="1380"
        height="580"
        src={image.boatAndSee}
        alt=""
      />
      <DoUThink />
      <Allpost />
    </div>
  );
}

import HeaderHomePage from "../landingPage/HeaderHomePage";
import Image from "next/image";
import icon from "@/asset/icon/icon";
import image from "@/asset/picture/image";
import DoUThink from "../landingPage/DoUThink";
import Allpost from "../landingPage/Allpost";

const FirstPage = () => {
  return (
    <div className="flex flex-col items-center w-screen h-[100%]">
      <HeaderHomePage />
      <Image
        className="absolute pt-[3rem] filter invert-[1]"
        src={icon.Logo}
        alt="golobe_logo"
      />

      <Image
        className="pt-[1rem] brightness-75 z-[-1]"
        width="1380"
        height="580"
        src={image.boatAndSee}
        alt=""
      />
      <DoUThink />
      <Allpost />
    </div>
  );
};

export default FirstPage;

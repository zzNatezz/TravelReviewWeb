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
      <Image className="absolute pt-[3rem]" src={icon.Logo} alt="golobe_logo" />
      <div className="absolute z-[-1]">
        <Image
          className="pt-[1rem] brightness-75 "
          width="1380"
          height="580"
          src={image.boatAndSee}
          alt="Image loading"
        />
      </div>
      <div className="flex flex-col items-center mt-[28rem]">
        <DoUThink />
        <Allpost />
      </div>
    </div>
  );
};

export default FirstPage;

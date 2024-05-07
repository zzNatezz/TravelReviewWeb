import React from "react";
import Image from "next/image";
import image from "@/asset/picture/image";

const SwitchImg = () => {
  return (
    <div>
      <Image src={image.airplaneFly} width="618" height="816" alt="" />
    </div>
  );
};

export default SwitchImg;

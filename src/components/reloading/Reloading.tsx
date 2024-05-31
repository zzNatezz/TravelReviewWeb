import icon from "@/asset/icon/icon";
import React from "react";
import Image from "next/image";
import { IReloading } from "@/util/allInterface";

const Reloading = ({ size, className }: IReloading) => {
  return (
    <Image
      className={`animate-spin ${className} `}
      width={size}
      height={size}
      src={icon.loadingIcon}
      alt=""
    ></Image>
  );
};

export default Reloading;

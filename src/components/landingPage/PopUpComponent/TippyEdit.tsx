"use client";
import Tippy from "@tippyjs/react/headless";
import Image from "next/image";
import icon from "@/asset/icon/icon";

import React, { useState } from "react";
import { log } from "console";

interface ITippyEdit {
  index: number;
}

const TippyEdit = ({ index }: ITippyEdit) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleVisible = () => {
    index ? setVisible(true) : setVisible(false);
  };
  return (
    <Tippy
      key={index}
      onClickOutside={() => handleVisible()}
      placement="bottom"
      visible={visible}
      interactive
      render={(attrs) => (
        <div
          className="box flex flex-col items-end text-xl mr-[4rem] gap-[2rem]"
          tabIndex={1}
          {...attrs}
        >
          <button className="bg-cyan-300 rounded-[1rem] px-[1rem] text-white ">
            Edit
          </button>
          <button className="bg-orange-600 rounded-[1rem] px-[1rem] text-white  ">
            Remove
          </button>
        </div>
      )}
    >
      <Image width={30} height={30} src={icon.settingIcon} alt="setting" />
    </Tippy>
  );
};

export default TippyEdit;

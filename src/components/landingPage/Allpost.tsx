"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import icon from "@/asset/icon/icon";
import timeFormat from "@/util/timeFormat";

const Allpost = () => {
  const [allPost, setAllPost] = useState<any[]>([]);
  let date = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await axios.get(
          "https://be-travel-review.vercel.app/v1/content"
        );
        console.log(data.data);

        setAllPost(data.data);
      } catch (error) {
        toast.error("Sever is being break out, sorry for this inconvenience");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-[20px] rounded-[2rem] bg-white shadow-[0px_20px_30px_-1px_rgba(0,0,0,1)] w-[900px] text-black p-[2rem] flex flex-col gap-y-[3rem]">
      {allPost.map((item: any, index: number) => (
        <div className="" key={index}>
          <div className="flex gap-x-[1rem]">
            <Image
              style={{
                borderRadius: "50%",
                overflow: "hidden",
                width: 90,
                height: 90,
              }}
              width="90"
              height="90"
              unoptimized
              src={item?.image.url ? item?.image.url : icon.defaultAvatar}
              alt="avatar"
            ></Image>
            <div>
              <h1>{item?.manWhoCreate?.userName}</h1>
              <div>{timeFormat(item?.createAt)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Allpost;

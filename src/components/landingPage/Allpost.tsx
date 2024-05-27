"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import icon from "@/asset/icon/icon";
import timeFormat from "@/util/timeFormat";
import PopUpCommentWithOutImg from "./subComponent/PopUpCommentWithOutImg";
import { useDispatch, useSelector } from "react-redux";
import { modalClose, modalOpen } from "../reduxFeature/modal";
import PopUpComment from "./subComponent/PopUpComment";

const Allpost = () => {
  const [allPost, setAllPost] = useState<any[]>([]);

  const isPopUp = useSelector((state: any) => state.modalState.isOpen);

  const dispatch = useDispatch();

  const handleOpenModal = (index: number) => {
    document.body.style.overflow = "hidden";
    dispatch(modalOpen(index));
  };

  const handleCloseModal = () => {
    document.body.style.overflow = "auto";
    dispatch(modalClose());
  };

  const handleClickAfterModalOpen = (e: any) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await axios.get(
          "https://be-travel-review.vercel.app/v1/content"
        );
        setAllPost(data.data);
      } catch (error) {
        toast.error("Sever is being break out, sorry for this inconvenience");
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className={
        isPopUp === undefined
          ? "mt-[20px] rounded-[2rem] bg-white shadow-[0px_20px_30px_-1px_rgba(0,0,0,1)] w-[56.25rem] text-black p-[2rem] flex flex-col gap-y-[5rem] h-max"
          : "mt-[20px] rounded-[2rem] bg-white shadow-[0px_20px_30px_-1px_rgba(0,0,0,1)] w-[56.25rem] text-black p-[2rem] flex flex-col gap-y-[5rem] h-max"
      }
    >
      {allPost.map((item: any, index: number) => (
        <div
          className={
            index % 2 === 0
              ? "p-[1rem] bg-white rounded-[20px] shadow-[0px_20px_30px_-1px_rgba(0,0,0)]"
              : "p-[1rem] bg-gray-100	 rounded-[20px] shadow-[0px_20px_30px_-1px_rgba(0,0,0)]"
          }
          key={index}
        >
          <div>
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
                src={
                  item?.manWhoCreate?.avatar
                    ? item?.manWhoCreate?.avatar
                    : icon.defaultAvatar
                }
                alt="avatar"
              />
              <div>
                <h1>{item?.manWhoCreate?.userName}</h1>
                <div>{timeFormat(item?.createAt)}</div>
              </div>
            </div>
            <div>
              <div className="py-[1.5rem]">{item?.content}</div>
              <div className="grid place-items-center">
                {item?.image?.url ? (
                  <Image
                    style={{ width: "500px", height: "300" }}
                    unoptimized
                    src={item?.image?.url}
                    alt=""
                    width={950}
                    height={300}
                    sizes="(max-width: 56.25rem)"
                  />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <hr className="mt-[2rem]" />
            <div className="mt-[1rem] flex items-center justify-between">
              <div className="flex items-center gap-x-[0.5rem]">
                <Image width={24} height={24} src={icon.heatUnactive} alt="" />
                <div>Reaction</div>
              </div>
              {/* {forcus on this} */}
              <button
                type="button"
                onClick={() => handleOpenModal(index)}
                className="flex items-center gap-x-[0.5rem]"
              >
                <Image width={24} height={24} src={icon.chatIcon} alt="" />
                Comment{" "}
              </button>
              {/* {forcus on this} */}
              <div className="flex items-center gap-x-[0.5rem]">
                <Image width={24} height={24} src={icon.shareIcon} alt="" />
                <div>Share</div>
              </div>
            </div>
          </div>
          {/* review modal */}
          {isPopUp === index ? (
            <div
              onClick={() => handleCloseModal()}
              className="fixed inset-0 bg-gray-200 bg-opacity-60 w-[100%] h-[100%] z-[3]"
            >
              {item?.image?.url === "" ? (
                <div
                  onClick={(e) => handleClickAfterModalOpen(e)}
                  className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[60rem] rounded-[20px] h-[max] z-[100]"
                >
                  <PopUpCommentWithOutImg item={item} index={index} />
                </div>
              ) : (
                <div
                  onClick={(e) => handleClickAfterModalOpen(e)}
                  className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[80rem] rounded-[20px] h-[max] z-[100]"
                >
                  <PopUpComment item={item} index={index} />
                </div>
              )}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Allpost;

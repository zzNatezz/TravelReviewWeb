"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import icon from "@/asset/icon/icon";
import timeFormat from "@/util/timeFormat";
import PopUpCommentWithOutImg from "./PopUpComponent/PopUpCommentWithOutImg";
import { useDispatch, useSelector } from "react-redux";
import { modalClose, modalOpen } from "../reduxFeature/modal";
import PopUpComment from "./PopUpComponent/PopUpComment";
import Reloading from "../reloading/Reloading";
import { loadingEnd, loadingStart } from "../reduxFeature/reloadingState";
import TippyEdit from "./PopUpComponent/TippyEdit";
import EditPost from "./IsEdit/EditPost";
import { jwtDecode } from "jwt-decode";
import { IuserJWTPayLoad } from "@/util/allInterface";
import { unSetIndex } from "../reduxFeature/handleEdit";
import { useRouter } from "next/navigation";
import QttCmt from "./QttCmt";

const Allpost = () => {
  const [allPost, setAllPost] = useState<any[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");

  const isPopUp = useSelector((state: any) => state.modalState.isOpen);
  const isLoading = useSelector((state: any) => state.isLoading.isLoading);
  const isFetchingPost = useSelector((state: any) => state.postStt.isFetching);
  const FetchingRemovedPost = useSelector(
    (state: any) => state.removePost.isFetching
  );
  const isFetchingEdit = useSelector(
    (state: any) => state.modifyString.isFetching
  );
  const isIndex = useSelector((state: any) => state.isIndex.index);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleOpenModal = (index: number) => {
    if (!userId) {
      return router.push("/login");
    } else {
      document.body.style.overflowY = "hidden";
      dispatch(modalOpen(index));
    }
  };

  const handleCloseModal = () => {
    document.body.style.overflowY = "auto";
    dispatch(unSetIndex());
    dispatch(modalClose());
  };

  const handleClickAfterModalOpen = (e: any) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(loadingStart());
        const data: any = await axios.get(
          "https://be-travel-review.vercel.app/v1/content"
        );
        setAllPost(data.data);
        dispatch(loadingEnd());

        const user = global?.window?.localStorage?.getItem("AC")
          ? JSON?.parse(localStorage?.getItem("AC") || "")
          : null;

        const decodeUser = jwtDecode<IuserJWTPayLoad>(user);
        setUserId(decodeUser?.user?._id);
        setUserAvatar(decodeUser?.user?.avatar.url);
      } catch (error) {
        dispatch(loadingEnd());
      }
    };
    fetchData();
    document.body.style.overflowX = "hidden";
  }, [isFetchingPost, FetchingRemovedPost, isFetchingEdit]);

  return (
    <div className="mt-[20px] rounded-[2rem] bg-white shadow-[0px_20px_30px_-1px_rgba(0,0,0,1)] w-[56.25rem] text-black p-[2rem] flex flex-col gap-y-[5rem] h-max">
      {(isLoading ||
        isFetchingPost ||
        FetchingRemovedPost ||
        isFetchingEdit) && <Reloading size={50} className="self-center" />}
      {allPost.map((item: any, index: number) => (
        <div
          className="p-[1rem] bg-white rounded-[20px] shadow-[0px_20px_30px_-1px_rgba(0,0,0)]"
          key={index}
        >
          <div>
            <div className="flex items-start justify-between">
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
                    item?.manWhoCreate?.avatar?.url === ""
                      ? icon.defaultAvatar
                      : item?.manWhoCreate?.avatar?.url
                  }
                  alt="avatar"
                />
                <div>
                  <h1 className="font-bold text-xl">
                    {item?.manWhoCreate?.userName}
                  </h1>
                  <div>{timeFormat(item?.createAt)}</div>
                </div>
              </div>
              {item?.manWhoCreate?._id === userId ? (
                <TippyEdit item={item} index={index} />
              ) : null}
            </div>
            <div>
              {/* Edit content nam o day ne */}
              {isIndex === index ? (
                <EditPost item={item} />
              ) : (
                <div className="py-[1.5rem]">{item?.content}</div>
              )}

              {/* Edit content nam o day ne */}
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
                ) : null}
              </div>
            </div>
            <hr className="mt-[2rem]" />
            <div className="mt-[1rem] flex items-center justify-between">
              <div className="flex items-center gap-x-[0.5rem] hover:bg-rose-400 rounded-xl px-[0.4rem] ">
                <Image width={24} height={24} src={icon.heatUnactive} alt="" />
                <div>Reaction</div>
              </div>
              <button
                type="button"
                onClick={() => handleOpenModal(index)}
                className="flex items-center gap-x-[0.5rem] hover:bg-cyan-400 rounded-xl px-[0.5rem] py-[0.2rem] "
              >
                <Image width={24} height={24} src={icon.chatIcon} alt="" />
                <QttCmt postId={item._id} />
                <span> Comment </span>
              </button>
              <div className="flex items-center gap-x-[0.5rem] hover:bg-yellow-300 rounded-xl px-[0.5rem] py-[0.2rem]">
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
                  <PopUpCommentWithOutImg
                    item={item}
                    index={index}
                    avatar={userAvatar}
                    isUserId={userId}
                  />
                </div>
              ) : (
                <div
                  onClick={(e) => handleClickAfterModalOpen(e)}
                  className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[80rem] rounded-[20px] h-[max] z-[100]"
                >
                  <PopUpComment
                    item={item}
                    index={index}
                    avatar={userAvatar}
                    isUserId={userId}
                  />
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

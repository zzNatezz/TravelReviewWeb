"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchEnd } from "../reduxFeature/openSearch";
import icon from "@/asset/icon/icon";
import Image from "next/image";
import useDebounce from "@/util/useDebounce";
import { Api_Q_user } from "@/util/apiCall";
import Reloading from "../reloading/Reloading";

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const findedUser = useSelector((state: any) => state.Quser.listUser);
  const loading = useSelector((state: any) => state.Quser.isFetching);

  const dispatch = useDispatch();
  const handleClickAfterModalOpen = (e: any) => {
    e.stopPropagation();
  };

  const valueDelay = useDebounce(searchValue, 2000);

  useEffect(() => {
    Api_Q_user(dispatch, valueDelay);
  }, [valueDelay]);

  return (
    <div
      onClick={(e) => dispatch(searchEnd()) && e.stopPropagation}
      className="fixed inset-0 bg-gray-200 bg-opacity-60 w-[100%] h-[100%] z-[3]"
    >
      <div
        onClick={(e) => handleClickAfterModalOpen(e)}
        className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[100vh] rounded-[20px] h-[95vh] z-[100] p-[1rem]"
      >
        <div className="flex flex-col items-center gap-[2vh] ">
          <label className=" relative " htmlFor="search">
            <Image
              className=" rounded-xl pointer-events-none bg-gray-200 absolute h-[3rem] py-[0.5rem] top-[50%] translate-y-[-50%] left"
              width={70}
              height={70}
              src={icon.searchIcon}
              alt="searchIcon"
            />
            <input
              className="h-[3rem] py-[1rem] w-[90vh] rounded-xl pl-[5rem] pr-[1vh] outline outline-[1px] "
              type="text"
              id="search"
              placeholder="Finding someone"
              required
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </label>
        </div>
        <div className="mt-[1rem] ">
          {loading && <Reloading size={50} className=" mx-auto" />}
          <div className="flex flex-col items-start px-[0.5rem] gap-y-[1rem] ">
            {!findedUser && (
              <div> No user use this name, please try other </div>
            )}
            {findedUser &&
              findedUser.map((item: any, index: number) => (
                <div
                  className=" flex flex-row gap-y-[2rem] items-center justify-center gap-y-[1rem] "
                  key={index}
                >
                  <Image
                    className="rounded-[50%] p-[0.2rem] w-[10vh] h-[10vh] "
                    width={100}
                    height={100}
                    src={
                      item.avatar.url === ""
                        ? icon.defaultAvatar
                        : item.avatar.url
                    }
                    alt=""
                  />

                  <div className="bg-gray-300 w-[80vh] rounded-xl pl-[1rem] py-[1rem] ">
                    {item.userName}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchEnd } from "../reduxFeature/openSearch";
import icon from "@/asset/icon/icon";
import Image from "next/image";
import useDebounce from "@/util/useDebounce";

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [showQuery, setShowQuery] = useState<any[]>();
  const dispatch = useDispatch();
  const handleClickAfterModalOpen = (e: any) => {
    e.stopPropagation();
  };

  const valueDelay = useDebounce(searchValue, 2000);

  useEffect(() => {
    console.log(searchValue);
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
          <div>{searchValue && searchValue}</div>
        </div>
      </div>
    </div>
  );
};

export default Search;

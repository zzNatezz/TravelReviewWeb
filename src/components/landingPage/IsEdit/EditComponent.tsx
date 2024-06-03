import React from "react";
import { IpopUp } from "@/util/allInterface";
import toast from "react-hot-toast";

const EditComponent = ({ item, index }: IpopUp) => {
  const content = item?.content;
  const handleSubmitEdit = (e: any) => {
    e.preventDefault();
    toast("This action is being processed", {
      duration: 6000,
    });
  };
  const handleCancleEdit = (e: any) => {
    e.preventDefault();
    toast("This action is being processed", {
      duration: 6000,
    });
  };

  return (
    <div className="flex flex-col gap-y-[2rem]">
      <textarea
        className={
          content.length <= 315
            ? "w-[100%] outline outline-1 rounded-xl px-[0.5rem] px-[1rem]"
            : "w-[100%] h-[20rem] outline outline-1 rounded-xl px-[0.5rem] px-[1rem]"
        }
        name="editShow"
        defaultValue={item?.content}
      />

      <div className="flex items-center justify-between">
        <button
          className="py-[1rem] px-[0.5rem] bg-cyan-300 text-white rounded-xl "
          onClick={(e) => handleCancleEdit(e)}
        >
          Cancle
        </button>
        <button
          className="py-[1rem] px-[0.5rem] bg-rose-500 text-white rounded-xl "
          onClick={(e) => handleSubmitEdit(e)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditComponent;

import axios from "axios";
import React, { useEffect, useState } from "react";

const QttCmt = ({ postId }: any) => {
  const [totalCmt, setTotalCmt] = useState<number>(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data: any = await axios.get(
          `https://be-travel-review.vercel.app/v1/comment/quantities/${postId}`
        );
        setTotalCmt(data?.data?.quantitesComment);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return <div>{totalCmt}</div>;
};

export default QttCmt;

"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { id: String } }) => {
  const searchParams = useSearchParams();

  const [formResponse, setFormResponse] = useState({});
  const [pageNo, setPageNo] = useState(0);
  useEffect(() => {
    async function fetchData() {
      // setFormResponse(await axios.get(`/api/getresponse/${params.id}`));
      const response = await axios.get(`/api/getresponses/${params.id}`, {
        data: pageNo,
      });
      console.log(response, "respoooooonse");
    }
    fetchData();
  }, []);

  return <div>helloss {params.id}</div>;
};

export default page;

"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/app/functions/commonFunctions";

const Search = () => {
  const router = useRouter();
  const searchparams = useSearchParams();
  const [keyword, setKeyword] = useState("");

  // add search query on form submit
  const submitHandler = () => {
    if (keyword !== "") {
      router.push("?" + createQueryString(searchparams, "keyword", keyword));
    } else {
      router.replace("?" + createQueryString(searchparams, "", ""));
    }
  };
  return (
    <form
      className="flex flex-nowrap items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        type="text"
        placeholder="Enter your keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="button"
        className="px-4 py-2 inline-block  border border-transparent bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={submitHandler}
        disabled={!keyword}
      >
        Search
      </button>
    </form>
  );
};

export default Search;

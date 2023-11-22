"use client";
import fetcher from "@/utills/fetcher";
import { useMemo, useState } from "react";
import useSWR from "swr";

const Test = () => {
  const [text, setText] = useState(null);
  const {
    data: categories,
    mutate,
    isLoading,
  } = useSWR(`http://localhost:3000/api/category/cat?q=${text}`, fetcher);

  const onChange = (e) => {
    if (e.target.value) {
      setText(e.target.value);
    }
  };

  const disabled = useMemo(() => {
    return !isLoading && !categories.some((d) => d.title === text);
  }, [text]);

  return (
    <div className="flex">
      <div>
        <input
          className="text-black"
          type="search"
          list="list"
          autoComplete="on"
          value={text}
          onChange={onChange}
        />

        <datalist id="list">
          {isLoading
            ? "loading..."
            : categories.map((d) => <option key={d.id} value={d.title} />)}
        </datalist>
      </div>
      <div>
        <button className="disabled:cursor-not-allowed" disabled={disabled}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Test;

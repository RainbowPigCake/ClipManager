import React, { useState } from "react";
import "./index.css";

const maxStrLengthTitle = 31;

export default function Clip({ filePath, handleClickClip }) {
  const parsedPath = filePath.split(/[/\\]/).pop();

  return (
    <>
      <div
        className="flex flex-col m-3 p-1 hover:cursor-pointer hover:shadow-slate-300 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300"
        onClick={() => handleClickClip(filePath)}
      >
        <div className="w-276 h-155">
          <img className="rounded-lg"
            src="https://cdn.discordapp.com/attachments/982835971458486322/1240389613072420964/7da6f32c-6682-4aa0-b0f2-2e99589d7287-1711871401481.jpg?ex=66466259&is=664510d9&hm=97915057684bc26ff6a571ac8a3ce2170fc0c1fc1db235a4616162440ed2f3a4&"
          />
        </div>
        <div className="text-left font-bold text-white text-base font-inter">
          {parsedPath.length > maxStrLengthTitle
            ? parsedPath.slice(0, maxStrLengthTitle - 3) + "..."
            : parsedPath}
        </div>
      </div>
    </>
  );
}

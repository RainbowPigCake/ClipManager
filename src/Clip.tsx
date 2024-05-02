import React, { useState } from "react";
import "./index.css";

const maxStrLengthTitle = 31;

export default function Clip({ filePath, handleClickClip }) {
  const parsedPath = filePath.split(/[/\\]/).pop();

  return (
    <>
      <div
        className="flex flex-col m-3 p-1 hover:cursor-pointer hover:shadow-slate-300"
        onClick={() => handleClickClip(filePath)}
      >
        <img
          className="w-276 rounded-lg h-155"
          src="https://cdn.discordapp.com/attachments/982835971458486322/1234710593340964905/image.png?ex=6631b959&is=663067d9&hm=ba1d114998edf3b3afc3b00eb1510c1e67069c9716d0029f766d49e98271f60a&"
        />
        <div className="text-left font-bold text-white text-base font-inter">
          {parsedPath.length > maxStrLengthTitle
            ? parsedPath.slice(0, maxStrLengthTitle - 3) + "..."
            : parsedPath}
        </div>
      </div>
    </>
  );
}

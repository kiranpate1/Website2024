import React, { MutableRefObject, useRef, useState, useEffect } from "react";

type Props = {
  type: string;
};

const Tag = ({ type }: Props) => {
  return (
    <div className="py-[10px] px-3 rounded-2xl bg-[rgba(255,255,255,0.1)]">
      <div className="font-mono-reg font-light text-gray-400">{type}</div>
    </div>
  );
};

export default Tag;

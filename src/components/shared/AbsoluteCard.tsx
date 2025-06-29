import React from "react";
// TODO: Replace these with your actual icon and button components
// import IconoirQuoteSolid from "./assets/IconoirQuoteSolid";
// import ButtonClearGeneratedFlow from "./assets/ButtonClearGeneratedFlow";
// import Img from "./assets/Img";
// import Frame from "./assets/Frame";
// import Img1 from "./assets/Img1";

interface AbsoluteCardProps {
  className?: string;
  prompt?: string;
  onClear?: () => void;
}

export default function AbsoluteCard({ className = "", prompt, onClear }: AbsoluteCardProps) {
  return (
    <div
      className={`font-poppins flex w-full flex-col gap-3 rounded-2xl border border-solid border-gray-700 px-6 pb-8 pt-4 leading-normal [background-image:linear-gradient(90deg,_#050506,_#111827)] ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 min-[554px]:flex-nowrap" >
        <div className="flex items-center justify-center gap-2">
          {/* TODO: Replace with <IconoirQuoteSolid /> */}
          <span className="h-6 w-6 bg-gray-700 rounded-full inline-block" />
          <div className="text-sm font-medium text-gray-400">Prompt</div>
        </div>
        {/* TODO: Replace with <ButtonClearGeneratedFlow /> */}
        <button className="h-8 w-8 rounded-lg bg-gray-800 flex items-center justify-center" onClick={onClear}>
          <span className="text-xs text-gray-400">✕</span>
        </button>
      </div>
      <div className="flex items-center text-xl leading-7 text-slate-200">
        <p>
          {prompt || "An app called Catify that is a dashboard that allows the user to monitor the health and food intake of their pets and suggests activities and food and ways to enrich your pets life."}
        </p>
      </div>
      <div className="flex items-end justify-center px-12 pt-4">
        <div className="flex flex-grow flex-wrap items-center justify-center gap-x-12 gap-y-3 pl-8 text-white min-[554px]:flex-nowrap" >
          <div className="flex items-center justify-center gap-2">
            {/* TODO: Replace with <Img /> */}
            <span className="h-5 w-5 bg-sky-500 rounded inline-block" />
            <div>Download Flow</div>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-2xl px-8 py-3 drop-shadow-lg bg-gradient-to-r from-orange-400 to-pink-500" >
            {/* TODO: Replace with <Frame /> */}
            <span className="h-[18px] w-3.5 bg-pink-400 rounded inline-block" />
            <div>Try the Plugin</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end pt-2">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 rounded-2xl border-solid border-gray-200 p-3 drop-shadow-lg bg-gradient-to-r from-sky-400 to-violet-500 min-[554px]:flex-nowrap" >
          {/* TODO: Replace with <Img1 /> */}
          <span className="h-5 w-5 bg-violet-400 rounded inline-block" />
          <div className="text-lg font-medium leading-6">Save Flow</div>
        </div>
      </div>
    </div>
  );
} 
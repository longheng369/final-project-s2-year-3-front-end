import React from "react";
import { FaRegImage } from "react-icons/fa";

const CardSkeleton = () => {
  return (
    <div className="w-[270px] h-[361px] bg-gray-100 rounded-sm  overflow-hidden shadow-sm cursor-pointer transition-all duration-200 hover:scale-[1.02]">
        <div className="w-full h-[66%] bg-gray-300 animate-pulse flex justify-center items-center overflow-hidden">
          <div>
            <FaRegImage className="text-[4rem] text-gray-400" />
          </div>
        </div>
      <div className="flex flex-col gap-3 mt-3">
        <div className="px-2 pt-1 bg-gray-300 w-7/12 h-6 rounded-lg animate-pulse ml-2"></div>
        <div className="px-2 pt-1 bg-gray-300 w-10/12 h-6 rounded-lg animate-pulse ml-2">
          
        </div>
        <div className="flex justify-between gap-4 w-full pr-3">
          <div className="px-2 pt-1 bg-gray-300 w-10/12 h-6 rounded-lg animate-pulse ml-2"></div>
          <div className="px-2 pt-1 bg-gray-300 w-10/12 h-6 rounded-lg animate-pulse ml-2"></div>
        </div>
        
      </div>
    </div>
  );
};

export default CardSkeleton;

import React from 'react'
import { FaRegImage } from "react-icons/fa";

const CategoryCard = () => {
  return (
    <div className='h-[330px] bg-gray-100 rounded-md'>
        <div className='w-full h-[85%] bg-gray-300 rounded-md flex justify-center items-center'>
            <FaRegImage className="text-[4rem] text-gray-400"/>
        </div>
        <div className='w-8/12 h-[30px] mt-2 ml-2 bg-gray-300 rounded-md'></div>
    </div>
  )
}

export default CategoryCard
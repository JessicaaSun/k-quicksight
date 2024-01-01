import React from 'react'
import { FaList } from 'react-icons/fa6'
import { HiMiniViewColumns } from 'react-icons/hi2'

const ViewMode = ({toggleViewMode, viewMode}) => {
  return (
    <div>
       <div
          className="text-primary-color font-medium flex justify-center items-center cursor-pointer h-[40px] dark:text-third-color p-2 rounded-lg dark:hover:bg-yellow-100 hover:bg-blue-100"
          onClick={toggleViewMode}
        >
          {viewMode === "list" ? (
            <HiMiniViewColumns size={28} />
          ) : (
            <FaList size={24} />
          )}
        </div>
    </div>
  )
}

export default ViewMode

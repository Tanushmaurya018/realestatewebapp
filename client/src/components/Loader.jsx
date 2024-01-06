import React from 'react'
import bufferGif from "../assets/buffer2.gif"
const Loader = () => {
  return (
    <div className='z-[1000] fixed top-0 bottom-0 left-0 right-0  flex justify-center items-center h-full  bg-white backdrop-blur-sm  bg-opacity-70'>
        <div className='grayscale'>
            <img src={bufferGif} className='bg-cover h-[100px]'></img>
        </div>
    </div>
  )
}

export default Loader
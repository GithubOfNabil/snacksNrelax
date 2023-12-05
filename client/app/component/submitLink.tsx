import React from 'react'

export const YoutubeLink = () => {
  return (
    <div>
        <div className='flex flex-col'>
            <p className=' text-xl text-white mb-2' >Enter YouTube channel url... </p>
            <form action="">
                <input className='bg-purple-700 text-white text-lg focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 h-12 w-96 rounded-lg pl-6' placeholder='url..' type="text" />
            </form>
        </div>
    </div>
  )
}

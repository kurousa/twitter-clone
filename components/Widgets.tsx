import { SearchIcon } from '@heroicons/react/outline'
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import React from 'react'

function Widgets() {
  return (
    <div className='col-span-2 px-2 mt-2 hidden lg:inline'>
      {/* SearchBox */}
      <div className='flex items-center space-x-2 bg-gray-100 p-3 rounded-full mt-2'>
        <SearchIcon className="h-5 w-5 text-gray-400"/>
        <input
          className="bg-transparent flex-1 outline-none"
          type="text"
          placeholder='Search Twitter'
        />
      </div>

      {/* Tweets */}
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="__blackrabbit__"
        options={{height: 1000}}
      />
    </div>
  )
}

export default Widgets

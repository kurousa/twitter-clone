import React, { useState } from 'react'
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon
} from '@heroicons/react/outline';
import TweetBoxButtons from './TweetBoxButtons';


function TweetBox() {

  const [input, setInput] = useState<string>('');

  return (
    <div className='flex space-x-2 p-5'>
        <img 
        className="mt-4 h-14 w-14 object-cover rounded-full" 
        src="avatar-man-icon.jpg"
        alt="" />

        <div className='flex flex-1 items-center pl-2'>
          <form className='flex flex-1 flex-col' action="" >

            <input 
              value={input}
              onChange={(e) => setInput(e.target.value) }
              className='h-24 w-full text-xl outline-none placeholder:text-xl' 
              type="text" 
              placeholder='What`s Happening?' 
            />

            <div className='flex items-center'>
              <div className="flex flex-1 space-x-2 text-twitter ">
                <TweetBoxButtons Icon={PhotographIcon} />
                <TweetBoxButtons Icon={SearchCircleIcon} />
                <TweetBoxButtons Icon={EmojiHappyIcon} />
                <TweetBoxButtons Icon={CalendarIcon} />
                <TweetBoxButtons Icon={LocationMarkerIcon} />
              </div>
              
              <button 
                disabled={!input}
                className='bg-twitter px-5 py-2 font-bold text-white rounded-full  disabled:opacity-40'>
                  Tweet
              </button>
            </div>

          </form>
        </div>
    </div>
  )
}

export default TweetBox

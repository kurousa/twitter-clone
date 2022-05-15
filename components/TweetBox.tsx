import React, { Dispatch, MouseEvent, SetStateAction, useRef, useState } from 'react'
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon
} from '@heroicons/react/outline';
import TweetBoxButtons from './TweetBoxButtons';
import { useSession } from 'next-auth/react';
import { Tweet, TweetBody } from '../typings';
import { fetchTweets } from '../utils/fetchTweet';
import toast from 'react-hot-toast';

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function TweetBox({ setTweets }: Props) {

  const [input, setInput] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const imageInputRef = useRef<HTMLInputElement>(null);

  const { data: session } = useSession();
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);

  const addImageToTweet = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (!imageInputRef.current?.value) return;

    setImage(imageInputRef.current.value);
    imageInputRef.current.value = '';
    setImageUrlBoxIsOpen(false)
  }

  const postTweet = async () => {
    const postToast = toast.loading('Tweet Posting...');
    const tweetBody: TweetBody = {
      text: input,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || "avatar-man-icon.jpg",
      image: image,
    }
    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetBody),
      method: 'POST',
    });

    const json = await result.json();

    const newTweets = await fetchTweets();
    setTweets(newTweets);

    toast.success('Tweet Posted', {
      id: postToast,
    })
    return json
  }
  const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    // if (!input) return;
    debugger
    postTweet();

    setInput('');
    setImage('');
    setImageUrlBoxIsOpen(false);
  }

  return (
    <div className='flex space-x-2 p-5'>
      <img
        className="mt-4 h-14 w-14 object-cover rounded-full"
        src={session?.user?.image || "avatar-man-icon.jpg"}
        alt="" />

      <div className='flex flex-1 items-center pl-2'>
        <form className='flex flex-1 flex-col' action="" >

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='h-24 w-full text-xl outline-none placeholder:text-xl'
            type="text"
            placeholder='What`s Happening?'
          />

          <div className='flex items-center'>
            <div className="flex flex-1 space-x-2 text-twitter ">
              <PhotographIcon
                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <TweetBoxButtons Icon={SearchCircleIcon} />
              <TweetBoxButtons Icon={EmojiHappyIcon} />
              <TweetBoxButtons Icon={CalendarIcon} />
              <TweetBoxButtons Icon={LocationMarkerIcon} />
            </div>

            <button
              disabled={!input || !session}
              onClick={handleSubmit}
              className='bg-twitter px-5 py-2 font-bold text-white rounded-full  disabled:opacity-40'>
              Tweet
            </button>
          </div>

          {imageUrlBoxIsOpen && (
            <form className='mt-5 flex rounded-lg bg-twitter/80 py-2 px-4'>
              <input
                ref={imageInputRef}
                className='flex-1 p-2 bg-transparent outline-none text-white placeholder:text-white'
                type="text"
                placeholder='Enter Image URL...' />
              <button
                onClick={e => addImageToTweet(e)}
                className='font-bold text-white'>Add Image</button>
            </form>
          )}

          {image && (
            <img
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={image}
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default TweetBox

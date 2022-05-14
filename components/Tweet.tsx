import React, { useEffect, useState } from 'react'
import { Comment, Tweet } from '../typings'
import TimeAgo from 'react-timeago'
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon
} from '@heroicons/react/outline'
import { fetchComments } from '../utils/fetchComments'

interface Props {
  tweet: Tweet
}

function Tweet({ tweet }: Props) {
  const [comments, setComments] = useState<Comment[]>([])
  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments);
  }

  useEffect(() => { refreshComments() }, [])

  return (
    <div className='flex flex-col space-x-3 border-y border-gray-100 p-5'>
      <div className='flex space-x-3'>
        <img
          className='h-10 w-10 rounded-full object-cover'
          src={tweet.profileImg}
          alt=''
        />

        <div>
          <div className='flex items-center space-x-1'>
            <p className='mr-1 font-bold'>{tweet.username}</p>
            <p className='hidden text-sm text-gray-500 sm:inline'>@{tweet.username.replace(/\s+/g, '').toLocaleLowerCase()}</p>
            <TimeAgo
              date={tweet._createdAt}
              className="text-sm text-gray-500"
            />
          </div>

          <p className='pt-1'>{tweet.text}</p>

          {tweet.image && (
            <img
              src={tweet.image}
              alt=''
              className='m-5 ml-0 mb-1 max-h-60 rounded-1g object-cover shadow-sm'
            />
          )}
        </div>
      </div>
      <div className='flex justify-between mt-5'>
        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
          <ChatAlt2Icon className='h-5 w-5' />
          <p>{comments.length}</p>
        </div>
        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
          <SwitchHorizontalIcon className='h-5 w-5' />
        </div>
        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
          <HeartIcon className='h-5 w-5' />
        </div>
        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
          <UploadIcon className='h-5 w-5' />
        </div>
      </div>

      {/* CommentsBoxLogic */}
      {comments?.length > 0 && (
        <div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5'>
          {comments.map((comment) => (
            <div className="relative flex space-x-2" key={comment._id}>
              <hr className='absolute left-5 top-10 h-14 border-x border-twitter/30' />
              <img
                src={comment.profileImg}
                className="mt-2 h-7 w-7 object-cover rounded-full"
                alt=""
              />
              <div>
                <div className='flex items-center space-x-1'>
                  <p className='mr-1 font-bold'>{comment.username}</p>
                  <p className='hidden text-sm text-gray-500 lg:inline'>@{comment.username.replace(/\s+/g, '').toLowerCase()}</p>
                </div>

                <TimeAgo
                  date={comment._createdAt}
                  className="text-sm text-gray-500"
                />
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tweet

import React from 'react'
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
  DotsCircleHorizontalIcon,
} from '@heroicons/react/outline';
import SidebarRow from './SidebarRow';


function Sidebar() {
  return (
    <div className='col-span-2 flex flex-col items-center px-4 md:items-start'>
      <img className='m-3 w-12 h-10' src="twitter-logo.png" alt=""/>
      <SidebarRow Icon={HomeIcon} title="Home"/>
      <SidebarRow Icon={HashtagIcon} title="Explore"/>
      <SidebarRow Icon={BellIcon} title="Notifications"/>
      <SidebarRow Icon={MailIcon} title="Messages"/>
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks"/>
      <SidebarRow Icon={CollectionIcon} title="Lists"/>

      <SidebarRow Icon={DotsCircleHorizontalIcon} title="More"/>
      <SidebarRow Icon={UserIcon} title="Sign In"/>

    </div>
  )
}

export default Sidebar

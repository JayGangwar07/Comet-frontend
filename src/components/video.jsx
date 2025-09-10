import React, { useState } from 'react';
import time from "../utils/time.js"
import helperDuration from "../utils/duration.js"
import { useNavigate } from "react-router"

const VideoComponent = ({
  vidId,
  videoTitle,
  videoThumbnail,
  videoDescription,
  videoDuration,
  videoOwner,
  videoSubscribers,
  videoViews,
  videoDaysAgo,
  profileImage
}) => {
  
  const navigate = useNavigate()
  
  const [title, setTitle] = useState(videoTitle);
  const [videoId, setVideoId] = useState(vidId)
  const [channel, setChannel] = useState(videoOwner);
  const [subscribers, setSubscribers] = useState(videoSubscribers);
  const [views, setViews] = useState(videoViews);
  const [daysAgo, setDaysAgo] = useState(time(videoDaysAgo));
  const [thumbnail, setThumbnail] = useState(videoThumbnail); // Replace with actual thumbnail path
  const [duration, setDuration] = useState(helperDuration(videoDuration));
  const [avatar,setAvatar] = useState(profileImage)

  function watchVideo(){
    console.log(videoId)
    navigate(`/${videoId}`)
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1 w-[95%] mx-[2.5%]"
    onClick={watchVideo}
    >
      <div className="relative aspect-video">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-s px-2 py-1 rounded-md font-extrabold">
          {duration}
        </div>
      </div>
      <div className="p-4 bg-gray-900">
        <h3 className="text-base font-bold text-white mb-1 line-clamp-2">{title}</h3>
        <p className="text-gray-400 text-sm inline text-l font-bold">
        <img
        src={avatar}
        className="w-8 h-8 inline rounded-full"
        />
        {channel} • {subscribers} Subscribers</p>
        <p className="text-gray-400 text-xs mt-2">{views} views • {daysAgo}</p>
      </div>
    </div>
  );
};

export default VideoComponent;
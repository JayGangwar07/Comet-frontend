import React, { useState } from 'react';

const VideoComponent = ({videoTitle, videoThumbnail, videoDescription}) => {
  const [title, setTitle] = useState(videoTitle);
  const [channel, setChannel] = useState("The Adventurer");
  const [subscribers, setSubscribers] = useState("1.2M subscribers");
  const [views, setViews] = useState("10K views");
  const [daysAgo, setDaysAgo] = useState("2 days ago");
  const [thumbnail, setThumbnail] = useState("src/assets/logo.png"); // Replace with actual thumbnail path
  const [duration, setDuration] = useState("10:00");

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1 w-[95%] mx-[2.5%]">
      <div className="relative aspect-video">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-s px-2 py-1 rounded-md font-extrabold">
          {duration}
        </div>
      </div>
      <div className="p-4 bg-gray-900">
        <h3 className="text-base font-bold text-white mb-1 line-clamp-2">{title}</h3>
        <p className="text-gray-400 text-sm">{channel} • {subscribers}</p>
        <p className="text-gray-400 text-xs mt-2">{views} • {daysAgo}</p>
      </div>
    </div>
  );
};

export default VideoComponent;
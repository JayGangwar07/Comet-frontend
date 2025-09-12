import React, { useState, useRef } from 'react';
import { Upload, Video, Image } from 'lucide-react';
import axios from "axios"
import { useNavigate } from "react-router"

const VideoUploadInterface = () => {
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  
  const thumbnailInputRef = useRef(null);
  const videoInputRef = useRef(null);
  
  const navigate = useNavigate()

  const handleThumbnailDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setThumbnailPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setVideoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailClick = () => {
    thumbnailInputRef.current.click();
  };

  const handleVideoClick = () => {
    videoInputRef.current.click();
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setThumbnailPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setVideoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const publishVideo = () => {
    
    console.log("Upload started")
    
    const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", thumbnailFile);
      formData.append("videoFile", videoFile);

      axios.post("https://jaytube.onrender.com/api/v1/videos/", formData, {
      withCredentials: true,
      maxContentLength: Infinity,
      maxBodyLength: Infinity
      })

      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
      
      window.alert("Video will be uploaded in some time")
      
      navigate("/home")
      
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <img 
          src="src/assets/logo.png"
          />
          <span className="text-xl font-semibold">Comet</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Explore</a>
          <a href="#" className="text-white font-medium">Create</a>
        </nav>
        
        <div className="flex items-center space-x-4">
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8 lg:mb-12">Upload Video</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Thumbnail Upload */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Thumbnail</h2>
              <div
                className="relative border-2 border-dashed border-gray-600 rounded-lg p-8 lg:p-12 text-center cursor-pointer hover:border-gray-500 transition-colors aspect-video bg-gray-800"
                onDrop={handleThumbnailDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onClick={handleThumbnailClick}
              >
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-300">
                      <p className="font-medium mb-1">Drag & drop or click to upload</p>
                      <p className="text-sm text-gray-400">JPG, PNG, GIF. Max 10MB</p>
                    </div>
                  </>
                )}
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </div>
              {thumbnailFile && (
                <p className="text-sm text-gray-400 mt-2">
                  {thumbnailFile.name} ({formatFileSize(thumbnailFile.size)})
                </p>
              )}
            </div>

            {/* Video Upload */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Video File</h2>
              <div
                className="relative border-2 border-dashed border-gray-600 rounded-lg p-8 lg:p-12 text-center cursor-pointer hover:border-gray-500 transition-colors aspect-video bg-gray-800"
                onDrop={handleVideoDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onClick={handleVideoClick}
              >
                {videoPreview ? (
                  <video
                    src={videoPreview}
                    className="w-full h-full object-cover rounded"
                    controls
                  />
                ) : (
                  <>
                    <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-300">
                      <p className="font-medium mb-1">Drag & drop or click to upload</p>
                      <p className="text-sm text-gray-400">MP4, MOV, AVI. Max 100MB</p>
                    </div>
                  </>
                )}
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                />
              </div>
              {videoFile && (
                <p className="text-sm text-gray-400 mt-2">
                  {videoFile.name} ({formatFileSize(videoFile.size)})
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-lg font-semibold mb-3">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., My Awesome Video"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-lg font-semibold mb-3">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell viewers about your video"
                rows={8}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Publish Button */}
            <button 
            onClick={publishVideo}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 mt-8">
              Publish Video
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoUploadInterface;
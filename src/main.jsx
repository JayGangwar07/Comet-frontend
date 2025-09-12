import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'
import App from './App.jsx'
import Video from "./components/video.jsx"
import Tweet from "./components/tweet.jsx"
import Post from "./components/post.jsx"

// Pages import
import Login from "./pages/login.jsx"
import Register from "./pages/register.jsx"
import Channel from "./pages/channel.jsx"
import Loader from "./pages/loader.jsx"
import Home from "./pages/home.jsx"
import ErrorPage from "./pages/error.jsx"
import VideoPlayback from "./pages/videoPlayback.jsx"
import VideoUpload from "./pages/uploadVideo.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: "/login",
            element: <Login />,
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/home",
          element: <Home />
        },
        {
          path: "/channel",
          element: <Channel />
        },
        {
          path: "/loader",
          element: <Loader />
        },
        {
          path: "/:vidId",
          element: <VideoPlayback />
        },
        {
          path: "/upload/video",
          element: <VideoUpload />
        }
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

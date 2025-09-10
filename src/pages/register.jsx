import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import {useNavigate } from "react-router"

export default function Register() {
  
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState(null); // File
  const [coverImage, setCoverImage] = useState(null); // File
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    profileImage: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleImageUpload = (e, imageType) => {
    const file = e.target.files[0];
    if (file) {
      if (imageType === "profile") {
        setProfileImage(file);
        if (errors.profileImage) {
          setErrors((prev) => ({
            ...prev,
            profileImage: false,
          }));
        }
      } else if (imageType === "cover") {
        setCoverImage(file);
      }
    }
  };

  const handleSubmit = () => {
    const newErrors = {
      username: !formData.username.trim(),
      email: !formData.email.trim(),
      password: !formData.password.trim(),
      profileImage: !profileImage,
    };

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      console.log("Form submitted successfully:", formData);

      const data = new FormData();
      data.append("username", formData.username)
      data.append("fullName", "Jay Ka Beta")
      data.append("email", formData.email);
      data.append("password", formData.password);

      if (profileImage) {
        data.append("avatar", profileImage);
      }
      if (coverImage) {
        data.append("coverImage", coverImage);
      }

      axios
        .post("http://localhost:8080/api/v1/users/register", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // allow cookies if backend sets them
        })
        .then((res) => {
          console.log(res);
          navigate("/login")
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Form has validation errors");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <img src={logo} className="w-10 h-10" alt="Comet" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
          <p className="text-gray-400">Join the dumbest streaming community.</p>
        </div>

        {/* Image Upload Section */}
        <div className="relative mb-6">
          {/* Cover Image Upload */}
          <div className="h-32 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600 relative overflow-hidden">
            {coverImage ? (
              <img
                src={URL.createObjectURL(coverImage)}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <svg
                  className="w-8 h-8 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 7v2.99s-1.99.01-2 0V7c0-1.1-.9-2-2-2s-2 .9-2 2v4c0 1.1-.9 2-2 2s-2-.9-2-2V5c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 3.31 2.69 6 6 6h6c3.31 0 6-2.69 6-6V7h-4z" />
                </svg>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "cover")}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Profile Image Upload */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div
              className={`w-20 h-20 bg-gray-800 rounded-full border-4 ${
                errors.profileImage ? "border-red-500" : "border-gray-900"
              } relative overflow-hidden`}
            >
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <svg
                    className="w-8 h-8 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "profile")}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {/* Edit Icon */}
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
              </div>
            </div>
            {errors.profileImage && (
              <p className="text-red-500 text-xs text-center mt-2">
                Profile image is required
              </p>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4 mt-12">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full px-4 py-4 bg-gray-800 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.username
                  ? "focus:ring-red-500 ring-2 ring-red-500"
                  : "focus:ring-green-500"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-2 px-4">
                Username is required
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-4 bg-gray-800 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "focus:ring-red-500 ring-2 ring-red-500"
                  : "focus:ring-green-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2 px-4">
                Email address is required
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-4 bg-gray-800 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "focus:ring-red-500 ring-2 ring-red-500"
                  : "focus:ring-green-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2 px-4">
                Password is required
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-4 bg-green-500 hover:bg-green-600 transition-colors rounded-full text-white font-semibold text-lg"
          >
            Register
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?
            <button className="text-green-500 hover:text-green-400 ml-1 font-semibold">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

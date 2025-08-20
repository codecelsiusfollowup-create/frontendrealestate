import React, { useEffect, useState } from "react";
import {
  UploadCloud, Trash2, Video, Star, CheckCircle, XCircle, Crop, Lightbulb, Home
} from "lucide-react";

const LOCAL_KEY = "postPropertyStep4Cloud";
const CLOUDINARY_UPLOAD_PRESET = "car_uploads";
const CLOUDINARY_CLOUD_NAME = "dmvra7sdw";

const photoTypes = ["Washroom", "Floor Plan", "Building", "Living Room", "Bedroom"];

export default function Step4({ onNext, onBack }) {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [coverIndex, setCoverIndex] = useState(0);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showPhotoTips, setShowPhotoTips] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LOCAL_KEY));
      if (saved) {
        setPhotos(saved.savedPhotos || []);
        setVideos(saved.savedVideos || []);
        setCoverIndex(saved.savedCoverIndex || 0);
      }
    } catch (e) {
      console.error("Failed to parse localStorage data", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify({
        savedPhotos: photos,
        savedVideos: videos,
        savedCoverIndex: coverIndex
      }));
    }
  }, [photos, videos, coverIndex, isLoaded]);

  const uploadToCloudinary = async (file, resourceType = "image") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`, {
      method: "POST",
      body: formData,
    });
    return res.json();
  };

  const handlePhotoChange = async (e) => {
    const files = Array.from(e.target.files).slice(0, 50 - photos.length);
    for (const file of files) {
      const result = await uploadToCloudinary(file, "image");
      setPhotos(prev => [...prev, {
        name: file.name,
        type: "Washroom",
        url: result.secure_url,
        public_id: result.public_id,
      }]);
    }
    setError("");
  };

  const handleVideoChange = async (e) => {
    const files = Array.from(e.target.files).slice(0, 5 - videos.length);
    for (const file of files) {
      const result = await uploadToCloudinary(file, "video");
      setVideos(prev => [...prev, {
        name: file.name,
        url: result.secure_url,
        public_id: result.public_id,
      }]);
    }
  };

  const handleDeletePhoto = (index) => {
    const updated = [...photos];
    updated.splice(index, 1);
    setPhotos(updated);
    if (index === coverIndex) setCoverIndex(0);
    else if (index < coverIndex) setCoverIndex(prev => prev - 1);
  };

  const handleDeleteVideo = (index) => {
    const updated = [...videos];
    updated.splice(index, 1);
    setVideos(updated);
  };

  const updatePhotoType = (index, type) => {
    const updated = [...photos];
    updated[index].type = type;
    setPhotos(updated);
  };

  const handleSetCover = (index) => setCoverIndex(index);

  const handleSubmit = () => {
    if (photos.length < 4) {
      setError("Please upload at least 4 property photos.");
      return;
    }
    setError("");
    onNext({ photos, videos, coverIndex });
  };

  if (!isLoaded) return <p className="p-6 text-gray-600">Loading media...</p>;

  return (
    <div className="p-6">
      {/* Video Upload */}
      <h3 className="text-lg font-semibold mb-2 mt-4">Add Property Videos <span className="text-gray-500 text-sm">(Optional)</span></h3>
      <p className="text-sm text-gray-600 mb-2">Add walkthrough videos to help buyers/renters better visualize the property.</p>
      <p className="text-sm text-blue-600 underline cursor-pointer mb-3" onClick={() => setShowVideoModal(true)}>
        📹 View Video Guidelines
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {videos.map((video, index) => (
          <div key={index} className="relative border p-3 bg-white rounded flex justify-between items-center">
            <p className="text-sm truncate">{video.name}</p>
            <button onClick={() => handleDeleteVideo(index)} title="Delete Video">
              <Trash2 className="text-red-500 hover:text-red-700 w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {videos.length < 5 && (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 p-6 rounded-lg cursor-pointer bg-blue-50 text-sm text-blue-600 hover:bg-blue-100">
          <input type="file" accept="video/*" multiple onChange={handleVideoChange} className="hidden" />
          <Video className="w-8 h-8 mb-2" />
          <span>Upload Videos</span>
        </label>
      )}

      {/* Photo Upload */}
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-xl font-semibold mb-2">Add Property Photos</h2>
        <p onClick={() => setShowPhotoTips(true)} className="text-blue-600 underline text-sm cursor-pointer">
          📸 Photo Tips
        </p>
      </div>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative border rounded overflow-hidden shadow">
            <img src={photo.url} alt="Uploaded" className="h-40 w-full object-cover" />
            <button onClick={() => handleDeletePhoto(index)} className="absolute top-2 right-2 bg-white border p-1 rounded-full text-red-600 hover:bg-red-600 hover:text-white" title="Delete">
              <Trash2 size={18} />
            </button>
            <div className="p-2">
              {index === coverIndex ? (
                <div className="text-sm font-semibold text-blue-600">Cover photo</div>
              ) : (
                <button onClick={() => handleSetCover(index)} className="text-sm text-gray-600 border px-2 py-1 rounded hover:text-blue-600">
                  Make Cover Photo
                </button>
              )}
              <select className="w-full border px-2 py-1 text-sm rounded mt-2" value={photo.type} onChange={(e) => updatePhotoType(index, e.target.value)}>
                {photoTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </div>
          </div>
        ))}

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 p-6 rounded-lg cursor-pointer bg-blue-50 text-center text-sm text-blue-600 hover:bg-blue-100">
          <input type="file" accept="image/*" multiple onChange={handlePhotoChange} className="hidden" />
          <UploadCloud className="w-8 h-8 mb-2" />
          <span>Upload Photos</span>
        </label>
      </div>

      {photos.length < 4 && (
        <div className="bg-yellow-100 text-yellow-800 text-sm px-4 py-2 rounded mb-4">
          <Star className="inline w-4 h-4 mr-1" /> Add at least <strong>4 property photos</strong> for better response.
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="bg-gray-300 text-black px-4 py-2 rounded">Back</button>
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded">Continue</button>
      </div>

      {/* Video Guidelines Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 relative">
            <button className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl" onClick={() => setShowVideoModal(false)}>
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">Video Guidelines</h2>
            <p className="text-sm text-gray-600 mb-4">Here is a list of do’s and don’ts for video uploads:</p>
            <ul className="text-sm space-y-2 list-disc pl-4">
              <li><CheckCircle className="inline w-4 h-4 mr-1 text-green-500" /> Provide a walkthrough of the property</li>
              <li><CheckCircle className="inline w-4 h-4 mr-1 text-green-500" /> Cover all rooms with good lighting</li>
              <li><CheckCircle className="inline w-4 h-4 mr-1 text-green-500" /> Duration: 60s to 120s</li>
              <li><CheckCircle className="inline w-4 h-4 mr-1 text-green-500" /> Voiceover/music allowed</li>
              <li><XCircle className="inline w-4 h-4 mr-1 text-red-500" /> No shaky videos</li>
              <li><XCircle className="inline w-4 h-4 mr-1 text-red-500" /> No contact details or offensive content</li>
              <li><XCircle className="inline w-4 h-4 mr-1 text-red-500" /> Do not upload private or irrelevant content</li>
            </ul>
            <div className="mt-6 text-center">
              <button onClick={() => setShowVideoModal(false)} className="bg-blue-600 text-white px-4 py-2 rounded">
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Tips Modal */}
      {showPhotoTips && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white max-w-md w-full p-6 rounded shadow relative">
            <button className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl" onClick={() => setShowPhotoTips(false)}>&times;</button>
            <h3 className="text-lg font-semibold mb-2">Photo Tips</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li><Star className="inline w-4 h-4 mr-1 text-yellow-500" /> More quality photos = More responses.</li>
              <li><Crop className="inline w-4 h-4 mr-1 text-purple-500" /> Landscape photos look better.</li>
              <li><Lightbulb className="inline w-4 h-4 mr-1 text-yellow-500" /> Click during the day with natural light.</li>
              <li><Home className="inline w-4 h-4 mr-1 text-green-600" /> Clean rooms before taking photos.</li>
            </ul>
            <div className="text-right mt-4">
              <button onClick={() => setShowPhotoTips(false)} className="text-blue-600 font-medium hover:underline">Got it</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
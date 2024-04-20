import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function ListEvents() {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        venue: '',
        imageUrls: [],
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1)
              return setError('You must upload at least one image');
        
            setLoading(true);
            setError(false);
            const res = await fetch('/api/events/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
            
            const data = await res.json();
            setLoading(false);
        
            if (data.success === false) {
              setError(data.message);
            } else {
                console.log("Event created successfully");
            }
          } catch (error) {
            setError(error.message);
            setLoading(false);
          }
    };

    return (
      <div id="main" className="font-sans">
          <div id="heading" className="text-center my-8">
              <h1 className="text-3xl font-bold">Upcoming and Ongoing Events</h1>
          </div>
          <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap justify-center">
                  <div className="eventContainer max-w-sm rounded overflow-hidden shadow-lg m-4">
                      <div className="infoContainer p-4">
                          <div className="mb-4">
                              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Event Name</label>
                              <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  placeholder="Enter event name"
                              />
                          </div>
                          <div className="mb-4">
                              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                              <textarea
                                  id="description"
                                  name="description"
                                  value={formData.description}
                                  onChange={handleChange}
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  placeholder="Enter event description"
                                  rows="4"
                              />
                          </div>
                          <div className="mb-4">
                              <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
                              <input
                                  type="date"
                                  id="date"
                                  name="date"
                                  value={formData.date}
                                  onChange={handleChange}
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              />
                          </div>
                          <div className="mb-4">
                              <label htmlFor="venue" className="block text-gray-700 font-bold mb-2">Venue</label>
                              <input
                                  type="text"
                                  id="venue"
                                  name="venue"
                                  value={formData.venue}
                                  onChange={handleChange}
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                                  placeholder="Enter event venue"
                              />
                              
                              <p className='font-semibold mb-3'>
                                  Images:
                                  <span className='font-normal text-gray-600 ml-2'>
                                      The first image will be the cover (max 6)
                                  </span>
                              </p>
                              <div className='flex gap-4'>
                                  <input
                                      onChange={(e) => setFiles(e.target.files)}
                                      className='p-3 border border-gray-300 rounded w-full'
                                      type='file'
                                      id='images'
                                      accept='image/*'
                                      multiple
                                  />
                                  <button
                                      type='button'
                                      disabled={uploading}
                                      onClick={handleImageSubmit}
                                      className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                                  >
                                      {uploading ? 'Uploading...' : 'Upload'}
                                  </button>
                              </div>
                              <p className='text-red-700 text-sm'>
                                  {imageUploadError && imageUploadError}
                              </p>
                              {formData.imageUrls.length > 0 && 
                                  formData.imageUrls.map((url, index) => (
                                      <div key={index} className='relative'>
                                          <img
                                              src={url}
                                              alt='uploaded'
                                              className='w-20 h-20 object-cover rounded'
                                          />
                                          <button
                                              onClick={() => handleRemoveImage(index)}
                                              className='absolute top-0 right-0 bg-red-700 text-white p-1 rounded-full'
                                          >
                                              X
                                          </button>
                                      </div>
                                  ))}
                          </div>
                          
                          <button
  disabled={loading || uploading}
  className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
>
  {loading ? 'Creating...' : 'Create Event'}
</button>
{error && <p className='text-red-700 text-sm'>{error}</p>}

                      </div>
                  </div>
              </div>
          </form>
      </div>
  );
}  
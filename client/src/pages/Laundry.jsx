import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    enrollmentId: '',
    phone: '',
    tshirts: 0,
    shirts: 0,
    pants: 0,
    bedsheets: 0,
    lowers: 0,
    shorts: 0,
    towel: 0,
    pillowcover: 0,
    kurta: 0,
    pajama: 0,
    dupatta: 0,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

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
    const { id, value, type, checked } = e.target;
  
    if (type === 'checkbox') {
      setFormData({ ...formData, [id]: checked });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };
  

  const generateSlip = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Laundry Service Slip</Text>
          <Text style={styles.text}>Name: {formData.name}</Text>
          <Text style={styles.text}>Enrollment ID: {formData.enrollmentId}</Text>
          <Text style={styles.text}>Phone: {formData.phone}</Text>
          <Text style={styles.title}>Clothes</Text>
          {Object.entries(formData).map(([key, value]) => {
            if (key !== 'imageUrls' && key !== 'name' && key !== 'enrollmentId' && key !== 'phone' && key !== '') {
              return (
                <Text style={styles.text} key={key}>
                  {key}: {value}
                </Text>
              );
            }
            return null;
          })}
        </View>
      </Page>
    </Document>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      
      // Validate other form data if needed
  
      setLoading(true);
      setError(false);
      const res = await fetch('/api/laundry-listing/create', {
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
        generateSlip();
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <div className='flex flex-col text-4xl font-semibold items-center my-7'>
        <h1>Is the line longer than your to-do list?</h1>
        <h1>Ohh! Lost that damn slip again!</h1>
        <h1>No worries! We've got your back.</h1>
      </div>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <input
            type='text'
            placeholder='Enrollment ID'
            className='border p-3 rounded-lg'
            id='enrollmentId'
            required
            onChange={handleChange}
            value={formData.enrollmentId}
          />
          <input
            type='number'
            placeholder='Phone number'
            className='border p-3 rounded-lg'
            id='phone'
            required
            onChange={handleChange}
            value={formData.phone}
          />
          <div className='flex flex-wrap gap-6'>
            {/* Other input fields for clothes */}
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
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
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Creating...' : 'Create listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
      {/* PDFDownloadLink for downloading the slip */}
      <PDFDownloadLink document={generateSlip()} fileName="Laundry_Slip.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Generating slip...' : 'Download Slip'
        }
      </PDFDownloadLink>
    </main>
  );
}  

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import DatePicker from "react-datepicker"; // Import the date picker

const initialEventState = {
  title: '',
  slug: '',
  description: '',
  date: null, // Initial state for date is now null
  status: 'upcoming',
  registration: 'coming_soon',
};

const CreateEventForm = () => {
  const [eventData, setEventData] = useState(initialEventState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || !eventData.date) {
      alert('Please select an image and a date for the event.');
      return;
    }
    setIsSubmitting(true);
    
    try {
      const storageRef = ref(storage, `event-posters/${Date.now()}_${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        }, 
        (error) => {
          console.error("Image upload error: ", error);
          let errorMessage = 'Failed to upload image. ';
          
          // Provide more specific error messages
          switch (error.code) {
            case 'storage/unauthorized':
              errorMessage += 'You do not have permission to upload files.';
              break;
            case 'storage/canceled':
              errorMessage += 'Upload was canceled.';
              break;
            case 'storage/unknown':
              errorMessage += 'An unknown error occurred.';
              break;
            case 'storage/invalid-format':
              errorMessage += 'Invalid file format. Please use a valid image file.';
              break;
            case 'storage/invalid-checksum':
              errorMessage += 'File corruption detected. Please try again.';
              break;
            case 'storage/invalid-event-name':
              errorMessage += 'Invalid file name. Please rename your file.';
              break;
            case 'storage/invalid-url':
              errorMessage += 'Invalid storage URL. Please check your Firebase configuration.';
              break;
            case 'storage/invalid-argument':
              errorMessage += 'Invalid file argument. Please select a valid image file.';
              break;
            case 'storage/no-default-bucket':
              errorMessage += 'No default storage bucket configured. Please check your Firebase setup.';
              break;
            case 'storage/cannot-slice-blob':
              errorMessage += 'Cannot process the selected file. Please try a different image.';
              break;
            case 'storage/server-file-wrong-size':
              errorMessage += 'File size mismatch. Please try uploading again.';
              break;
            default:
              errorMessage += `Error code: ${error.code}. Please check your Firebase Storage configuration.`;
          }
          
          alert(errorMessage);
          setIsSubmitting(false);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              // Convert the JavaScript Date object to a Firestore Timestamp
              const eventDateTimestamp = Timestamp.fromDate(eventData.date);

              await addDoc(collection(db, 'events'), {
                ...eventData,
                date: eventDateTimestamp, // Save the timestamp
                image: downloadURL,
                createdAt: serverTimestamp(),
              });

              // Show success notification
              alert('Event created successfully!');
              setEventData(initialEventState);
              setImageFile(null);
              document.getElementById('image-input').value = null; // Clear file input
            } catch (error) {
              console.error("Error creating event document: ", error);
              alert('Failed to save event to database.');
            } finally {
              setIsSubmitting(false);
              setUploadProgress(0);
            }
          }).catch((error) => {
            console.error("Error getting download URL: ", error);
            alert('Failed to get image URL. Please try again.');
            setIsSubmitting(false);
            setUploadProgress(0);
          });
        }
      );
    } catch (error) {
      console.error("Error initializing upload: ", error);
      alert('Failed to initialize upload. Please check your Firebase configuration.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
          <input 
            type="text" 
            name="title" 
            value={eventData.title} 
            onChange={handleTextChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ieee-blue focus:border-transparent" 
            required 
          />
        </div>
        
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">URL Slug (e.g., my-cool-event)</label>
          <input 
            type="text" 
            name="slug" 
            value={eventData.slug} 
            onChange={handleTextChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ieee-blue focus:border-transparent" 
            required 
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea 
            name="description" 
            value={eventData.description} 
            onChange={handleTextChange} 
            rows="4" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ieee-blue focus:border-transparent" 
            required 
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
          <DatePicker
            id="date"
            selected={eventData.date}
            onChange={(date) => setEventData(prev => ({ ...prev, date: date }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ieee-blue focus:border-transparent"
            dateFormat="MMMM d, yyyy"
            placeholderText="Select a date"
            required
          />
        </div>

        <div>
          <label htmlFor="image-input" className="block text-sm font-medium text-gray-700 mb-2">Event Poster</label>
          <input 
            id="image-input" 
            type="file" 
            accept="image/*" 
            name="image" 
            onChange={handleImageChange} 
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-ieee-blue hover:file:bg-blue-100" 
            required 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select 
                    name="status" 
                    value={eventData.status} 
                    onChange={handleTextChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ieee-blue focus:border-transparent"
                >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="past">Past</option>
                </select>
            </div>
            <div>
                <label htmlFor="registration" className="block text-sm font-medium text-gray-700 mb-2">Registration</label>
                <select 
                    name="registration" 
                    value={eventData.registration} 
                    onChange={handleTextChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ieee-blue focus:border-transparent"
                >
                    <option value="coming_soon">Coming Soon</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="none">None Required</option>
                </select>
            </div>
        </div>

        {isSubmitting && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-ieee-blue h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full bg-ieee-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? `Uploading ${Math.round(uploadProgress)}%` : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
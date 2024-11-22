import { useState } from 'react';
import axios from 'axios';
const useWordPress = () => {
  const [isUploading, setIsUploading] = useState(false);
  const createDraft = async (title, content, imageUrl, imageFileName) => {
    const url = `http://localhost:5000/createDraft`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content,
          imageFileName,
          imageUrl
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }

      const newDraft = await response.json();
      console.log('Draft was successfully created!', newDraft);
    } catch (error) {
      console.error('Error creating draft:', error);
    }
  };

  const uploadImage = async (imageFileName, imageUrl) => {
    const url = `/uploadImage`;
    setIsUploading(true);
    try {
      const response = await axios.post(
        url,
        { imageFileName, imageUrl },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }
      setIsUploading(false);
      const newImage = await response.json();
      console.log(newImage.message);
    } catch (error) {
      setIsUploading(false);
      console.error('Error uploading image:', error);
    }
  };

  return { createDraft, uploadImage, isUploading };
};

export default useWordPress;

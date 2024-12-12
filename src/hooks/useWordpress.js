import { useState } from 'react';
import axios from 'axios';

const useWordPress = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const createDraft = async (title, content, imageUrl, imageFileName, sticky) => {
    const url = `/createDraft`;
    try {
      setIsError(false);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content,
          imageFileName,
          imageUrl,
          sticky
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Draft creation error:', responseData);
        setIsError(true);
        throw new Error(`HTTP error! status: ${response.status}, message: ${responseData.message}`);
      }

      console.log('Draft was successfully created!', responseData);
      return responseData.newDraft;
    } catch (error) {
      console.error('Error creating draft:', error);
      setIsError(true);
      return null;
    }
  };

  const uploadImage = async (imageFileName, imageUrl) => {
    const url = `/uploadImage`;
    setIsUploading(true);
    setIsUploaded(false);
    setIsError(false);
    try {
      const response = await axios.post(
        url,
        { imageFileName, imageUrl },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setIsUploading(false);
      setIsUploaded(true);
      console.log(response.data.message);
      return response.data.featuredImageId;
    } catch (error) {
      setIsUploading(false);
      setIsError(true);
      console.error('Error uploading image:', error);
      return null;
    }
  };

  return { createDraft, uploadImage, isUploading, isUploaded, isError };
};

export default useWordPress;

import axios from 'axios';
import { useState } from 'react';

const useImageDownloader = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadImage = async (fileUrl, fileName, isTmdbUrl) => {
    let url = fileUrl;
    if (isTmdbUrl) {
      const filePath = fileUrl.split('/').pop();
      url = `/tmdb/t/p/original/${filePath}`;
    }
    try {
      setIsDownloading(true);

      const res = await axios.get(url, {
        responseType: 'blob'
      });

      const imageURL = URL.createObjectURL(res.data);
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    } catch (error) {
      setIsDownloading(false);
      console.log('Error: ', error);
    }
  };

  return { downloadImage, isDownloading };
};

export default useImageDownloader;

import { toast } from 'react-toastify';
import { useState } from 'react';
function useFields() {
  const [prevFolderIDs, setPrevFolderID] = useState([]);

  const apiKey = import.meta.env.VITE_GDRIVE_API_KEY;

  const fetchFieldInfo = async (contentUrl) => {
    const isFileUrl =
      /(?:\/(?:drive\/)?(?:u\/\d+\/)?(?:file\/d\/|uc\?id=)|https:\/\/drive\.usercontent\.google\.com\/download\?id=)[a-zA-Z0-9_-]+\/?/.test(
        contentUrl
      );

    const isFolderUrl = /(?:\/(?:drive\/)?(?:u\/\d+\/)?folders\/[a-zA-Z0-9_-]+\/?)/.test(
      contentUrl
    );

    var fID = '';
    var type = '';
    if (isFileUrl) {
      const fileRegex =
        /(?:\/(?:drive\/)?(?:u\/\d+\/)?(?:file\/d\/|uc\?id=)|https:\/\/drive\.usercontent\.google\.com\/download\?id=)([a-zA-Z0-9_-]+)/;

      fID = contentUrl.match(fileRegex)[1];
      type = 'file';
    } else if (isFolderUrl) {
      const regexFolder = /\/(?:drive\/)?(?:u\/\d+\/)?folders\/([a-zA-Z0-9_-]+)/;
      fID = contentUrl.match(regexFolder)[1];
      type = 'folder';
    }

    if (prevFolderIDs.includes(fID)) {
      return toast.warning('Folder already extracted!', {
        theme: 'colored',
        autoClose: 2000,
        position: 'top-right'
      });
    }

    try {
      var url = '';
      if (type === 'file') {
        url = `https://www.googleapis.com/drive/v3/files/${fID}?supportsAllDrives=true&includeItemsFromAllDrives=true&fields=id,name,size,webContentLink,mimeType&key=${apiKey}`;
      } else if (type === 'folder') {
        url = `https://www.googleapis.com/drive/v3/files?q='${fID}'+in+parents&supportsAllDrives=true&includeItemsFromAllDrives=true&pageSize=1000&orderBy=name&fields=files(id,name,size,webContentLink,mimeType)&key=${apiKey}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) throw new Error('Invalid URL');
        else throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log([data]);
      if (type === 'file') {
        return [data];
      } else if (type === 'folder') {
        return data.files;
      }
      setPrevFolderID((prevFolderIDs) => [...prevFolderIDs, fID]);
    } catch (error) {
      setPrevFolderID('');
      return error;
    }
  };

  return { fetchFieldInfo };
}

export default useFields;

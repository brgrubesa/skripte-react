import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {v4} from "uuid";

function useFirebaseStorage() {
  const [fileUpload, setFileUpload] = useState(null);


  const downloadFile = (filePath, fileName) => {
    
		getDownloadURL(ref(storage, filePath))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'
          console.log(url)
          // This can be downloaded directly:
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = (event) => {
            const blob = xhr.response;
            console.log(blob);
            console.log(xhr.status);
      
            // Create blob link to download
            const url = window.URL.createObjectURL(
              new Blob([blob]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
              'download',
              `${fileName}`,
            );
        
            // Append to html link element page
            document.body.appendChild(link);
        
            // Start download
            link.click();
        
            // Clean up and remove the link
            link.parentNode.removeChild(link);
          };
          xhr.open('GET', url);
          xhr.send();
      
        })
        .catch((error) => {
          // Handle any errors
          console.log(error);
        });
      
    };

    
  const uploadFile = () => {
    
    if (fileUpload == null) return;
    
    const fileRef = ref(storage, `documents/${fileUpload.name + v4()}`);
    uploadBytes(fileRef, fileUpload).then(() =>{
        alert("File Uploaded");
    });
};

  return {
    fileUpload,
    setFileUpload,
    uploadFile,
    downloadFile,
  };
}

export default useFirebaseStorage;
import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {v4} from "uuid";

function useFirebaseStorage() {
  const [imageUpload, setImageUpload] = useState(null);


  const downloadImage = (imagePath) => {
    
		getDownloadURL(ref(storage, imagePath))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'
          console.log("1.")
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
              `FileName.jpeg`,
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
          console.log("eroor");
          console.log(error);
        });
      
    };

    
  const uploadImage = () => {
    
    if (imageUpload == null) return;
    
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() =>{
        alert("Image Uploaded");
    });
};

  return {
    imageUpload,
    setImageUpload,
    uploadImage,
    downloadImage,
  };
}

export default useFirebaseStorage;
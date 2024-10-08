import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";
  
  // Remove the type annotation for OurFileRouter
  export const UploadButton = generateUploadButton();
  export const UploadDropzone = generateUploadDropzone();
  
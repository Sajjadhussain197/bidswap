import React from 'react'

const CommunityPart = ({ heading, href, linktitle }) => {
  return (
    <div>CommunityPart</div>
  )
}

export default CommunityPart
// "use client";
// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Plus } from "lucide-react";
// import Heading from "@/app/components/backend/Heading";
// import generateSlug from '../../../lib/generateSlug';
// import { UploadButton } from "../../../lib/uploadThing";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { makePostRequest } from "@/lib/apiRequest";
// import dynamic from 'next/dynamic';
// import { storage } from "../../firebaseConfig";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { useRouter } from "next/router";

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// import 'react-quill/dist/quill.snow.css';

// export default function CommunityPart({ heading, href, linktitle }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [image, setImage] = useState(null);
//   const [url, setUrl] = useState("");
//   const [categories, setCategories] = useState([]);

//   const { reset, register, handleSubmit, formState: { errors } } = useForm();
//   const [content, setContent] = useState("");

//     const modules = {
//         toolbar: [
//           [{ header: [1, 2, false] }],
//           ["bold", "italic", "underline", "strike", "blockquote"],
//           [{ list: "ordered" }, { list: "bullet" }],
//           ["link", "color", "image"],
//           [{ "code-block": true }],
//           ["clean"],
//         ],
//       };
//       const formats = [
//         "header",
//         "bold",
//         "italic",
//         "underline",
//         "strike",
//         "blockquote",
//         "list",
//         "bullet",
//         "link",
//         "indent",
//         "image",
//         "code-block",
//         "color",
//       ];
  
//       useEffect(() => {
//         fetch('/api/categories')  // Adjust the path if needed
//           .then(response => response.json())
//           .then(data => setCategories(data))
//           .catch(error => console.error('Error fetching categories:', error));
//       }, []);


      
//   const handleImageChange = (e) => {
//     if (e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleUpload = () => {
//     if (image) {
//       const storageRef = ref(storage, `images/${image.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, image);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           // Optionally, you can handle progress, pause, and resume events here
//         },
//         (error) => {
//           console.error("Upload failed", error);
//           toast.error("Upload failed. Please try again.");
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setUrl(downloadURL); // Set URL for use in form submission
//             toast.success("Image uploaded successfully!");
//           });
//         }
//       );
//     } else {
//       toast.error("Please select an image to upload.");
//     }
//   };
//   const onSubmit = (data) => {
//     if (!url) {
//       toast.error("Please upload an image before submitting.");
//       return;
//     }

//     const slug = generateSlug(data.name);
//     data.slug = slug;
//     data.image = url;
//     data.content = content;
//     console.log(data);
//     makePostRequest('api/trainings', data, 'Community', reset);
//         setImage("");
//     setContent("");
//       //   toast.success("New Training Added");
//       //   reset();
//       //   setUrl("");
//       //   setImage("");
//       //   setContent("");
//       // })
//       // .catch(error => {
//       //   console.error("Error adding training:", error);
//       //   toast.error("Error adding training. Please try again.");
//       // });
//     }





//   // async function onSubmit(data) {
//   //   const slug = generateSlug(data.name);
//   //   data.slug = slug;
//   //   data.content = content;
//   //   console.log(data);
//   //   makePostRequest( 'api/trainings', data, 'Community', reset);
//   //   setImage("");
//   //   setContent("");
//   // }


//   return (
//     <div>
//       <ToastContainer />
//       <div className="border-b border-slate-600">
//         <Heading title={heading} />
//         <div>
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
//           >
//             <Plus />
//             <span>{linktitle}</span>
//           </button>

//           {isOpen && (
//             <div
//               id="crud-modal"
//               tabIndex="-1"
//               aria-hidden="true"
//               className="fixed top-0 right-0 left-0 z-50 shadow justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
//             >
//               <div className="relative p-4 w-full max-w-md max-h-full mx-auto">
//                 <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//                   <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                       Add New Training
//                     </h3>
//                     <button
//                       className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       <svg
//                         className="w-3 h-3"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 14 14"
//                       >
//                         <path
//                           stroke="currentColor"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M1 1l6 6m0 0l6 6M7 7L1 1m6 6l6-6"
//                         />
//                       </svg>
//                       <span className="sr-only">Close modal</span>
//                     </button>
//                   </div>

//                   <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
//                     <div className="grid gap-4 mb-4 grid-cols-2">
//                       <div className="col-span-2">
//                         <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                           Training Name
//                         </label>
//                         <input
//                           type="text"
//                           name="name"
//                           id="name"
//                           {...register("name", { required: true })}
//                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                           placeholder="Type training name"
//                         />
//                         {errors.name && <p className="text-red-600">Category name is required</p>}
//                       </div>

//                       <div className="col-span-2 sm:col-span-1">
//                         <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                           Category
//                         </label>
//                         <select
//                           id="category"
//                           {...register("category")}
//                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                         >
//                           <option value="" disabled>Select category</option>
//                           {categories.map((item, i) => (
//            <option key={i}>{item.name}</option>
//         ))}
//                         </select>
//                       </div>

//                       <div className="col-span-2">
//                         <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                           Training Description
//                         </label>
//                         <textarea
//                           type="text"
//                           name="description"
//                           id="description"
//                           rows="2"
//                           {...register("description", { required: true })}
//                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                           placeholder="Type training description"
//                         />
//                         {errors.description && <p className="text-red-600">Training description is required</p>}
//                       </div>


//                       <div className="mb-4">
//                     <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Training Image</label>
//                     <input
//                       type="file"
//                       id="image"
//                       onChange={handleImageChange}
//                       className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
//                     />
//                     <button type="button" onClick={handleUpload} className="mt-2 text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">Upload Image</button>
//                   </div>

//                   {url && <img src={url} alt="Uploaded" className="mb-4 w-10 h-10" />}

//                       <div className="col-span-2">
//                         <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                           Content
//                         </label>
//                         <div className="sm:col-span-2">
//                 <label
//                   htmlFor="content"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Blog Content
//                 </label>
//                 <ReactQuill
                
//                   className=" text-gray-900"
//                   theme="snow"
//                   value={content}
//                   onChange={setContent}
//                   modules={modules}
//                   formats={formats}
//                 />
//               </div>
//                       </div>
//                     </div>
//                     <button 
//                       onClick={() => toast.success("New Training Added")} 
//                       className="relative shadow inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-400 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
//                     >
//                       <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
//                         Add New Training
//                       </span>
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

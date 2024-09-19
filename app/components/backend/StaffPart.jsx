"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import Heading from "@/app/components/backend/Heading";
import generateSlug from '../../../lib/generateSlug';
import { UploadButton } from "../../../lib/uploadThing";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makePostRequest } from "@/lib/apiRequest";
import ImageInput from "../formInputs/ImageInput";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function StaffPart({ heading, href, linktitle }) {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  const { reset, watch, register, handleSubmit, formState: { errors } } = useForm();
  const isActive = watch('isActive');
  const [tags, setTags] = useState(['tag1', 'tag2']);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optionally, you can handle progress, pause, and resume events here
        },
        (error) => {
          console.error("Upload failed", error);
          toast.error("Upload failed. Please try again.");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL); // Set URL for use in form submission
            toast.success("Image uploaded successfully!");
          });
        }
      );
    } else {
      toast.error("Please select an image to upload.");
    }
  };
  const onSubmit = (data) => {
    if (!url) {
      toast.error("Please upload an image before submitting.");
      return;
    }

    const slug = generateSlug(data.name);
    data.slug = slug;
    data.image = url;

    makePostRequest('api/staff', data, 'Staff', reset)
      .then(() => {
        toast.success("New Staff Added");
        reset();
        setUrl(""); // Reset the image URL
      })
      .catch(error => {
        console.error("Error adding staff:", error);
        toast.error("Error adding staff. Please try again.");
      });
    }


  return (
    <div>
      <ToastContainer />
      <div className="border-b border-slate-600">
        <Heading title={heading} />
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
          >
            <Plus />
            <span>{linktitle}</span>
          </button>

          {isOpen && (
            <div
              id="crud-modal"
              tabIndex="-1"
              
              className="fixed top-0 right-0 left-0 z-50 shadow justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
            >
              <div className="relative p-4 w-full max-w-md max-h-full mx-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Add New Staff
                    </h3>
                    <button
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1l6 6m0 0l6 6M7 7L1 1m6 6l6-6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Staff Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          {...register("name", { required: true })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type Staff name"
                        />
                        {errors.name && <p className="text-red-600">Staff name is required</p>}
                      </div>

                      <div className="col-span-2">
                        <label htmlFor="contactno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Staff Contact No
                        </label>
                        <input
                          type="number"
                          name="contactno"
                          id="contactno"
                          {...register("contactno", { required: true })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type your contact number"
                        />
                        {errors.contactno && <p className="text-red-600">Staff contact number is required</p>}
                      </div>

                      <div className="col-span-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Staff Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          {...register("email", { required: true })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type Email Address"
                        />
                        {errors.email && <p className="text-red-600">Staff Email Address is required</p>}
                      </div>

                      <div className="col-span-2">
                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Joining Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          {...register("date", { required: true })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                        {errors.date && <p className="text-red-600">Staff Joining Date is required</p>}
                      </div>

                      <div className='sm:col-span-2 flex flex-wrap'>
                        <div className="w-full sm:w-1/2">
                          <h2 className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2">
                            Working?
                          </h2>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              {...register('isActive')}
                              type="checkbox"
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                              {isActive ? 'Active' : 'Draft'}
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="mb-4">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Profile Pic</label>
                    <input
                      type="file"
                      id="image"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                    />
                    <button type="button" onClick={handleUpload} className="mt-2 text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">Upload Image</button>
                  </div>

                  {url && <img src={url} alt="Uploaded" className="mb-4 w-10 h-10" />}

                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Staff Role
                        </label>
                        <select
                          id="parentCategory"
                          {...register("parentCategory")}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option value="" disabled>
                            Select 
                          </option>
                          <option value="Role 1">Role 1</option>
                          <option value="Role 2">Role 2</option>
                          <option value="Role 3">Role 3</option>
                        </select>
                      </div>
                    </div>

                    <button onClick={() => toast.success("New Product Added")} className="relative shadow inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-400 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Add New Staff
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

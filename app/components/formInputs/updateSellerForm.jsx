"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import Heading from "@/app/components/backend/Heading";
import { useRouter } from "next/navigation";
import generateSlug from "../../../lib/generateSlug";
import { UploadButton } from "../../../lib/uploadThing";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { makePutRequest } from "@/lib/apiRequest";
import toast from "react-hot-toast";

export default function UpdateSellerForm({
  heading,
  href,
  linktitle,
  updateData = {},
}) {
  const router = useRouter();
  const id = updateData?.id ?? "";
  const intialImage = updateData?.image ?? "";
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:{ ...updateData,}
  });

  function redirect(){
    router.push("/dashboard/sellers")
  }

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
    // Ensure URL is set
    if (!url && !intialImage) {
      toast.error("Please upload an image before submitting.");
      return;
    }
  
    // If no new image is uploaded, use the initial image URL
    const imageUrl = url || intialImage;

  
    const slug = generateSlug(data.name);
    data.slug = slug;
    data.image = imageUrl;
  
    console.log("Data to be submitted:", data); // Debugging
  
    makePutRequest(`api/sellers/${id}`, data, "seller", redirect, reset)
.then(() => {
        toast.success("seller Updated");
        reset();
        setUrl(""); // Reset the image URL
        redirect();
      })
      .catch((error) => {
        console.error("Error updating seller:", error);
        toast.error("Error updating seller. Please try again.");
      });
  };

  return (
    <div>
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
                      {heading}
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

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-4 md:p-5"
                  >
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          seller Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          {...register("name", { required: true })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type seller name"
                        />
                        {errors.name && (
                          <p className="text-red-600">
                            seller name is required
                          </p>
                        )}
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Seller Email
                        </label>
                        <textarea
                          id="email"
                          {...register("email", { required: true })}
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write seller email here"
                        />
                        {errors.description && (
                          <p className="text-red-600">
                            seller Email is required
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="image"
                          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          seller Image
                        </label>
                        <input
                          type="file"
                          id="image"
                          onChange={handleImageChange}
                          className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                        />
                        <button
                          type="button"
                          onClick={handleUpload}
                          className="mt-2 text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                        >
                          Upload Image
                        </button>
                      </div>

                      {url && (
                        <img
                          src={url}
                          alt="Uploaded"
                          className="mb-4 w-10 h-10"
                        />
                      )}
                    </div>
                    <button
                      onClick={() => toast.success("New seller Added")}
                      className="relative shadow inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-400 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        {linktitle}
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

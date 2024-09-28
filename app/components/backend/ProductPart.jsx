"use client";
import React, { useState, useEffect } from "react";
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
import { useSession } from "next-auth/react";



export default function ProductPart({ heading, href, linktitle }) {
  const [isWholesale, setIsWholesale] = useState(false);

  const { data: session } = useSession();

  const handleWholesaleChange = (e) => {
    setIsWholesale(e.target.checked);
  };
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { reset, watch, register, setValue, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      isActive: true,
      isWholesale: false,
    }
  });

  useEffect(() => {
    fetch('/api/categories')  // Adjust the path if needed
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
    fetch('/api/services')  // Adjust the path if needed
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const isActive = watch('isActive');

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
  const onSubmit = async (data) => {
    if (!url) {
      toast.error("Please upload an image before submitting.");
      return;
    }

    const slug = generateSlug(data.name);
    data.slug = slug;
    data.image = url;

    try {
      if (!session || !session.user) {
        toast.error("User not authenticated");
        return;
      }
      
      data.userId = session.user.id;
        console.log(data)
      const res = await makePostRequest('api/products', data, 'Product', reset);
      console.log(res)
      if (res) {
        toast.success("New Product Added");
        reset();
        setUrl(""); // Reset the image URL
      }

    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product. Please try again.");
    }
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
                      Add New Product
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
                          Product Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          {...register("name", { required: true })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type Product name"
                        />
                        {errors.name && <p className="text-red-600">Product name is required</p>}
                      </div>


                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Product Category
                        </label>
                        <select
                          id="prodcategory"
                          name="prodcategory"
                          {...register("categoryId")} // Register this field as categoryId
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          onChange={(e) => {
                            const selectedCategoryId = e.target.value;
                            const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
                            setValue("categoryId", selectedCategoryId); // Save categoryId
                            setValue("prodcategory", selectedCategory?.name); // Save prodcategory name
                          }}
                        >
                          <option value="" disabled>
                            Select category
                          </option>
                          {categories.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option> // The user sees item.name, but the value is item.id
                          ))}
                        </select>
                      </div>

                      <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Product Price
                        </label>
                        <input
                          type="number"
                          name="productprice"
                          id="productprice"
                          {...register("productprice", { required: true })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type Product price"
                        />
                        {errors.name && <p className="text-red-600">Product price is required</p>}
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Sale Price
                        </label>
                        <input
                          type="number"
                          name="saleprice"
                          id="saleprice"
                          {...register("saleprice", { required: true })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type Sale price"
                        />
                        {errors.name && <p className="text-red-600">Product price is required</p>}
                      </div>




                      <div className="col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Product Description
                        </label>
                        <textarea
                          id="description"
                          {...register("description", { required: true })}
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write Product description here"
                        />
                        {errors.description && <p className="text-red-600">Product description is required</p>}
                      </div>

                      <div className='sm:col-span-2 flex flex-wrap'>
                        <div className="w-full sm:w-1/2">
                          <h2 className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2">
                            Publish your Product
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

                      <div className='sm:col-span-2 flex flex-wrap'>
                        <div className="w-full sm:w-1/2">
                          <h2 className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2">
                            Supports Wholesale Selling
                          </h2>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              id="isWholesale"
                              {...register('isWholesale')}
                              type="checkbox"
                              className="sr-only peer"

                              onChange={handleWholesaleChange}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                              {isActive ? 'Supported' : 'Not Supported'}
                            </span>
                          </label>
                        </div>
                      </div>


                      {isWholesale && (
                        <div className="col-span-2">
                          <label htmlFor="wholesaleprice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Whole Sale Price
                          </label>
                          <input
                            type="number"
                            name="wholesalePrice"
                            id="wholesalePrice"
                            {...register("wholesalePrice", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Type Whole Sale price"
                          />
                          {errors.wholesaleprice && <p className="text-red-600">Product price is required</p>}
                        </div>


                      )

                      }
                      {isWholesale && (

                        <div className="col-span-2">
                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Minimum wholesale qty
                          </label>
                          <input
                            type="number"
                            name="wholesaleQty"
                            id="wholesaleQty"
                            {...register("wholesaleQty", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Type Whole Sale Quantity"
                          />
                          {errors.name && <p className="text-red-600">Product price is required</p>}
                        </div>
                      )}





                      <div className="mb-4">
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Product Image</label>
                        <input
                          type="file"
                          id="image"
                          onChange={handleImageChange}
                          className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                        />
                        <button type="button" onClick={handleUpload} className="mt-2 text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">Upload Image</button>
                      </div>

                      {url && <image src={url} alt="Uploaded" className="mb-4 w-10 h-10" />}

                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Select Service Type
                      </label>
                      <select
                          id="service"
                          name="service"
                          {...register("serviceTypeId")} // Register this field as serviceTypeId
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          onChange={(e) => {
                            const selectedserviceTypeId = e.target.value;
                            const selectedService = services.find(cat => cat.id === selectedserviceTypeId);
                            setValue("categoryId", selectedserviceTypeId); // Save categoryId
                            setValue("prodcategory", selectedService?.name); // Save prodcategory name
                            if (selectedService?.name === "BARTING") {
                              document.getElementById("barging-input").style.display = "block";
                            } else {
                              document.getElementById("barging-input").style.display = "none";
                            }
                          }}
                        >
                          <option value="" disabled>
                            Select Service 
                          </option>
                          {services.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option> // The user sees item.name, but the value is item.id
                          ))}
                        </select>
                      {services.some(service => service.name === "BARTING") && (
                        <div id="barging-input" style={{ display: "none" }}>
                          <label htmlFor="bargingInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Exchang Product
                          </label>
                          <input
                            type="text"
                            id="bargingInput"
                            name="bartingInput"
                            {...register("bartingInput")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Enter product name to exchange"
                          />
                        </div>
                      )}
                    </div>

                    <button onClick={() => toast.success("New Product Added")} className="relative shadow inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-400 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Add New Product
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

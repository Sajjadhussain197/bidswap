"use client";
import SubmitButton from "./SubmitButton";
import TextInput from "./TextInput";
import TextareaInput from "./TextareaInput";
import PageHeader from "../backend/pageHeader";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function NewCategory({ initialData = {}, isUpdate = false }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });
  
  function redirect() {
    router.push("/dashboard/categories/xx");
  }
  async function onSubmit(data) {
    console.log(data);
    if (isUpdate) {
      // Update request
      makePutRequest(
        setLoading,
        `api/categories/${initialData.id}`,
        data,
        "Category",
        redirect,
        reset
      );
    } else {
      makePostRequest(setLoading, "api/categories", data, "Category", reset);
    }
  }
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={isUpdate ? "Update Category" : "New Category"}
        href="/dashboard/categories"
      />
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Category Title"
            name="title"
            register={register}
            errors={errors}
          />
          <TextareaInput
            label="Category Description"
            name="description"
            register={register}
            errors={errors}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          title={isUpdate ? "Updated Category" : "New Category"}
        />
      </form>
    </div>
  );
}
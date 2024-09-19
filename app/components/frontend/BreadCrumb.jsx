"use client";

import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import React from 'react'

export default function BreadCrumb() {

  return (
    <div>
    <Breadcrumb className="mb-8" aria-label="Default breadcrumb example">
      <Breadcrumb.Item href="/" icon={HiHome}>
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item href="#">Products</Breadcrumb.Item>
      <Breadcrumb.Item>Cart</Breadcrumb.Item>
    </Breadcrumb>


    </div>
  )
}

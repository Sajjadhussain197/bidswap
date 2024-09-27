"use client";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import tomato from "@/public/tomato.png";
import Link from "next/link";
import { BaggageClaim } from "lucide-react";
import dynamic from 'next/dynamic';

// Import the Product component dynamically to avoid issues with server-side imports
const Product = dynamic(() => import("./Product"), { ssr: false });
console.log()
export default function CategoryCarousel({ products }) {
  console.log(products,"products end")
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // This is fine for Carousel, ensures server-side rendering
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={1000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="px-4"
    >
      { products.map((product, i) => (
        <Product product={product} key={i} />
      ))}
    </Carousel>
  );
}

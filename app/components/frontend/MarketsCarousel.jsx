"use client";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import tomato from "@/public/tomato.png";
import Link from "next/link";

export default function MarketsCarousel({ markets }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        // deviceType={}
        dotListClass="custom-dot-list-style"
        itemClass="px-4"
      >
        {markets.map((market, i) => {
          return (
            <Link key={i} href="/" className="rounded-lg mr-3 bg-red-400">
              <Image
                src={market.image}
                alt={market.name}
                width={417}
                height={417}
                className="w-full rounded-2xl"
              />
              <h2 className="text-center text-slate-800 mt-2 dark:text-slate-200">
                {market.name}
              </h2>
            </Link>
          );
        })}
      </Carousel>
    </>
  );
}

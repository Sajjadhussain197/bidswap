"use client"
import Image from "next/image";
import { Carousel } from "nuka-carousel"
import Slider1 from "@/public/slider-1.jpg";
import Slider2 from "@/public/slider-2.jpg";
import Link from "next/link";



export default function HeroCarousel({banners}) {

  return (
    <Carousel
      showDots
      showArrows
      slidesToShow={1}
      autoplay
      className="rounded-md
     overflow-hidden"
    >
       <Image src={Slider1} width={855} height={400} alt="slider1" className="w-full" />
       <Image src={Slider2} width={855} height={400} alt="slider2" className="w-full" />
       <Image src={Slider1} width={855} height={400} alt="slider1" className="w-full" />
       <Image src={Slider2} width={855} height={400} alt="slider2" className="w-full" />
     {/* {banners.map((banner,i)=>{
        return(
        <Link  key={i}href={banner.link} >
          <Image
          src={banner.image} 
          width={855} 
          height={400} 
          alt={banner.name}
          className="w-full" />
          </Link>
        );
      })} */}
    </Carousel>
  );
}

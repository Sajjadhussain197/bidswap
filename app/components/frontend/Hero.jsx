
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeroCarousel from "./HeroCarousel";
import { CircleDollarSign, CreditCard, FolderSync, HelpCircle } from "lucide-react";
import adv from "@/public/adv.gif";
import SidebarCategories from "./SidebarCategories";
import { getData } from "@/lib/getData";

export default async function Hero() {
   const banners = await getData("banners")
  return (
    <div className="grid grid-cols-12 gap-8 mb-6">
       <SidebarCategories/>
      <div className="col-span-full sm:col-span-7 rounded-md">
          <HeroCarousel banners={banners} />
      </div>
      <div className="col-span-2 hidden sm:block bg-white p-3 dark:bg-slate-800 rounded-lg ">
        <Link className="flex items-center space-x-1 mb-3" href="/">
            <HelpCircle className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900"/>
            <div className="flex flex-col">
                <h2 className="uppercase text-sm">HELP CENTER</h2>
                <p className="text-[0.6rem]">Guide to Customer Care</p>
            </div>
        </Link>
        <Link className="flex items-center space-x-1 mb-3" href="/">
            <FolderSync className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900"/>
            <div className="flex flex-col">
                <h2 className="uppercase text-sm">EASY RETURN
                </h2>
                <p className="text-[0.6rem]">Quick Refund</p>
            </div>
        </Link>
        <Link className="flex items-center space-x-1 " href="/register-farmer">
            <CircleDollarSign className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900 mb-6"/>
            <div className="flex flex-col">
                <h2 className="uppercase text-sm">SELL ON Limi</h2>
                <p className="text-[0.6rem]"> Millions Of Visitors</p>
            </div>
        </Link>
        <Image src={adv} alt="advert" className="w-full rounded-lg"/>
      </div>
    </div>
  );
}


import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeroCarousel from "./HeroCarousel";
import { CircleDollarSign, CreditCard, FolderSync, HelpCircle } from "lucide-react";
import adv from "@/public/adv.gif";
import SidebarCategories from "./SidebarCategories";
import { getData } from "@/lib/getData";
import ServiceType from "./ServiceType";

export default async function Hero() {
    const banners = await getData("banners")
    return (
        <div className="grid grid-cols-12 gap-8 mb-6">
            <div className="col-span-3">
                <SidebarCategories />
                <div className="col-span-full mt-4 flex flex-col items-center justify-between border rounded-xl">
                    <div className="bg-gray-200 p-2 rounded-t-lg w-full ">
                        <span className="font-semibold text-black">Select the price range</span>
                    </div>
                    <hr className="w-full mb-2 border-gray-300" />
                    <div className="flex justify-between w-full p-2">
                        <input
                            type="number"
                            name="min"
                            placeholder="Min"
                            className="w-24 px-2 py-1 text-black rounded"
                        />
                        <input
                            type="number"
                            name="max"
                            placeholder="Max"
                            className="w-24 px-2 py-1 text-black rounded"
                        />
                    </div>
                </div>
            </div>
            <div className="col-span-full sm:col-span-7 rounded-md">
                <HeroCarousel banners={banners} />
            </div>
            <div className="col-span-2 hidden space-x-3 sm:block bg-white p-3 dark:bg-slate-800 rounded-lg ">
                <Link className="flex items-center space-x-1 mb-3" href="/">
                    <HelpCircle className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900" />
                    <div className="flex flex-col">
                        <h2 className="uppercase text-sm">HELP CENTER</h2>
                        <p className="text-[0.6rem]">Guide to Customer Care</p>
                    </div>
                </Link>
                <Link className="flex items-center space-x-1 mb-3" href="/">
                    <FolderSync className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900" />
                    <div className="flex flex-col">
                        <h2 className="uppercase text-sm">EASY RETURN
                        </h2>
                        <p className="text-[0.6rem]">Quick Refund</p>
                    </div>
                </Link>
                <Link className="flex items-center space-x-1 " href="/register-farmer">
                    <CircleDollarSign className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900 mb-6" />
                    <div className="flex flex-col">
                        <h2 className="uppercase text-sm">SELL ON Limi</h2>
                        <p className="text-[0.6rem]"> Millions Of Visitors</p>
                    </div>
                </Link>
                <Image src={adv} alt="advert" className="w-full rounded-lg" />
                <ServiceType/>
                
            </div>
        </div>
    );
}

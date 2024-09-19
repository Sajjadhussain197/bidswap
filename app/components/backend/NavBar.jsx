"use client"
import {
  AlignJustify,
  Bell,
  LayoutDashboardIcon,
  LogOut,
  Sun,
  User,
  X,
} from "lucide-react";

import React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import UserAvatar from "./UserAvatar";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";


export default function NavBar({setShow, showSidebar}) {
  const {data:session,status} = useSession();
  if (status==="loading"){
    return <p>Loading...</p>
  }
  return (
    <div className={showSidebar?"z-50 flex items-center justify-between bg-slate-900 text-blue-200 h-16 px-6 py-8 fixed top-0 w-auto lg:left-60 sm:left-40   right-0":"flex z-50 items-center justify-between bg-slate-900 text-blue-200 h-16 px-6 py-8 fixed top-0 w-auto left-1 right-0 ml-[-10] "}>
      <button onClick={() => setShow(!showSidebar)}>
        <AlignJustify />
      </button>
      <div className="space-x-3 flex">
        <button className="focus:bg-shadow-glow active:bg-shadow-glow pl-2">
          <Sun />
        </button>
       

        <DropdownMenu>
          <DropdownMenuTrigger>
            <button
              
              className="relative hover:bg-slate-600 inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 active:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <Bell className="text-blue-200" />
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 rounded-full -top-0.5 -end-1 dark:border-gray-900">
                6
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white px-1 py-2 pr-4">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center space-x-0.5">
                <Image
                  src="/profilee.PNG"
                  width={200}
                  height={200}
                  alt="User Profile pic"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col space-y-1">
                  <p>This that</p>
                  <div className="flex items-center space-x-1">
                    <p className="px-2 py-0.5 bg-red-700 text-white rounded-full">
                      Stock Out
                    </p>
                    <p>Dec 2022 - 12:40 pm</p>
                  </div>
                </div>
                <button className="px-2">
                  <X />
                </button>
              </div>
            </DropdownMenuItem>
            {/* Repeat Notification Items as Needed */}
          </DropdownMenuContent>
        </DropdownMenu>

       {status==="authenticated" &&  <UserAvatar user={session?.user}/>}
      </div>
    </div>
  );
}

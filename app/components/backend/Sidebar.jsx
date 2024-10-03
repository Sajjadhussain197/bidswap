'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import '../../styles/main.scss';
import {
  ChevronDown,
  ChevronRight,
  DollarSign,
  LogOut,
  ListOrdered,
  ShoppingBasketIcon,
  StoreIcon,
  User,
  Users2,
  UserSquare2Icon,
  Settings2,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { DotFilledIcon } from '@radix-ui/react-icons';
import { signOut, useSession } from 'next-auth/react';

export default function Sidebar({ showSidebar }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const role = session?.user?.role;
  const pathName = usePathname();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  let sideBarLinks = [
    { title: "Customers", icon: Users2, href: '/dashboard/customers' },
    { title: "Markets", icon: ShoppingBasketIcon, href: '/dashboard/markets' },
    { title: "Sellers", icon: UserSquare2Icon, href: '/dashboard/sellers' },
    { title: "Orders", icon: ListOrdered, href: '/dashboard/orders' },
    { title: "Sales", icon: ListOrdered, href: '/dashboard/sales' },
    { title: "Our Staff", icon: User, href: '/dashboard/staff' },
    { title: "Settings", icon: Settings2, href: '/dashboard/settings' },
    { title: "Community", icon: Users2, href: '/dashboard/community' },
    { title: "Online Stores", icon: StoreIcon, href: '/dashboard/onlinestores' },
    { title: "Markup", icon: DollarSign, href: '/dashboard/markup' },
    { title: "Wallet", icon: DollarSign, href: '/dashboard/wallet' },
  ];

  let catalogLinks = [
    { title: "Products", icon: DotFilledIcon, href: '/dashboard/products' },
    { title: "Categories", icon: DotFilledIcon, href: '/dashboard/categories' },
    { title: "Attributes", icon: DotFilledIcon, href: '/dashboard/attributes' },
    { title: "Coupons", icon: DotFilledIcon, href: '/dashboard/coupons' },
    { title: "Banners", icon: DotFilledIcon, href: '/dashboard/banners' },
  ];

  if (role === "SELLER") {
    sideBarLinks = [
      { title: "Customers", icon: Users2, href: '/dashboard/customers' },
      { title: "Markets", icon: ShoppingBasketIcon, href: '/dashboard/markets' },
      { title: "Orders", icon: ListOrdered, href: '/dashboard/orders' },
      { title: "Bids", icon: ListOrdered, href: '/dashboard/bids' },
      { title: "Sales", icon: ListOrdered, href: '/dashboard/sales' },
      { title: "Settings", icon: Settings2, href: '/dashboard/settings' },
      { title: "Community", icon: Users2, href: '/dashboard/community' },
      { title: "Online Stores", icon: StoreIcon, href: '/dashboard/onlinestores' },
      { title: "Wallet", icon: DollarSign, href: '/dashboard/wallet' },
    ];
    catalogLinks = [
      { title: "Products", icon: DotFilledIcon, href: '/dashboard/products' },
      { title: "Coupons", icon: DotFilledIcon, href: '/dashboard/coupons' },
    ];
  }

  if (role === "USER") {
    sideBarLinks = [
      { title: "My Orders", icon: ListOrdered, href: '/dashboard/orders' },
      { title: "Profile", icon: ListOrdered, href: '/dashboard/profile' },
      { title: "Online Stores", icon: StoreIcon, href: '/dashboard/onlinestores' },
    ];
    catalogLinks = [];
  }

  async function handleLogOut() {
    await signOut();
    router.push("/");
  }

  return (
    <div id="dashboard" className={showSidebar ? 'sm:w-40 bg-slate-900 lg:w-60 h-screen text-slate-50 p-3 fixed left-0 top-0' : 'hidden'}>
      <Link href='#' className='mb-12 bg-gray-900 flex items-center justify-center'>
        <h1 className='text-4xl font-bold text-white'>BidSwap</h1><span className='px-1 py-4 text-3xl'>360</span>
      </Link>

      <div className='space-y-4 flex flex-col'>
        <Link href='/dashboard' className={pathName === '/dashboard' ? 'flex space-x-2 pl-2 py-2 border-l-4 border-green-600 text-white' : 'flex space-x-2 pl-2 py-2 text-white'}>
          <span>Dashboard</span>
        </Link>

        {catalogLinks.length > 0 && (
          <Collapsible>
            <CollapsibleTrigger onClick={() => setOpen(!open)}>
              <button className='flex space-x-2 pl-2 py-2 text-white'>
                <span>Catalog</span>
                {open ? <ChevronDown /> : <ChevronRight />}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {catalogLinks.map((item, i) => (
                <Link key={i} href={item.href} className='flex space-x-2 pl-2 py-2 text-white'>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        {sideBarLinks.map((item, i) => (
          <Link key={i} href={item.href} className={item.href === pathName ? 'flex space-x-2 pl-2 py-2 border-l-4 border-green-600 text-white' : 'flex space-x-2 pl-2 py-2 text-white'}>
            <item.icon />
            <span>{item.title}</span>
          </Link>
        ))}

        <button onClick={handleLogOut} className='flex items-center justify-center bg-purple-600 m-8 p-2 rounded-full'>
          <LogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

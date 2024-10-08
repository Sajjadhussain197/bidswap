
"use client";

import {  Modal } from "flowbite-react";
import { CornerDownLeft, Headphones, HelpCircle, MessageSquare, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HelpModal() {
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
     <button onClick={() => setOpenModal(true)} className="flex items-center 
      space-x-1 text-green-950 dark:text-slate-100">
            <HelpCircle />
            <span>Help</span>
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Need Help with Shopping, Talk to our Help Desk</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2 gap-6 space-y-2">
            <Link href="/tel:456789012" className="flex items-center 
            space-x-2 text-green-950 dark:text-slate-100" >
                <div className="flex items-center w-10 h-10 bg-lime-100 justify-center rounded-full">
                    <Headphones className="w-6 h-6 text-lime-800" />
                </div>
                <span>Call: 7890123456</span>    
            </Link>
            <Link href="/track" className="flex items-center 
            space-x-2 text-green-950 dark:text-slate-100" >
                <div className="flex items-center w-10 h-10 bg-lime-100 justify-center rounded-full">
                    <Truck className="w-6 h-6 text-lime-800" />
                </div>
                <span>Track Your Order</span>    
            </Link>
            <Link href="/returns" className="flex items-center 
            space-x-2 text-green-950 dark:text-slate-100" >
                <div className="flex items-center w-10 h-10 bg-lime-100 justify-center rounded-full">
                    <CornerDownLeft className="w-6 h-6 text-lime-800" />
                </div>
                <span>Returns & Refunds</span>    
            </Link>
            <Link href="/chat" className="flex items-center 
            space-x-2 text-green-950 dark:text-slate-100" >
                <div className="flex items-center w-10 h-10 bg-lime-100 justify-center rounded-full">
                    <MessageSquare className="w-6 h-6 text-lime-800" />
                </div>
                <span>Chat with Us</span>    
            </Link>

          </div>
        </Modal.Body>
     
      </Modal>
    </>
  );
}

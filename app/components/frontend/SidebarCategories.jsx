"use client";

import { getData } from "@/lib/getData";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

export default function SidebarCategories() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        async function fetchCategories() {
            const fetchedCategories = await getData("categories");
            setCategories(fetchedCategories);
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            setSelectedCategory(category);
        }
    }, [searchParams]);

    const handleCategoryClick = async (categoryId) => {
        setSelectedCategory(categoryId);
        router.push(`/?category=${categoryId}`);
        const categoryData = await getData(`categories/${categoryId}`);
        // Here you can handle the fetched data, e.g., update state or pass to a parent component
        console.log(categoryData, "here is selected category data");
    };

    return (
        <div
            className="sm:col-span-3 sm:block bg-white border border-gray-300 rounded-lg
        dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden hidden"
        >
            <h2
                className="bg-slate-100 py-3 px-6 font-semibold border-b  border-gray-300
       dark:bg-slate-800 text-slate-800 dark:text-slate-100 dark:border-gray-600  "
            >
                Shop By Category ({categories.length})
            </h2>
            <div className="py-3 px-6 h-[300px] overflow-y-auto flex flex-col gap-2">
                {categories.map((category, i) => {
                    return (
                        <Link
                            key={i}
                            href={`/?category=${category.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick(category.id);
                            }}
                            className={`flex items-center gap-3 
              hover:bg-slate-50 duration-300 transition-all dark:text-slate-300
              dark:hover:bg-slate-600 rounded-md ${selectedCategory === category.id ? 'bg-slate-100 dark:bg-slate-600' : ''}`}
                        >
                            <Image
                                width={556}
                                height={556}
                                className="w-10 h-10 rounded-full object-cover 
              border border-lime-300"
                                src={category.image}
                                alt={category.name}
                            />
                            <span className="text-sm">{category.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}




import React from 'react'

export default function generateSlug(name) {
    const slug = name
    .toLowerCase()
    .replace(/\s+/g,"-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g,"-")
    .replace(/^\-+/,"")
    .replace(/\-+$/,"");

    return slug;
}

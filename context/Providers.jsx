"use client"

import React from "react"
import { ThemeProvider  } from "next-themes"
import { Provider } from "react-redux"
import { store } from "@/redux/store"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"

export default function Providers({children}) {
  return (
    <ThemeProvider   attribute="class"
    defaultTheme="dark">
      <Toaster position="top-center" reverseOrder={false}/>
       <SessionProvider>
        <Provider store={store}>
          {children}
        </Provider>
       </SessionProvider>
    </ThemeProvider>
  )
}


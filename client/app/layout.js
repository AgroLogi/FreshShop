"use client"

import { Outfit } from "next/font/google";
import "./globals.css";

import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import { UpdateCart } from "./_context/UpdateCart";
import { useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const params =usePathname();
  const [updateCart, setUpdateCart] = useState(false);
  const showHeader = params=='/sign-in' || params=='/sign-up' ?false:true;
  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
    <html lang="en">
      <body className={outfit.className}>
        <UpdateCart.Provider value={{updateCart, setUpdateCart}}>
        {showHeader && <Header/>}
        {children}
        <Toaster/>
        </UpdateCart.Provider>
        </body>
    </html>
    </PayPalScriptProvider>
  );
}

"use client"
import React from "react";
import { useCallback } from "react";
import Footer from "../footer/page";
import Link from "next/link";
import Header from "../header/header";
import { useSession } from "next-auth/react"; 

export default function BrowsePage() {

  const createQueryString = useCallback(
    (name: string, value:string) => {
      const params = new URLSearchParams();
      params.set(name, value);

      return params.toString();
    },
    []
  );

  const { data: session } = useSession();

  if(session){
    return (
      <>  
        <div className="font-[sans-serif] text-[#333]">
          <div className="min-h-screen flex flex-col items-center justify-center">
            <Header/>
            <div>
              <div className="mb-6">
                <h3 className="text-3xl font-extrabold text-center">
                  Browse By
                </h3>
              </div>
              <div className="grid md:grid-cols-3 items-center max-w-4xl gap-8 p-10 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
                <div className="md:max-w-md w-full h-full">
                  <Link href="/browseitems">
                    <div className="w-full h-full sm:px-6 py-4 flex items-center justify-center shadow-xl rounded-2xl hover:shadow-2xl transform hover:scale-110 transition duration-300 ease-in-out">
                      <div className="flex flex-col items-center justify-center">
                        <img src="browsing-item.png" alt="Browse by item"/>
                        <h3 className="text-3xl font-extrabold text-center">
                          Item
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="md:max-w-md w-full h-full">
                  <Link href="/browsebids">
                    <div className="w-full h-full sm:px-6 py-4 flex items-center justify-center shadow-xl rounded-2xl hover:shadow-2xl transform hover:scale-110 transition duration-300 ease-in-out">
                      <div className="flex flex-col items-center justify-center">
                        <img src="browsing-bid.png" alt="Browse by bid"/>
                        <h3 className="text-3xl font-extrabold text-center">
                          Bid
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="md:max-w-md w-full h-full">
                  <Link href="/browseopco">
                    <div className="w-full h-full sm:px-6 py-4 flex items-center justify-center shadow-xl rounded-2xl hover:shadow-2xl transform hover:scale-110 transition duration-300 ease-in-out">
                      <div className="flex flex-col items-center justify-center">
                        <img src="browsing-opco.png"/>
                        <h3 className="text-3xl font-extrabold text-center">
                          Operating Company
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </>
    );
  }

}

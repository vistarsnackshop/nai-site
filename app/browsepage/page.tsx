"use client"
import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "../footer/page";
import Link from "next/link";

export default function browsePage() {
  const searchParams = useSearchParams()!;
  const username = searchParams.get("username");

  const createQueryString = useCallback(
    (name: string, value:string) => {
      const params = new URLSearchParams();
      params.set(name, value);

      return params.toString();
    },
    []
  );

  return (
    <>
      <div className="font-[sans-serif] text-[#333]">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center mb-12 mt-8">
            <img src="vistar-logo.png" className="mb-4" />
            <p className="text-3xl font-extrabold">
              National Account Information
            </p>
          </div>
          <div>
            <div className="mb-12">
              <h3 className="text-3xl font-extrabold text-center">
                Browse By
              </h3>
            </div>
            <div className="grid md:grid-cols-3 items-center gap-8 max-w-6xl w-full p-10 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
            <Link href={`/browseitems?${createQueryString("username", username as string)}`}>
                <div className="md:max-w-md w-full h-full sm:px-6 py-4 flex items-center justify-center shadow-xl rounded-2xl hover:shadow-2xl transform hover:scale-110 transition duration-300 ease-in-out">
                  <div className="flex flex-col items-center justify-center">
                    <img src="browsing-item.png" alt="Browse by item"/>
                    <h3 className="text-3xl font-extrabold text-center">
                      Item
                    </h3>
                  </div>
                </div>
            </Link>
              <div className="md:max-w-md w-full h-full sm:px-6 py-4 flex items-center justify-center shadow-xl rounded-2xl hover:shadow-2xl transform hover:scale-110 transition duration-300 ease-in-out">
                <div className="flex flex-col items-center justify-center">
                  <img src="browsing-bid.png" alt="Browse by bid"/>
                  <h3 className="text-3xl font-extrabold text-center">
                    Bid
                  </h3>
                </div>
              </div>
              <div className="md:max-w-md w-full h-full sm:px-6 py-4 flex items-center justify-center shadow-xl rounded-2xl hover:shadow-2xl transform hover:scale-110 transition duration-300 ease-in-out">
                <div className="flex flex-col items-center justify-center">
                  <img src="browsing-opco.png"/>
                  <h3 className="text-3xl font-extrabold text-center">
                    Operating Company
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

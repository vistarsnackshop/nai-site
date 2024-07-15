import React, { useState, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useSession } from "next-auth/react"; 
import { signOut } from 'next-auth/react';

export default function Header() {

  const [headerData, setHeaderData] = useState<{ STEREFDS: string, SPNMDS: string }[]>([]);
  const { data: session } = useSession();
  const username = session?.user?.name;

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/headerData?username=${username}`);
        const data = await response.json();
        setHeaderData(data);
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem("ItemDescription");
    localStorage.removeItem("whsDescription");
    localStorage.removeItem("bidId");
    signOut();
  };

  // Concatenate customer names and numbers with proper spacing
  const customerNames = headerData.map((item) => item.STEREFDS);
  const customerNumbers = headerData.map((item) => item.SPNMDS);

  return (
    <header className="w-5/6 bg-white text-vistarGreen p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Link href="./browsepage"><img src="vistar-logo.png" alt="Logo" className="h-10"/></Link>
          <span className="ml-2 text-lg font-bold text-vistarGreen">NAI</span>
        </div>
        <Link href={"/signin"}>
          <button 
            onClick={handleLogout} 
            className="flex items-center space-x-2 text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </Link>
      </div>
      <div className="text-gray-700 flex justify-center items-center">
        <p className='text-3xl font-extrabold'>Now Serving Customer {customerNames}, {customerNumbers}</p>
      </div>
    </header>
  );
}


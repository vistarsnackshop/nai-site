import React from 'react';
import Link from 'next/link';
import { useSession } from "next-auth/react"; 

type ButtonProps = {
  itemId: string;
  whsId: string;
  whsDS: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const InventoryButton: React.FC<ButtonProps> = ({ itemId, whsId, whsDS, onClick, children }) => {
  
  const href = `/inventory?itemId=${itemId}&whsId=${whsId}`;

  const handleClick = () => {
    // Store the warehouse description in local storage
    localStorage.setItem('whsDescription', whsDS);
  };

  return (
    <Link href={href}>
      <button
        onClick={(e) => {
          // First, call onClick if it exists
          if (onClick) onClick();
          // Then call handleClick
          handleClick();
        }}
        className="w-full shadow-xl py-4 px-4 text-sm font-semibold rounded-full text-white bg-vistarGreen hover:bg-vistarGreenHover focus:outline-none"
      >
        {children}
      </button>
    </Link>
  );
};

export default InventoryButton;

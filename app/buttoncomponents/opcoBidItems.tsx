import React from 'react';
import Link from 'next/link';

type ButtonProps = {
    username: string;
    whsId: string;
    whsDS: string;
    children: React.ReactNode;
};

const OpcoItemButton: React.FC<ButtonProps> = ({ username, whsId, whsDS, children }) => {
  const handleClick = () => {
    // Store the item description in local storage
    localStorage.setItem('whsDescription', whsDS);
  };

    const href = `/browseopcoitem?username=${username}&whsid=${whsId}`;
    return (
      <Link href={href}>
        <button onClick={handleClick} className="w-full shadow-xl py-4 px-4 text-sm font-semibold rounded-full text-white bg-vistarGreen hover:bg-vistarGreenHover focus:outline-none">{children}</button>
      </Link>
    );
};

export default OpcoItemButton;
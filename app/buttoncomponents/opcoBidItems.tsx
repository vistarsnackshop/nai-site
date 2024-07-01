import React from 'react';
import Link from 'next/link';

type ButtonProps = {
    username: string;
    whsId: string;
    children: React.ReactNode;
};

const OpcoItemButton: React.FC<ButtonProps> = ({ username, whsId, children }) => {
    const href = `/browseopcoitem?username=${username}&whsid=${whsId}`;
    return (
      <Link href={href}>
        <button className="w-1/2 shadow-xl py-4 px-4 text-sm font-semibold rounded-full text-white bg-vistarGreen hover:bg-vistarGreenHover focus:outline-none">{children}</button>
      </Link>
    );
};

export default OpcoItemButton;
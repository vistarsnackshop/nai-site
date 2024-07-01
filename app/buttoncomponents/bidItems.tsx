import React from 'react';
import Link from 'next/link';

type ButtonProps = {
    username: string;
    bidId: string;
    children: React.ReactNode;
};

const BidItemButton: React.FC<ButtonProps> = ({ username, bidId, children }) => {
    const href = `/browsebiditem?username=${username}&bidid=${bidId}`;
    return (
      <Link href={href}>
        <button className="w-1/2 shadow-xl py-4 px-4 text-sm font-semibold rounded-full text-white bg-vistarGreen hover:bg-vistarGreenHover focus:outline-none">{children}</button>
      </Link>
    );
};

export default BidItemButton;
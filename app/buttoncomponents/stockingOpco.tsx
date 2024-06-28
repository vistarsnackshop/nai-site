import React from 'react';
import Link from 'next/link';

type ButtonProps = {
    username: string;
    itemId: string;
    children: React.ReactNode;
};

const ItemOpcoButton: React.FC<ButtonProps> = ({ username, itemId, children }) => {
    const href = `/browseItemOpco?username=${username}&itemId=${itemId}`;
    return (
      <Link href={href}>
        <button className="w-1/2 shadow-xl py-4 px-4 text-sm font-semibold rounded-full text-white bg-vistarGreen hover:bg-vistarGreenHover focus:outline-none">{children}</button>
      </Link>
    );
};

export default ItemOpcoButton;
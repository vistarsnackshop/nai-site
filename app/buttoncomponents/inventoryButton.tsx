import React from 'react';
import Link from 'next/link';

type ButtonProps = {
    itemId: string;
    whsId: string;
    children: React.ReactNode;
};

const InventoryButton: React.FC<ButtonProps> = ({ itemId, whsId, children }) => {
    const href = `/inventory?itemId=${itemId}&whsId=${whsId}`;
    return (
      <Link href={href}>
        <button className="w-1/2 shadow-xl py-4 px-4 text-sm font-semibold rounded-full text-white bg-vistarGreen hover:bg-vistarGreenHover focus:outline-none">{children}</button>
      </Link>
    );
};

export default InventoryButton;
import React from 'react';
import Link from 'next/link';

type ButtonProps = {
    username: string;
    itemId: string;
    itemDS: string
    children: React.ReactNode;
};

const ItemOpcoButton: React.FC<ButtonProps> = ({ username, itemId, itemDS, children }) => {

  const handleClick = () => {
    // Store the item description in local storage
    localStorage.setItem('ItemDescription', itemDS);
  };

  const href = `/browseItemOpco?username=${username}&itemId=${itemId}`;
  return (
    <Link href={href}>
      <button onClick={handleClick} className="w-full shadow-xl py-4 px-4 text-sm font-semibold rounded-full text-white bg-vistarGreen hover:bg-vistarGreenHover focus:outline-none">{children}</button>
    </Link>
  );
};

export default ItemOpcoButton;
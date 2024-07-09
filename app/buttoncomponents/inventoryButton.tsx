import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  username: string;
  itemId: string;
  whsId: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const InventoryButton: React.FC<ButtonProps> = ({ username, itemId, whsId, onClick, children }) => {
  const href = `/inventory?username=${username}&itemId=${itemId}&whsId=${whsId}`;
  return (
    <Link href={href}>
      <button onClick={onClick} className="w-full shadow-xl py-4 px-4 text-sm font-semibold rounded-full text-white bg-vistarGreen hover:bg-vistarGreenHover focus:outline-none">{children}</button>
    </Link>
  );
};

export default InventoryButton;
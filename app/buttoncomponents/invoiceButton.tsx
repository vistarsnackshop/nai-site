import React from 'react';
import Link from 'next/link';

type ButtonProps = {
    username: string;
    itemId: string;
    whsId: string;
    startDate:string;
    endDate:string;
    children: React.ReactNode;
};

const InvoiceButton: React.FC<ButtonProps> = ({ username, whsId, itemId, startDate, endDate, children }) => {

  const handleClick = () => {
  };

  const href = `/browseItemOpco?username=${username}&itemId=${itemId}`;
  return (
    <Link href={href}>
      <button onClick={handleClick} className="w-full shadow-xl py-4 px-4 text-sm font-semibold rounded-full text-white bg-vistarGreen hover:bg-vistarGreenHover focus:outline-none">{children}</button>
    </Link>
  );
};

export default InvoiceButton;
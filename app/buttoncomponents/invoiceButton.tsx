import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  itemId: string;
  whsId: string;
  children: React.ReactNode;
};

const InvoiceButton: React.FC<ButtonProps> = ({ whsId, itemId, children }) => {

  const handleClick = () => {
  };

  const href = `/invoice?itemId=${itemId}&whsId=${whsId}`;
  return (
    <Link href={href}>
      <button onClick={handleClick} className="w-full shadow-xl py-4 px-4 text-sm font-semibold rounded-full text-white bg-vistarGreen hover:bg-vistarGreenHover focus:outline-none">{children}</button>
    </Link>
  );
};

export default InvoiceButton;
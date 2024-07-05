"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import { FaUserCircle } from "react-icons/fa";

interface HeaderProps {
  customerNumber: string;
  customerName: string;
}

export default function Header({ customerNumber, customerName }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(isOpen!);
    };
  
    return (
      <Navbar className="w-full">
        <NavbarBrand>
          <img src="vistar-logo.png" className="w-24 h-11" alt="Vistar Logo" />
        </NavbarBrand>
        <NavbarContent className="flex justify-between items-center">
          {/* Spacer to push Dropdown to the right */}
          <div className="flex-1"></div>
          <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
            <DropdownTrigger>
              <Button
                isIconOnly
                onClick={toggleDropdown}
                className="flex items-center justify-center bg-white"
              >
                <FaUserCircle size={30}/>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu actions" color="primary">
              <DropdownItem key="customerNumber">
                <p>{`Customer Number: ${customerNumber}`}</p>
              </DropdownItem>
              <DropdownItem key="customerName">
                <p>{`Customer Name: ${customerName}`}</p>
              </DropdownItem>
              <DropdownItem key="logout" color="default">
                <Button className="bg-vistarGreen text-white">Logout</Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    );
  }

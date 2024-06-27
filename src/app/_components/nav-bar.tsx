"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export function TopNavbar({
  userImage,
  userName,
}: {
  userImage: string;
  userName: string;
}) {
  const pathname = usePathname();

  return (
    <Navbar>
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <p className="font-bold text-inherit">Movie App</p>
      </NavbarBrand>

      <NavbarContent className="hidden gap-4 lg:flex" justify="start">
        <NavbarItem isActive={pathname === "/home" || pathname === "/"}>
          <Link
            color={
              pathname === "/home" || pathname === "/"
                ? "primary"
                : "foreground"
            }
            href="/home"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/watchlist"}>
          <Link
            href="/watchlist"
            color={pathname === "/watchlist" ? "primary" : "foreground"}
          >
            Watchlist
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={userName.charAt(0)}
              size="sm"
              src={userImage}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem isReadOnly key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{userName}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

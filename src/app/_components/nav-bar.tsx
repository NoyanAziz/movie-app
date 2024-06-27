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
import { DISPLAY_STRINGS, LABELS } from "../constants";

export function TopNavbar({
  userImage,
  userName,
}: {
  userImage: string;
  userName: string;
}) {
  const pathname = usePathname();

  return (
    <Navbar maxWidth="xl">
      <NavbarBrand className="grow-0">
        {/* <AcmeLogo /> */}
        <p className="font-bold text-inherit">{LABELS.APP_TITLE}</p>
      </NavbarBrand>

      <NavbarContent className="mx-20 gap-12">
        <NavbarItem isActive={pathname === "/home" || pathname === "/"}>
          <Link
            color={
              pathname === "/home" || pathname === "/"
                ? "primary"
                : "foreground"
            }
            href="/home"
          >
            {LABELS.HOME}
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/watchlist"}>
          <Link
            href="/watchlist"
            color={pathname === "/watchlist" ? "primary" : "foreground"}
          >
            {LABELS.WATCHLIST}
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
            <DropdownItem
              isReadOnly
              key="profile"
              className="h-14 cursor-default gap-2"
            >
              <p className="font-semibold">{DISPLAY_STRINGS.SIGNED_AS}</p>
              <p className="font-semibold">{userName}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              {LABELS.LOGOUT}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

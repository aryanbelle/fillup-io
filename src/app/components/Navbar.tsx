"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import {
  SignInButton,
  SignOutButton,
  SignedOut,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="h-[8vh] text-2xl">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link color="foreground" href="./">
            <Image src={"/LOGO.PNG"} alt="LOGO" width={80} height={40} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <SignedIn>
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Upgrade
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/dashboard">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/newform">
              Chatbot
            </Link>
          </NavbarItem>
        </NavbarContent>
      </SignedIn>
      <SignedOut>
        <NavbarContent className="hidden sm:flex gap-7 " justify="center">
          <NavbarItem>
            <Link href="#home" color="foreground">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#features" color="foreground">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/" color="foreground">
              Pricing
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#developers" color="foreground">
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#footer" color="foreground">
              Contact
            </Link>
          </NavbarItem>
        </NavbarContent>
      </SignedOut>
      <NavbarContent justify="end">
        <NavbarItem className=" p-2  lg:flex">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

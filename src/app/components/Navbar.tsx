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
    { label: "Profile", href: "/profile" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Activity", href: "/activity" },
    { label: "Analytics", href: "/analytics" },
    { label: "System", href: "/system" },
    { label: "Deployments", href: "/deployments" },
    { label: "My Settings", href: "/settings" },
    { label: "Team Settings", href: "/team-settings" },
    { label: "Help & Feedback", href: "/help" },
    { label: "Log Out", href: "/logout" },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="h-[8vh] text-lg sm:text-xl"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center">
            <Image src={"/LOGO.PNG"} alt="FIILUP.IO" width={70} height={35} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <SignedIn>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem></NavbarItem>
          <NavbarItem>
            <Link href="/dashboard" color="foreground">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/ai" color="foreground">
              AI (Form)
            </Link>
          </NavbarItem>
        </NavbarContent>
      </SignedIn>

      <SignedOut>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
            <Link href="#about" color="foreground">
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#contact" color="foreground">
              Contact
            </Link>
          </NavbarItem>
        </NavbarContent>
      </SignedOut>

      <NavbarContent justify="end">
        <NavbarItem>
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
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              href={item.href}
              color={
                item.label === "Activity"
                  ? "primary"
                  : item.label === "Log Out"
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

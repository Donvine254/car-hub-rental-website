"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string }[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "My Profile",
    href: "/me/profile",
  },
  {
    title: "My Orders",
    href: "/me/orders",
  },
  {
    title: "My Favorite Cars",
    href: "/me/cars",
  },
  {
    title: "Settings",
    href: "/me/settings",
  },
  {
    title: "Logout",
    href: "/api/logout",
  },
];

export default function Navbar(props: Props) {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-5 m-2">
      <Link href="/" legacyBehavior passHref>
        <Image
          alt="CarHub Logo"
          width={118}
          height={18}
          src="/logo.svg"
          className="object-contain"
        />
      </Link>

      <NavigationMenu className="text-lg">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-2xl">
              Cars
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <ListItem href="/cars?model=saloon" title="Saloons"></ListItem>
                <ListItem href="/cars?model=suv" title="SUVs"></ListItem>
                <ListItem href="/cars?model=pickup" title="Pickups"></ListItem>
                <ListItem href="/cars?model=van" title="Vans"></ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-2xl">
              Locations
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <ListItem
                  href="/locations?location=nairobi"
                  title="Nairobi"></ListItem>
                <ListItem
                  href="/locations?location=eldoret"
                  title="Eldoret"></ListItem>
                <ListItem
                  href="/locations?location=Kisumu"
                  title="Kisumu"></ListItem>
                <ListItem
                  href="/locations?location=Mombasa"
                  title="Mombasa"></ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xl">
              My Account
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/booking" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-xl`}>
                Booking
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/pricing" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-xl`}>
                Pricing
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/login" prefetch legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-xl`}>
                Login
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ",
            className
          )}
          {...props}>
          <div className="text-base font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

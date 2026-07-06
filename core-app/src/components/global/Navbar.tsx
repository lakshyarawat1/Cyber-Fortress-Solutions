import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

// ⚡ Bolt: Dynamically import ModeToggle to reduce initial JS payload.
// ModeToggle relies on heavy Radix UI DropdownMenu primitives which aren't strictly necessary for initial page render.
// By lazy-loading it, we shave off unused JS from the initial First Load, improving TTI (Time to Interactive).
const ModeToggle = dynamic(() => import("./ModeToggle").then((mod) => mod.ModeToggle), {
  ssr: false,
  loading: () => <div className="h-10 w-10 border rounded-md border-input bg-background" /> // Placeholder matching Button size="icon"
});

const icon = "icon.ico";

const Navbar = () => {
  return (
    <nav className="md:flex gap-[25%] mx-[35%] my-2 pb-3 md:mx-2 border-b">
      <div className="flex gap-3 items-center">
        <Avatar>
          <AvatarImage src={icon} className="cursor-pointer" />
          <AvatarFallback>CF</AvatarFallback>
        </Avatar>
        <p className="flex gap-1 text-lg text-red-600">
          Cyber <span className="text-black dark:text-white">Fortress </span>
        </p>
      </div>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink asChild>
                <ul className=" grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Cyber Fortress
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Development and security solutions.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/products" title="Products">
                    Intrusion detection system
                  </ListItem>
                  <ListItem href="/products" title="Services">
                    Penetration testing and security consulting services.
                  </ListItem>
                  <ListItem
                    href="/freelance"
                    title="Freelancing services"
                  >
                    Web application development services.
                  </ListItem>
                </ul>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Pricing</NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Training</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink asChild>
                <ul className=" md:w-[400px] lg:w-[500px] p-4">
                  <ListItem href="#" title="Students">
                    Cyber security and development training for students.
                  </ListItem>
                  <ListItem href="#" title="Professionals">
                    High-end professional training for singular and
                    organizational basis.
                  </ListItem>
                </ul>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink asChild>
                <ul className=" md:w-[400px] lg:w-[500px] p-4">
                  <ListItem href="#" title="Github">
                    Source code for projects and code snippets.
                  </ListItem>
                  <ListItem href="#" title="E-Books">
                    Free e-books and resources for developers.
                  </ListItem>
                </ul>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="hidden md:flex gap-3">
        <ModeToggle />
      </div>
    </nav>
  );
};

// ⚡ Bolt: Use Next.js Link instead of a standard <a> tag for navigation.
// This enables client-side routing, avoiding a full page reload and reducing navigation latency.
const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;

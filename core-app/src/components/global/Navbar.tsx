import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ModeToggle } from "./ModeToggle";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {};

const icon = "icon.ico";

const Navbar = (props: Props) => {
  return (
    <nav className="flex gap-[25%] my-2 pb-3 mx-2 border-b">
      <div className="flex gap-3 items-center">
        <Avatar>
          <AvatarImage src={icon} className="cursor-pointer" />
          <AvatarFallback>CF</AvatarFallback>
        </Avatar>
        <p className="flex gap-1 text-lg text-red-600">
          Cyber <span className="text-black dark:text-white">Fortress </span>
        </p>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>
                <ul className=" grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Cyber Fortress
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Development and security solutions.
                        </p>
                      </a>
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
              <NavigationMenuLink>
                <ul className=" md:w-[400px] lg:w-[500px] p-4">
                  <ListItem title="Students">
                    Cyber security and development training for students.
                  </ListItem>
                  <ListItem title="Professionals">
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
              <NavigationMenuLink>
                <ul className=" md:w-[400px] lg:w-[500px] p-4">
                  <ListItem title="Github">
                    Source code for projects and code snippets.
                  </ListItem>
                  <ListItem title="E-Books">
                    Free e-books and resources for developers.
                  </ListItem>
                </ul>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-3">
        <ModeToggle />
        {/* <Button>Login</Button> */}
      </div>
    </nav>
  );
};

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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;

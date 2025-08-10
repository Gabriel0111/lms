"use client";

import Link from "next/link";
import { LibraryBig } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import UserDropdown from "@/app/(public)/_components/UserDropdown";

interface NavigationItem {
  name: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Dashboard", href: "/admin" },
];

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60">
      <div className="container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 mr-4">
          <LibraryBig className="size-9" />
          <span className="font-bold">LMS.</span>
        </Link>

        {/*{Desktop Navigation}*/}
        <nav className="hidden md:flex md:flex-1 md:justify-between">
          <div className="flex items-center space-x-5">
            {navigationItems.map((item: NavigationItem) => (
              <Link
                href={item.href}
                key={item.href}
                className="text-sm font-medium hover:text-primary hover:underline transition-colors "
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-5">
            <ThemeToggle />
            {!isPending &&
              (session ? (
                <UserDropdown
                  name={session?.user.name}
                  email={session?.user.email}
                  image={session?.user.image || ""}
                />
              ) : (
                <>
                  <Link
                    href="/login"
                    className={buttonVariants({ variant: "secondary" })}
                  >
                    Login
                  </Link>
                  <Link href="/login" className={buttonVariants()}>
                    Get Started
                  </Link>
                </>
              ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

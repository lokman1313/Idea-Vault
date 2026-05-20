"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import ThemeToggole from "./ThemeToggole";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Ideas", href: "/ideas" },
  { name: "Add Idea", href: "/add-ideas" },
  { name: "My Ideas", href: "/my-ideas" },
  { name: "Interactions", href: "/my-interaction" },
];

const classNames = (...classes) => classes.filter(Boolean).join(" ");

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 bg-gray-900/60 backdrop-blur-md border-b border-white/10">
      <Disclosure as="nav" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
       
        <div className="flex h-16 items-center justify-between">
          
         
          <div className="sm:hidden">
            <DisclosureButton className="p-2 text-white rounded-md hover:bg-white/10">
              <Bars3Icon className="h-6 w-6 group-data-open:hidden" />
              <XMarkIcon className="h-6 w-6 hidden group-data-open:block" />
            </DisclosureButton>
          </div>

          
          <Link href="/" className="flex items-center gap-2">
            <Logo></Logo>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden sm:flex gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    "px-4 py-2 text-sm rounded-full transition",
                    isActive
                      ? "bg-indigo-600 text-white shadow"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          
          <div className="flex items-center gap-3">

            <ThemeToggole />

          
            {isPending ? (
              <p className="text-sm text-gray-300">Loading...</p>
            ) : user ? (
              <Menu as="div" className="relative">
                <MenuButton className="rounded-full overflow-hidden w-8 h-8">
                   <Image
                     src={
                       user.image ||
                       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                     }
                     alt="user"
                     width={36}
                     height={36}
                     className="rounded-full object-cover w-full h-full"
                   />
                 </MenuButton>

                <MenuItems className="absolute right-0 mt-2 w-44 rounded-xl bg-gray-900 border border-white/10 p-2 shadow-lg">
                  
                  <MenuItem>
                    <Link
                      href="/profile"
                      className="block px-3 py-2 rounded text-white text-sm"
                    >
                      Profile
                    </Link>
                  </MenuItem>

                  <div className="my-1 border-t border-white/10" />

                  <MenuItem>
                    <button
                      onClick={() => authClient.signOut()}
                      className="w-full text-left px-3 py-2 rounded text-red-400 hover:bg-red-500/10 text-sm"
                    >
                      Logout
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <div className="flex gap-2">
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
                <Link href="/signUp">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <DisclosurePanel className="sm:hidden pb-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                href={item.href}
                className={classNames(
                  "block px-3 py-2 rounded-md text-sm",
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
        </DisclosurePanel>
      </Disclosure>
    </header>
  );
}
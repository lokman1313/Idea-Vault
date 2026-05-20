'use client'
import logo from "@/../public/logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation' 
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@heroui/react'
import ThemeToggole from './ThemeToggole'
import { authClient } from "@/lib/auth-client"
import { p } from "framer-motion/client"

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Ideas', href: '/ideas' },
  { name: 'Add Idea', href: '/add-ideas' },
  { name: 'My Ideas', href: '/my-ideas' },
  { name: 'My Interactions', href: '/my-interaction' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavbarPage() {
  const pathname = usePathname() 

  const { data: session , isPending } = authClient.useSession()
    const userData = session?.user;

  return (
    <div className="sticky top-0 z-50 bg-gray-800/50 backdrop-blur-md">
    <Disclosure as="nav" className="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo + Navigation */}
            <div className="flex items-center">
             <Link href="/">
               <Image
                 src={logo}
                 alt="Logo"
                 width={40}
                 height={40}
               />
             </Link>
           </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

            {/* Desktop Navigation */}
            <div className="hidden sm:flex gap-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10',
                    'rounded-full px-4 py-2 text-sm font-medium transition'
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
          </div>

          {/* Right Side */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
  <ThemeToggole />
{isPending ? (
        <p className="px-4 py-2 text-sm text-gray-300">Loading...</p>
      ) : userData ? 
        <>
  <Menu as="div" className="relative ml-3">
    <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
      <span className="absolute -inset-1.5" />
      <span className="sr-only">Open user menu</span>

      <Image
        src={
          userData?.image ||
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
        }
        alt="User"
        width={32}
        height={32}
        className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
      />
    </MenuButton>

    <MenuItems className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-xl bg-gray-900/95 backdrop-blur-md p-2 shadow-lg ring-1 ring-white/10">
  
  <MenuItem>
    <Link href="/profile" className="block">
      <Button className="w-full justify-start rounded-lg px-3 py-2 text-left text-sm hover:bg-white/10">
        Profile
      </Button>
    </Link>
  </MenuItem>

  <div className="my-1 h-px bg-white/10" />

  <MenuItem>
    <Button
      className="w-full justify-start rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10"
      variant="ghost"
      onClick={() => authClient.signOut()}
    >
      Logout
    </Button>
  </MenuItem>

</MenuItems>
  </Menu>
        </> : 
        <div className="space-x-2 ml-2">
          <Link href="/login">
              <Button >Login</Button>
            </Link>
            <Link href="/signUp">
              <Button >Sign Up</Button>
            </Link>
        </div>
      }
</div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href 
            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={classNames(
                  isActive
                    ? 'bg-gray-950/50 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
              >
                {item.name}
              </DisclosureButton>
            )
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
    </div>
  )
}
"use client"

import NavDropdown from "./DropdownMenu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Info, House, Activity } from 'lucide-react'


const Navbar = () => {
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Home", icon: <House size={18} /> },
    { href: "/dashboard", label: "Dashboard", icon: <Activity size={18} /> },
    { href: "/about", label: "About", icon: <Info size={18} /> },
  ]

  return (
    <div className="sticky top-0 z-50 bg-linear-to-br from-gray-500 via-gray-600 to-gray-400">
      <div className="absolute inset-0 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/60" />

      <div className="relative flex justify-between items-center px-10 py-4 max-w-7xl mx-auto">
        <h1 className="font-extrabold text-2xl tracking-tight select-none">
          Stoc<span className="text-green-600">King</span>
        </h1>

        
        <nav className="hidden md:flex gap-2">
          {navLinks.map(({ href, label, icon }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href)

            return (
              <Link
                key={href}
                href={href}
                className={`
                  relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold
                  transition-all duration-200 group
                  ${
                    isActive
                      ? "text-green-600 bg-green-50 dark:bg-green-950/40 dark:text-green-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                  }
                `}
              >
                <span className={`transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                  {icon}
                </span>
                {label}
              </Link>
            )
          })}
        </nav>

        
        <Link
          href="/sign-in"
          className="
            hidden md:block
            text-sm font-semibold py-2 px-5 rounded-xl
            bg-green-600 text-white
            hover:bg-green-500 active:scale-95
            transition-all duration-150 shadow-sm shadow-green-200 dark:shadow-green-900/30
          "
        >
          Log in
        </Link>

       
        <NavDropdown />
      </div>
    </div>
  )
}

export default Navbar
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useRouter } from "next/navigation"
import { Menu} from 'lucide-react';
import Link from "next/link";

export default function NavDropdown() {

  const router = useRouter(); 

  const handleSignOut = async () => {
    router.push('/sign-in')
  }

  return (
    <div className="block md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer hover:bg-green-500 p-2 rounded-full"><Menu size={20}/></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem><Link href="/">Home</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/dashboard">Dashboard</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/about">About</Link></DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
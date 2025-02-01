"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const pathname = usePathname()
  const isMarketing = pathname === '/'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F4FFC3] border-b-2 border-black h-14">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#c1ff72] rounded-sm flex items-center justify-center border-2 border-b-3 border-r-3 border-black">
                <span className="text-black text-xl">🎓</span>
              </div>
              <span className="font-semibold">Mind Mentor</span>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-4">
            {isMarketing ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link 
                      href="https://github.com/KartikLabhshetwar/mind-mentor" 
                      target="_blank"
                      className="px-4 py-1.5 bg-[#c1ff72] border-2 border-b-4 border-r-4 border-black rounded-lg hover:bg-[#c1ff72] hover:border-b-2 hover:border-r-2 transition-all duration-100 text-sm font-medium shadow-sm hover:shadow active:border-b-2 active:border-r-2"
                    >
                      GitHub
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Star on GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : null}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatars/01.png" alt="@user" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">User</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      user@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}
'use client'

import { LogIn, LogOut, PencilLine, User, UserPlus } from 'lucide-react'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useRouter } from 'next/navigation'

type props = {
  loggedIn: boolean
  onLogout?: () => void
}

function AccountButton({ loggedIn, onLogout }: props) {
  //---
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={loggedIn ? 'default' : 'outline'} size="icon">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            if (loggedIn) router.push('/create')
            else router.push('/auth/sign-up')
          }}
        >
          {loggedIn ? <PencilLine /> : <UserPlus />}
          {loggedIn ? 'Create' : 'Sign up'}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            if (loggedIn && onLogout) {
              onLogout()
            } else {
              router.push('/auth/login')
            }
          }}
        >
          {loggedIn ? <LogOut /> : <LogIn />}
          {loggedIn ? 'Logout' : 'Login'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountButton

'use client'

import { LogIn, User, UserPlus } from 'lucide-react'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useRouter } from 'next/navigation'

function AccountButton() {
  //---
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push('/auth/sign-up')}>
          <UserPlus />
          Sign up
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/auth/login')}>
          <LogIn />
          Login
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountButton

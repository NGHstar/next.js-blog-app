'use client'

import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { ThemeToggle } from './theme-toggle'
import { useConvexAuth } from 'convex/react'
import { LoaderCircle, LogOutIcon } from 'lucide-react'
import { authClient } from '../../lib/auth-client'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import SearchInput from './SearchInput'

function Navbar() {
  // ---
  const { isAuthenticated, isLoading } = useConvexAuth()
  const router = useRouter()

  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-end gap-8">
        <div>
          <Link href="/">
            <h1 className="text-4xl font-bold">
              Next<span className="text-primary">Pro</span>
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link className={buttonVariants({ variant: 'ghost' })} href="/">
            Home
          </Link>
          <Link className={buttonVariants({ variant: 'ghost' })} href="/blog">
            Blog
          </Link>
          <Link className={buttonVariants({ variant: 'ghost' })} href="/create">
            Create
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:block mr-2">
          <SearchInput />
        </div>
        {isLoading ? (
          <LoaderCircle className="animate-spin size-5" />
        ) : isAuthenticated ? (
          <Button
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success('Logged out successfully')
                    router.push('/')
                  },
                  onError: err => {
                    toast.error(err.error.message)
                  },
                },
              })
            }
          >
            <LogOutIcon />
            Logout
          </Button>
        ) : (
          <>
            <Link className={buttonVariants()} href="/auth/sign-up">
              Sign up
            </Link>
            <Link className={buttonVariants({ variant: 'outline' })} href="/auth/login">
              Login
            </Link>
          </>
        )}

        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navbar

'use client'

import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { ThemeToggle } from './theme-toggle'
import { useConvexAuth } from 'convex/react'
import { Loader2, LogOutIcon } from 'lucide-react'
import { authClient } from '../../lib/auth-client'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import SearchInput from './SearchInput'
import { useState } from 'react'

function Navbar() {
  // ---
  const { isAuthenticated, isLoading } = useConvexAuth()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true) // لودینگ شروع شد
    try {
      await authClient.signOut()
      toast.success('Logged out successfully')
      router.push('/')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.message || 'Error logging out')
    } finally {
      setLoggingOut(false)
    }
  }

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
          <Button
            className="cursor-pointer"
            variant="ghost"
            disabled={isLoading}
            onClick={() => {
              if (isAuthenticated) {
                router.push('/create')
              } else {
                router.push('/auth/login')
              }
            }}
          >
            Create
            {isLoading && <Loader2 className="animate-spin translate-y-0.5" />}
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:block mr-2">
          <SearchInput />
        </div>
        {isLoading || loggingOut ? (
          <Button className={buttonVariants()} disabled>
            <Loader2 className="animate-spin size-5" />
          </Button>
        ) : isAuthenticated ? (
          <Button onClick={handleLogout} className="cursor-pointer">
            <LogOutIcon />
            Logout
          </Button>
        ) : (
          <>
            <Link className={buttonVariants({ className: 'cursor-pointer' })} href="/auth/sign-up">
              Sign up
            </Link>
            <Link
              className={buttonVariants({ variant: 'outline', className: 'cursor-pointer' })}
              href="/auth/login"
            >
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

'use client'

import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { ThemeToggle } from './theme-toggle'
import { useConvexAuth } from 'convex/react'
import { Home, Library, Loader2, LogOutIcon, Menu, PencilLine } from 'lucide-react'
import { authClient } from '../../lib/auth-client'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import SearchInput from './SearchInput'
import { useState } from 'react'
import Image from 'next/image'
import AccountButton from './AccountButton'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'

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
      <div className="flex items-end gap-4">
        <div className="min-w-16">
          <Link href="/">
            <Image src="/akatsuki_logo.svg" alt="akatsuki logo" width={60} height={20} priority />
          </Link>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>

            <SheetTitle></SheetTitle>

            <SheetContent
              side="left"
              className="w-54 items-baseline pt-6 pl-2 bg-background/60 backdrop-blur-2xl border-0"
            >
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/" className={buttonVariants({ variant: 'ghost' })}>
                  <Home className="size-5 -translate-y-0.5" />
                  Home
                </Link>

                <Link
                  href="/blog"
                  className={buttonVariants({ variant: 'ghost', className: '-translate-x-1' })}
                >
                  <Library className="size-5 -translate-y-0.5" />
                  Blog
                </Link>

                <Button
                  variant="ghost"
                  onClick={() => {
                    if (isAuthenticated) {
                      router.push('/create')
                    } else {
                      router.push('/auth/login')
                    }
                  }}
                >
                  <PencilLine className="size-5 -translate-y-0.5" />
                  Create
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex items-center gap-2">
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
            <p className="hidden sm:block">Logout</p>
          </Button>
        ) : (
          <AccountButton />
        )}

        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navbar

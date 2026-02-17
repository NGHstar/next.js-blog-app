'use client'

import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { ThemeToggle } from './theme-toggle'
import { useConvexAuth } from 'convex/react'
import { Loader2 } from 'lucide-react'
import { authClient } from '../../lib/auth-client'
import toast from 'react-hot-toast'
import { usePathname, useRouter } from 'next/navigation'
import SearchInput from './SearchInput'
import { useState } from 'react'
import Image from 'next/image'
import AccountButton from './AccountButton'

import MobileNav from './MobileNav'

function Navbar() {
  // ---
  const { isAuthenticated, isLoading } = useConvexAuth()
  const router = useRouter()
  const pathName = usePathname()
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
    <div>
      <nav className="w-full py-5 flex items-center justify-between">
        <div className="flex items-end gap-4 order-2 md:-order-1">
          <div className="min-w-16">
            <Link href="/">
              <Image src="/akatsuki_logo.svg" alt="akatsuki logo" width={60} height={20} priority />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: `${pathName === '/' ? 'text-foreground' : 'text-muted-foreground'}`,
              })}
              href="/"
            >
              Home
            </Link>
            <Link
              className={buttonVariants({
                variant: 'ghost',
                className: `-translate-x-1 ${pathName === '/blog' ? 'text-foreground' : 'text-muted-foreground'}`,
              })}
              href="/blog"
            >
              Blog
            </Link>
            <Button
              className={`cursor-pointer ${pathName === '/create' ? 'text-foreground' : 'text-muted-foreground'}`}
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
          <div className="md:hidden">
            <MobileNav isAuthenticated />
          </div>
          {isLoading || loggingOut ? (
            <Button className={buttonVariants()} disabled>
              <Loader2 className="animate-spin size-5" />
            </Button>
          ) : isAuthenticated ? (
            <AccountButton loggedIn={true} onLogout={handleLogout} />
          ) : (
            <AccountButton loggedIn={false} onLogout={undefined} />
          )}

          <ThemeToggle />
        </div>
      </nav>
    </div>
  )
}

export default Navbar

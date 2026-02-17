'use client'

import { Home, Library, Menu, PencilLine } from 'lucide-react'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import { useState } from 'react'

type props = {
  isAuthenticated: boolean
}

function MobileNav({ isAuthenticated }: props) {
  // ---
  const router = useRouter()
  const pathName = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetTitle></SheetTitle>

      <SheetContent
        side="left"
        className="w-54 items-baseline pt-6 pl-2 dark:bg-background/60 bg-background backdrop-blur-2xl border-0"
      >
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={buttonVariants({
              variant: 'ghost',
              className: `${pathName === '/' ? 'text-foreground' : 'text-muted-foreground'}`,
            })}
          >
            <Home className="size-5 -translate-y-0.5 md:hidden" />
            Home
          </Link>

          <Link
            href="/blog"
            onClick={() => setOpen(false)}
            className={buttonVariants({
              variant: 'ghost',
              className: `-translate-x-1 ${pathName === '/blog' ? 'text-foreground' : 'text-muted-foreground'}`,
            })}
          >
            <Library className="size-5 -translate-y-0.5 md:hidden" />
            Blog
          </Link>

          <Button
            variant="ghost"
            className={`cursor-pointer ${pathName === '/create' ? 'text-foreground' : 'text-muted-foreground'}`}
            onClick={() => {
              if (isAuthenticated) {
                router.push('/create')
              } else {
                router.push('/auth/login')
              }
              setOpen(false)
            }}
          >
            <PencilLine className="w-5 h-4 -translate-y-0.5 md:hidden" />
            Create
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav

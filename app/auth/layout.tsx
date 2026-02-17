import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '../../components/ui/button'
import { ReactNode } from 'react'
import Image from 'next/image'

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="flex min-h-screen justify-center pt-28">
        <div className="absolute top-5 left-5">
          <Link href="/" className={buttonVariants({ variant: 'secondary' })}>
            <ArrowLeft className="size-4" />
            Go Back
          </Link>
        </div>
        <div className="w-full max-w-md mx-auto">
          <Link href="/">
            <Image
              className="mx-auto mb-8"
              src="/akatsuki_logo.svg"
              alt="akatsuki logo"
              width={90}
              height={40}
              priority
            />
          </Link>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

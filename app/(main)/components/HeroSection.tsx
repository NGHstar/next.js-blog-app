import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function HeroSection() {
  return (
    <section
      className="relative mb-5 mt-16 max-md:mt-6 py-12 rounded-2xl bg-[#2f303b] dark:bg-card 
       text-white flex flex-col justify-center items-start px-12 text-start z-20"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 z-30 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)]">
        Welcome to the <span className="text-primary">Akatsuki</span>
      </h1>
      <p className="text-xl sm:text-2xl max-w-2xl mb-8 z-30 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)]">
        The Akatsuki organization consists of the strongest shinobi, united with the goal of creating peace in
        the world.
      </p>
      <Link
        href="/auth/sign-up"
        className={buttonVariants({
          size: 'lg',
          className: 'flex items-center gap-2 cursor-pointer z-30',
        })}
      >
        Join the Akatsuki <ArrowRight />
      </Link>
      <Image
        className="absolute right-0 bottom-0 rounded-br-2xl z-10 max-w-148 max-xs:max-w-64
         mask-[linear-gradient(to_left,black_0%,black_60%,transparent_100%)] md:w-xl sm:w-md w-sm
"
        src="/akatsuki_banner2.svg"
        alt="akatsuki banner"
        width={560}
        height={40}
      />
    </section>
  )
}

export default HeroSection

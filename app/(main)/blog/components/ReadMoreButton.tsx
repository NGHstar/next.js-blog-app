'use client'

import { Button } from '@/components/ui/button'
import { useConvexAuth } from 'convex/react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

function ReadMoreButton({ postId }: { postId: string }) {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const router = useRouter()

  const handleClick = () => {
    if (isLoading)
      return (
        <Button disabled className="w-full" onClick={handleClick}>
          <Loader2 className="animate-spin" />
        </Button>
      )
    if (isAuthenticated) {
      router.push(`/blog/${postId}`)
    } else {
      router.push(`/auth/login?callbackUrl=/blog/${postId}`)
    }
  }

  return (
    <Button className="w-full" onClick={handleClick}>
      Read more
    </Button>
  )
}

export default ReadMoreButton

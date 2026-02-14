import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import CommentSection from '@/components/web/CommentSection'
import { Id } from '@/convex/_generated/dataModel'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchQuery, preloadQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { Metadata } from 'next'
import PostPresence from '@/components/web/PostPresence'
import { getToken } from '@/lib/auth-server'
import { redirect } from 'next/navigation'

type PostId = {
  params: Promise<{ postId: Id<'posts'> }>
}

// * SEO
export async function generateMetadata({ params }: PostId): Promise<Metadata> {
  const post = await fetchQuery(api.posts.getPostById, { postId: (await params).postId })
  if (!post) return { title: 'post not found' }

  return {
    title: post.title,
    description: post.content,
  }
}

async function PostDetails({ params }: PostId) {
  // ---
  const { postId } = await params

  const token = await getToken()

  const [post, preloadedComments, userId] = await Promise.all([
    fetchQuery(api.posts.getPostById, { postId }),
    preloadQuery(api.comments.getCommentsByPostId, { postId }),
    fetchQuery(api.presence.getUserId, {}, { token }),
  ])

  if (!userId) {
    return redirect('/auth/login')
  }

  if (!post)
    return (
      <div className="text-5xl font-extrabold text-red-600">
        <h1>no post founded</h1>
      </div>
    )

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 animate-in fade-in duration-500 relative">
      {/* back button */}
      <Link className={buttonVariants({ variant: 'outline' })} href="/blog">
        <ArrowLeft />
        Back to blog
      </Link>

      {/* image */}
      <div className="relative mt-4 w-full h-100 mb-8 rounded-xl overflow-hidden shadow-sm">
        <Image
          fill
          className="object-cover hover:scale-110 transition-transform duration-500"
          src={post.imageUrl ?? 'https://picsum.photos/400/300'}
          alt={post.title ?? 'post image'}
        />
      </div>

      {/* content */}
      <div className="space-y-3 flex flex-col">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight ">{post.title}</h1>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Posted on: {new Date(post._creationTime ?? '').toLocaleDateString('en-US')}
          </p>
          {userId && <PostPresence roomId={post._id!} userId={userId} />}
        </div>
      </div>
      <Separator className="my-6" />
      <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap mb-8">{post.content}</p>

      <CommentSection preloadedComments={preloadedComments} />
    </div>
  )
}

export default PostDetails

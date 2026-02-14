import { Card, CardContent, CardFooter } from '../../../components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '../../../components/ui/button'
import { fetchQuery } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'
import { Skeleton } from '../../../components/ui/skeleton'
import { Metadata } from 'next'
import { cacheLife, cacheTag } from 'next/cache'

// * SEO
export const metadata: Metadata = {
  title: 'Blog | Next.js 16',
  description: 'Read our latest articles and insights',
  category: 'web development',
  authors: [{ name: 'john doe' }, { name: 'alex' }],
}

async function BlogPage() {
  // ---
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="page-title">Our Blog</h1>
        <p className="text-xl text-muted-foreground">Insights, thoughts and trends from our team.</p>
      </div>
      {/* content */}
      <LoadBlog />
    </div>
  )
}

function BlogSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2 flex flex-col">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

async function LoadBlog() {
  // ---
  'use cache'
  cacheLife('hours')
  cacheTag('blog')

  const data = (await fetchQuery(api.posts.getPosts)) ?? null

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((post, i) => (
        <Card className="pt-0" key={post._id}>
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              className="w-full object-cover rounded-t-lg"
              alt="post image"
              src={post.imageUrl ?? `https://picsum.photos/${400 + i}/300`}
              fill
            />
          </div>
          <CardContent>
            <Link className="text-lg font-medium" href={`blog/${post._id}`}>
              {post.title}
            </Link>
            <p className="text-muted-foreground line-clamp-2">{post.content}</p>
          </CardContent>
          <CardFooter>
            <Link className={buttonVariants({ className: 'w-full' })} href={`/blog/${post._id}`}>
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default BlogPage

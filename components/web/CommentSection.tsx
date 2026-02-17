'use client'

import { Card, CardContent, CardHeader } from '../ui/card'
import { LoaderCircle, MessageSquare } from 'lucide-react'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { commentSchema } from '@/app/schemas/comment'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useParams } from 'next/navigation'
import { Id } from '@/convex/_generated/dataModel'
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import z from 'zod'
import toast from 'react-hot-toast'
import { useTransition } from 'react'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

function CommentSection(props: { preloadedComments: Preloaded<typeof api.comments.getCommentsByPostId> }) {
  // ---
  const [isPending, startTransition] = useTransition()

  const params = useParams<{ postId: Id<'posts'> }>()

  const comments = usePreloadedQuery(props.preloadedComments)

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      postId: params.postId,
      text: '',
    },
  })

  const addComment = useMutation(api.comments.addComment)

  async function onSubmit(data: z.infer<typeof commentSchema>) {
    startTransition(async () => {
      try {
        await addComment(data)
        form.reset()
        toast.success('Comment added successfully')
      } catch {
        toast.error('Failed to add your comment')
      }
    })
  }

  if (comments === undefined) {
    return <div>loading...</div>
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2  border-b">
        <MessageSquare className="size-5" />
        <h3 className="text-xl font-bold">{comments.length} Comment</h3>
      </CardHeader>
      <CardContent>
        {/* Form */}
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="text"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Your Comment</FieldLabel>
                <Textarea aria-invalid={fieldState.invalid} placeholder="Share your thoughts" {...field} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Button disabled={isPending} className="cursor-pointer">
            {isPending ? <LoaderCircle className="animate-spin size-5" /> : 'Comment'}
          </Button>
        </form>

        {comments.length > 0 && <Separator className="my-8" />}

        {/* Comments */}
        <section className="space-y-6 mt-8">
          {comments.map(comment => {
            return (
              <div className="flex gap-4" key={comment._id}>
                <Avatar className="size-10 shrink-0">
                  <AvatarImage
                    src={`https://i.pravatar.cc/${300}?${comment.authorName}`}
                    alt={comment.authorName}
                  />
                  <AvatarFallback>{comment.authorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 ">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{comment.authorName}</span>
                    <p className="text-xs text-muted-foreground">
                      {new Date(comment._creationTime).toLocaleDateString('en-us')}
                    </p>
                  </div>
                  <p className="text-sm text-foreground/70 whitespace-pre-wrap leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              </div>
            )
          })}
        </section>
      </CardContent>
    </Card>
  )
}

export default CommentSection

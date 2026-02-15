'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema } from '../../schemas/blog'
import { Field, FieldError, FieldGroup, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { Textarea } from '../../../components/ui/textarea'
import z from 'zod'
import { createPostAction } from '../../actions'

function CreatePage() {
  // ---
  const [isPending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      image: undefined,
    },
  })

  function onSubmit({ title, content, image }: z.infer<typeof postSchema>) {
    startTransition(() => {
      createPostAction({ title, content, image })
    })
  }

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="page-title">Create Post</h1>
        <p className="text-xl text-muted-foreground">Share your thoughts with the big world</p>
      </div>
      <Card className="mx-auto max-w-xl w-full">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>create a new blog article</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-6">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input aria-invalid={fieldState.invalid} placeholder="Your article title" {...field} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea className="h-24" aria-invalid={fieldState.invalid} placeholder="" {...field} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Image</FieldLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        const file = e.target.files?.[0]
                        field.onChange(file)
                      }}
                      aria-invalid={fieldState.invalid}
                      placeholder=""
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Button disabled={isPending} className="cursor-pointer">
                {isPending ? <LoaderCircle className="animate-spin size-5" /> : 'Create Post'}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreatePage

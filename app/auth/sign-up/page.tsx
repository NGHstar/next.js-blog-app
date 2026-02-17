'use client'

import { Controller, useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '../../../components/ui/field'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema } from '../../schemas/auth'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { authClient } from '../../../lib/auth-client'
import z from 'zod'
import { LoaderCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import SelectSenpai from '@/components/web/SelectSenpai'

function Signup() {
  // ---
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  })

  function onSubmit({ email, name, password }: z.infer<typeof signUpSchema>) {
    startTransition(async () => {
      try {
        await authClient.signUp.email({
          email,
          name,
          password,
          fetchOptions: {
            onSuccess: () => {
              toast.success('Account created successfully')
              router.push('/')
            },
            onError: err => {
              toast.error(err.error.message)
            },
          },
        })
      } catch (error) {
        toast.error('Unexpected error, Check your internet connection')
        console.error('Signup error:', error)
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Become an Akatsuki</CardTitle>
        <CardDescription>Unite with the strongest shinobi to shape the world</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} placeholder="John Doe" {...field} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="johnDoe@gmail.com"
                    type="email"
                    {...field}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
                    type="password"
                    {...field}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <SelectSenpai />
            <Button disabled={isPending} className="cursor-pointer">
              {isPending ? <LoaderCircle className="animate-spin size-5" /> : 'Sign up'}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default Signup

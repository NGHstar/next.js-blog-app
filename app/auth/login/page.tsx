'use client'

import { Controller, useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '../../../components/ui/field'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../../schemas/auth'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { authClient } from '../../../lib/auth-client'
import z from 'zod'
import { useTransition } from 'react'
import { LoaderCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function Login() {
  // ---
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit({ email, password }: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      try {
        await authClient.signIn.email({
          email,
          password,
          fetchOptions: {
            onSuccess: () => {
              toast.success('Welcome')
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
        <CardTitle>Login</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
            <Button disabled={isPending} className="cursor-pointer">
              {isPending ? <LoaderCircle className="animate-spin size-5" /> : 'Login'}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default Login

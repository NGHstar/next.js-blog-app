import { getSession } from 'better-auth/api'
import { NextResponse } from 'next/server'

export function proxy(req: Request) {
  const session = getSession()

  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/create', '/bog/:postId*'],
}

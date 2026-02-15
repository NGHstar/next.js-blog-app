import { getSession } from 'better-auth/api'
import { redirect } from 'next/navigation'
import CreateForm from './CreateForm'

export const dynamic = 'force-dynamic'

async function page() {
  const session = getSession()

  if (!session) {
    redirect('/auth/login')
  }
  return <CreateForm />
}

export default page

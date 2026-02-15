import { getSession } from 'better-auth/api'
import { redirect } from 'next/navigation'
import CreateForm from './CreateForm'

async function page() {
  const session = await getSession()

  if (!session) {
    redirect('/auth/login')
  }
  return <CreateForm />
}

export default page

import { Suspense } from 'react'
import Navbar from '../../components/web/navbar'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense fallback={<div className="h-2"></div>}>
        <Navbar />
      </Suspense>
      {children}
    </>
  )
}

'use client'

import HeroSection from './components/HeroSection'
import MembersSection from './components/MembersSection'

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <HeroSection />
      <MembersSection />
    </main>
  )
}

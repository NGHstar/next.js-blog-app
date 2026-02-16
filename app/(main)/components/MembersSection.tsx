import MemberCard from '@/components/web/MemberCard'

function MembersSection() {
  return (
    <section
      className="relative mb-5 mt-4 py-8 rounded-2xl
       text-foreground flex flex-col justify-center items-center px-6 text-center"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">Akatsuki Team</h2>
      <p className="text-xl sm:text-2xl max-w-2xl mb-8 text-muted-foreground">
        The ultimate rogue ninja force revealed
      </p>
      <div className="flex flex-wrap gap-16 justify-center pt-5 sm:pt-12">
        <MemberCard imageUrl="/members/kounan.svg" name="Kounan" />
        <MemberCard imageUrl="/members/itachi.svg" name="Itachi" />
        <MemberCard imageUrl="/members/kisame.svg" name="Kisame" />
        <MemberCard imageUrl="/members/deidara.svg" name="Deidara" />
        <MemberCard imageUrl="/members/sasori.svg" name="Sasori" />
        <MemberCard imageUrl="/members/kakuza.svg" name="Kakuzu" />
        <MemberCard imageUrl="/members/hidan.svg" name="Hidan" />
        <MemberCard imageUrl="/members/pain.svg" name="Pain" />
        <MemberCard imageUrl="/members/orochimaru.svg" name="Orochimaru" />
        <MemberCard imageUrl="/members/tobi.svg" name="Tobi" />
      </div>
    </section>
  )
}

export default MembersSection

import Image from 'next/image'

type props = {
  name: string
  imageUrl: string
}

function MemberCard({ name, imageUrl }: props) {
  return (
    <div className="relative max-sm:w-full">
      <Image
        className="absolute z-20 -top-6 left-[64%] sm:left-[40%] sm:-top-8"
        src={imageUrl}
        alt={name}
        width={100}
        height={100}
      />

      <div className="absolute bg-foreground/20 rounded-full z-15 -top-6.5 left-[63.5%] sm:left-[39.5%] sm:-top-8.5 w-26 h-26"></div>
      <p className="absolute z-20 top-18 sm:top-20 sm:text-2xl text-3xl font-extrabold left-[8%] text-foreground/85">
        {name}
      </p>
      <div className="rounded-2xl dark:bg-[#0000002c] bg-[#00000010]  max-sm:w-full backdrop"></div>
      <div className="absolute w-12 h-12 rounded-tl-[20px] -z-10 rounded-br-[20px] dark:bg-primary bg-foreground -top-0.5 -left-0.5"></div>
      <div className="absolute w-12 h-12 rounded-tl-[20px] -z-10 rounded-br-[20px] dark:bg-primary bg-foreground -bottom-0.5 -right-0.5"></div>
    </div>
  )
}

export default MemberCard

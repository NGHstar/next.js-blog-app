'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

type Senpai = {
  name: string
  svgUrl: string
  soundUrl: string
}

function SelectSenpai() {
  const senpaies: Senpai[] = [
    {
      name: 'kounan',
      svgUrl: '/members/kounan.svg',
      soundUrl: '/members/sounds/kounan.mp3',
    },

    {
      name: 'itachi',
      svgUrl: '/members/itachi.svg',
      soundUrl: '/members/sounds/itachi.mp3',
    },
    {
      name: 'kisame',
      svgUrl: '/members/kisame.svg',
      soundUrl: '/members/sounds/kisame.mp3',
    },
    {
      name: 'deidara',
      svgUrl: '/members/deidara.svg',
      soundUrl: '/members/sounds/deidara.mp3',
    },
    {
      name: 'kakuzu',
      svgUrl: '/members/kakuza.svg',
      soundUrl: '/members/sounds/kakuzu.mp3',
    },
    {
      name: 'sasori',
      svgUrl: '/members/sasori.svg',
      soundUrl: '/members/sounds/sasori.mp3',
    },
    {
      name: 'hidan',
      svgUrl: '/members/hidan.svg',
      soundUrl: '/members/sounds/hidan.mp3',
    },
  ]

  const toolTipStyle = 'bg-black/20 text-white outline-1 outline-white/20 backdrop-blur-md translate-y-2'

  const [selectedSenpai, setSelectedSenpai] = useState('pain')

  function play(sound: string) {
    new Audio(sound).play()
  }

  return (
    <div>
      <div className="flex gap-3">
        <p className="mb-6 font-bold">Your Senpai</p>

        <Tooltip>
          <TooltipTrigger asChild>
            <span className="rounded-full bg-background flex items-center justify-center size-8 cursor-pointer -translate-y-1 font-bold text-xl">
              !
            </span>
          </TooltipTrigger>
          <TooltipContent side="bottom" className={toolTipStyle}>
            <p>This section is just a ui practice</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex flex-wrap gap-4">
        {senpaies.map(senpai => (
          <Tooltip key={senpai.name}>
            <TooltipTrigger asChild>
              <div
                className={`cursor-pointer rounded-full hover:outline-3 hover:scale-105 duration-300 transition hover:opacity-100 ${selectedSenpai === senpai.name ? 'opacity-100 outline-2 outline-foreground/80' : 'opacity-50'}`}
                onClick={() => {
                  setSelectedSenpai(senpai.name)
                  play(senpai.soundUrl)
                }}
              >
                <Image src={senpai.svgUrl} alt={senpai.name} width={64} height={64} />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className={toolTipStyle}>
              <p>{senpai.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

export default SelectSenpai

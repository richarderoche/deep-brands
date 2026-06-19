'use client'

import {createPlayer} from '@videojs/react'
import {HlsVideo} from '@videojs/react/media/hls-video'
import {
  backgroundFeatures,
  BackgroundVideoSkin,
} from '@videojs/react/background'
import type {CSSProperties} from 'react'

const Player = createPlayer({features: backgroundFeatures})

export function muxPlaybackHlsUrl(playbackId: string) {
  return `https://stream.mux.com/${playbackId}.m3u8`
}

export default function BackgroundVideoPlayer({
  src,
  className = 'h-full w-full object-cover',
  style,
  'data-sanity': dataSanity,
}: {
  src: string
  className?: string
  style?: CSSProperties
  'data-sanity'?: string
}) {
  return (
    <Player.Provider>
      <BackgroundVideoSkin className="h-full w-full">
        <HlsVideo
          src={src}
          muted
          autoPlay
          loop
          playsInline
          disableRemotePlayback
          disablePictureInPicture
          className={className}
          style={style}
          {...(dataSanity && {'data-sanity': dataSanity})}
        />
      </BackgroundVideoSkin>
    </Player.Provider>
  )
}

import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/utils/cn';

type ManagedVideoProps = {
  src: string;
  className?: string;
  /** Start playback when the frame is on screen. Muted until the user unmutes. */
  autoPlay?: boolean;
  loop?: boolean;
  label: string;
};

export default function ManagedVideo({
  src,
  className,
  autoPlay = false,
  loop = false,
  label,
}: ManagedVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ratio, setRatio] = useState<number | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !autoPlay) return;
    el.muted = true;
    void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [autoPlay, src]);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  return (
    <div
      className={cn('relative w-full overflow-hidden bg-[#0D0A0A]', className)}
      style={ratio ? { aspectRatio: String(ratio) } : { aspectRatio: '16 / 9' }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-contain"
        preload="metadata"
        playsInline
        loop={loop}
        muted={muted}
        onLoadedMetadata={(event) => {
          const el = event.currentTarget;
          if (el.videoWidth > 0 && el.videoHeight > 0) {
            setRatio(el.videoWidth / el.videoHeight);
          }
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={togglePlay}
      >
        <source src={src} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={togglePlay}
        className="absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#C9A96E]/60 bg-[#4A1020]/90 text-[#C9A96E] shadow-lg transition hover:bg-[#5C1529] sm:h-16 sm:w-16"
        aria-label={playing ? `Pause ${label}` : `Play ${label}`}
      >
        {playing ? (
          <Pause className="h-6 w-6 fill-current" strokeWidth={0} aria-hidden />
        ) : (
          <Play className="h-6 w-6 fill-current" strokeWidth={0} aria-hidden />
        )}
      </button>

      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A96E]/50 bg-[#1A1010]/85 text-[#F2EDE8] shadow-md transition hover:border-[#C9A96E] sm:bottom-4 sm:right-4"
        aria-label={muted ? `Unmute ${label}` : `Mute ${label}`}
      >
        {muted ? (
          <VolumeX className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        ) : (
          <Volume2 className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        )}
      </button>
    </div>
  );
}

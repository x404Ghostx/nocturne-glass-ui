import React, { useState, useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Disc,
  CloudRain,
  ChevronUp,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { MediaTrack } from '../../types/dashboard';

interface FocusMediaCarouselProps {
  tracks: MediaTrack[];
}

export const FocusMediaCarousel: React.FC<FocusMediaCarouselProps> = ({ tracks }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(38);
  const [isMuted, setIsMuted] = useState(false);
  const [ambientRainActive, setAmbientRainActive] = useState(false);

  // Embla carousel in vertical orientation (or horizontal fallback)
  const autoplayRef = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      axis: 'y',
      loop: true,
      skipSnaps: false,
    },
    [autoplayRef.current]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const currentTrack = tracks[selectedIndex] || tracks[0];

  // Simulated audio playback progression
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.duration) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  // Audio Synthesizer for genuine ambient noise (Rain & Pink Noise) using Web Audio API
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleAmbientSound = () => {
    if (ambientRainActive) {
      // stop
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.05);
      }
      setAmbientRainActive(false);
    } else {
      // start
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const bufferSize = audioCtxRef.current.sampleRate * 2;
        const noiseBuffer = audioCtxRef.current.createBuffer(1, bufferSize, audioCtxRef.current.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        // Generate soft pink noise (calming rain frequency)
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }

        const whiteNoise = audioCtxRef.current.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Bandpass filter for rain effect
        const filter = audioCtxRef.current.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 850;

        const gainNode = audioCtxRef.current.createGain();
        gainNode.gain.setValueAtTime(0.2, audioCtxRef.current.currentTime);
        gainNodeRef.current = gainNode;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtxRef.current.destination);

        whiteNoise.start(0);
        setAmbientRainActive(true);
        if (!isPlaying) setIsPlaying(true);
      } catch {
        // Fallback flag
        setAmbientRainActive(true);
        setIsPlaying(true);
      }
    }
  };

  const handleNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const handlePrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const formatSecs = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const progressPercent = (currentTime / currentTrack.duration) * 100;

  return (
    <div className="rounded-[24px] bg-[#12141A]/75 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.14)] p-4 flex flex-col justify-between h-full min-h-[310px] lg:min-h-[580px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Disc strokeWidth={1.75} className={`w-4 h-4 text-[#E85D68] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            <h2 className="text-[14px] font-medium tracking-[-0.01em] text-[#F3F4F6]">
              Focus Media
            </h2>
          </div>
          {/* Vertical Carousel Controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous track"
              className="p-1 rounded-full text-[#9CA3AF] hover:text-white bg-[#1E212B]/80 border border-white/[0.07] hover:border-white/[0.15] transition-all cursor-pointer"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next track"
              className="p-1 rounded-full text-[#9CA3AF] hover:text-white bg-[#1E212B]/80 border border-white/[0.07] hover:border-white/[0.15] transition-all cursor-pointer"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Embla Vertical Carousel Viewport */}
        <div className="overflow-hidden rounded-[20px] bg-[#08090C]/80 border border-white/[0.06] p-2.5 mb-3" ref={emblaRef}>
          <div className="flex flex-col h-[180px] lg:h-[220px]">
            {tracks.map((track, idx) => (
              <div
                key={track.id}
                className="flex-[0_0_100%] min-h-0 flex flex-col justify-center items-center text-center p-3 relative group"
              >
                {/* Artwork Card */}
                <div
                  className={`w-24 h-24 lg:w-28 lg:h-28 rounded-[20px] bg-gradient-to-br ${track.coverGradient} border border-white/[0.12] shadow-2xl flex items-center justify-center relative overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105`}
                >
                  <Disc className="w-12 h-12 text-white/30" strokeWidth={1} />
                  {/* Subtle vinyl groove reflections */}
                  <div className="absolute inset-0 rounded-full border border-white/[0.08] pointer-events-none" />
                  <div className="absolute inset-2 rounded-full border border-white/[0.05] pointer-events-none" />
                  
                  {/* Active equalizer pill overlay when playing */}
                  {isPlaying && selectedIndex === idx && (
                    <div className="absolute bottom-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-[#E85D68]/40 flex items-center gap-1">
                      <span className="w-1 bg-[#E85D68] rounded-full animate-eq-1 inline-block" />
                      <span className="w-1 bg-[#E85D68] rounded-full animate-eq-2 inline-block" />
                      <span className="w-1 bg-[#E85D68] rounded-full animate-eq-3 inline-block" />
                      <span className="w-1 bg-[#E85D68] rounded-full animate-eq-4 inline-block" />
                    </div>
                  )}
                </div>

                <h3 className="text-sm font-semibold text-[#F3F4F6] truncate max-w-[200px]">
                  {track.title}
                </h3>
                <p className="text-[11px] text-[#9CA3AF] truncate max-w-[180px]">
                  {track.artist} · {track.genre}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Slide Indicators */}
        <div className="flex justify-center items-center gap-1.5 mb-3">
          {tracks.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1 rounded-full transition-all duration-200 ${
                selectedIndex === i
                  ? 'w-5 bg-[#E85D68]'
                  : 'w-1.5 bg-white/[0.15] hover:bg-white/[0.3]'
              }`}
              aria-label={`Jump to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Audio Progress Scrubber (Coral Rose #E85D68) */}
        <div className="space-y-1 mb-3">
          <div
            className="relative h-1.5 bg-[#1A1D24] rounded-full overflow-hidden cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              setCurrentTime(Math.round(ratio * currentTrack.duration));
            }}
          >
            <div
              className="absolute inset-y-0 left-0 bg-[#E85D68] rounded-full shadow-[0_0_10px_rgba(232,93,104,0.45)] transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#6B7280] font-mono">
            <span>{formatSecs(currentTime)}</span>
            <span>{formatSecs(currentTrack.duration)}</span>
          </div>
        </div>

        {/* Playback Controls Bar */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous track"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="w-11 h-11 rounded-full bg-[#E85D68] text-white flex items-center justify-center shadow-[0_0_20px_rgba(232,93,104,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next track"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Ambient Synthesizer Generator Toggle */}
        <div className="pt-2">
          <button
            type="button"
            onClick={toggleAmbientSound}
            className={`w-full py-2 px-3 rounded-[14px] flex items-center justify-between transition-all duration-200 cursor-pointer ${
              ambientRainActive
                ? 'bg-[#E85D68]/15 border border-[#E85D68]/40 text-[#E85D68] shadow-[0_0_12px_rgba(232,93,104,0.2)]'
                : 'bg-[#1A1D24]/75 hover:bg-[#232732]/90 border border-white/[0.05] text-[#9CA3AF] hover:text-[#F3F4F6]'
            }`}
          >
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4" />
              <span className="text-xs font-medium">
                {ambientRainActive ? 'Rain Atmosphere Active' : 'Synthesize Rain Noise'}
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider">
              {ambientRainActive ? '850Hz' : 'OFF'}
            </span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 text-[11px] text-[#6B7280] flex justify-between border-t border-white/[0.04] mt-2">
        <span className="truncate">BPM: {currentTrack.bpm}</span>
        <button
          type="button"
          onClick={() => setIsMuted(!isMuted)}
          className="text-[#9CA3AF] hover:text-white flex items-center gap-1"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span>{isMuted ? 'Muted' : 'Audio On'}</span>
        </button>
      </div>
    </div>
  );
};

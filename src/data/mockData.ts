import { Bookmark, QuickApp, Task, MediaTrack, RecentTab, WeatherInfo } from '../types/dashboard';

export const INITIAL_BOOKMARKS: Bookmark[] = [
  {
    id: 'b1',
    title: 'Linear Issues & Cycles',
    url: 'https://linear.app',
    category: 'Productivity',
    icon: 'Layers',
    visits: 142,
  },
  {
    id: 'b2',
    title: 'GitHub Repositories',
    url: 'https://github.com',
    category: 'Dev',
    icon: 'Github',
    visits: 289,
  },
  {
    id: 'b3',
    title: 'Figma Design System',
    url: 'https://figma.com',
    category: 'Design',
    icon: 'Figma',
    visits: 95,
  },
  {
    id: 'b4',
    title: 'Hacker News Frontpage',
    url: 'https://news.ycombinator.com',
    category: 'Reading',
    icon: 'Terminal',
    visits: 64,
  },
];

export const INITIAL_QUICK_APPS: QuickApp[] = [
  { id: 'q1', name: 'GitHub', url: 'https://github.com', icon: 'Github', category: 'Dev', color: '#8B949E', shortcut: '1' },
  { id: 'q2', name: 'Figma', url: 'https://figma.com', icon: 'Palette', category: 'Design', color: '#F24E1E', shortcut: '2' },
  { id: 'q3', name: 'Linear', url: 'https://linear.app', icon: 'Compass', category: 'Work', color: '#5E6AD2', shortcut: '3' },
  { id: 'q4', name: 'Notion', url: 'https://notion.so', icon: 'FileText', category: 'Docs', color: '#E3E3E3', shortcut: '4' },
  { id: 'q5', name: 'Spotify', url: 'https://spotify.com', icon: 'Headphones', category: 'Audio', color: '#1DB954', shortcut: '5' },
  { id: 'q6', name: 'Vercel', url: 'https://vercel.com', icon: 'Triangle', category: 'Cloud', color: '#FFFFFF', shortcut: '6' },
  { id: 'q7', name: 'X / Twitter', url: 'https://x.com', icon: 'Radio', category: 'Social', color: '#1DA1F2', shortcut: '7' },
  { id: 'q8', name: 'Claude', url: 'https://claude.ai', icon: 'Sparkles', category: 'AI', color: '#D97706', shortcut: '8' },
];

export const INITIAL_TASKS: Task[] = [
  { id: 't1', text: 'Audit glass specular highlights & borders', completed: true, priority: 'high', tag: 'UI', createdAt: 'Today' },
  { id: 't2', text: 'Verify Embla vertical carousel gesture curves', completed: true, priority: 'high', tag: 'Core', createdAt: 'Today' },
  { id: 't3', text: 'Configure 4-segment progress bar state engine', completed: true, priority: 'medium', tag: 'Tokens', createdAt: 'Today' },
  { id: 't4', text: 'Ship Nocturne Glass v1.0 release bundle', completed: false, priority: 'high', tag: 'Deploy', createdAt: 'Tomorrow' },
];

export const FOCUS_TRACKS: MediaTrack[] = [
  {
    id: 'm1',
    title: 'Midnight Rain in Shinjuku',
    artist: 'Kurogane & Solace',
    album: 'Nocturne Cycles Vol. 2',
    duration: 184,
    coverGradient: 'from-[#1E293B] via-[#0F172A] to-[#E85D68]/30',
    bpm: 72,
    genre: 'Ambient Lofi',
  },
  {
    id: 'm2',
    title: 'Obsidian Reverie',
    artist: 'Ghostx & Aether',
    album: 'Glass OS Sessions',
    duration: 215,
    coverGradient: 'from-[#111827] via-[#1E1B4B] to-[#6384FF]/30',
    bpm: 65,
    genre: 'Downtempo Synth',
  },
  {
    id: 'm3',
    title: 'Crescent Moon Horizon',
    artist: 'Velvet Echoes',
    album: 'Zero Light Drift',
    duration: 168,
    coverGradient: 'from-[#18181B] via-[#27272A] to-[#E85D68]/20',
    bpm: 80,
    genre: 'Atmospheric Chill',
  },
  {
    id: 'm4',
    title: 'Cyberpunk Rooftop Solitude',
    artist: 'District 08',
    album: 'Dark Glass EP',
    duration: 242,
    coverGradient: 'from-[#0C0A09] via-[#1C1917] to-[#818CF8]/25',
    bpm: 88,
    genre: 'Analog Chillwave',
  },
];

export const INITIAL_RECENT_TABS: RecentTab[] = [
  {
    id: 'r1',
    title: 'Tailwind CSS v4 Documentation — Arbitrary Properties',
    url: 'https://tailwindcss.com/docs',
    domain: 'tailwindcss.com',
    timeAgo: '2m ago',
    iconName: 'Code',
  },
  {
    id: 'r2',
    title: 'Embla Carousel: Vertical Orientation & Autoplay API',
    url: 'https://embla-carousel.com',
    domain: 'embla-carousel.com',
    timeAgo: '14m ago',
    iconName: 'Layers',
  },
  {
    id: 'r3',
    title: 'Lucide Icons React 1.75px Stroke Spec Reference',
    url: 'https://lucide.dev',
    domain: 'lucide.dev',
    timeAgo: '38m ago',
    iconName: 'Shapes',
  },
  {
    id: 'r4',
    title: 'WCAG 2.2 AA Contrast Checker for Dark Surfaces',
    url: 'https://webaim.org',
    domain: 'webaim.org',
    timeAgo: '1h ago',
    iconName: 'ShieldCheck',
  },
];

export const QUOTES = [
  {
    quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },
  {
    quote: "Simplicity is about subtracting the obvious and adding the meaningful.",
    author: "John Maeda",
    source: "Laws of Simplicity"
  },
  {
    quote: "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.",
    author: "Antoine de Saint-Exupéry",
    source: "Terre des Hommes"
  },
  {
    quote: "The details are not the details. They make the design.",
    author: "Charles Eames",
    source: "Design Philosophy"
  },
  {
    quote: "We suffer more often in imagination than in reality.",
    author: "Seneca",
    source: "Letters from a Stoic"
  }
];

export const WALLPAPERS = [
  {
    id: 'wp-rain',
    name: 'Tokyo Midnight Rain',
    tone: 'Cyber Blue & Amber',
    gradient: 'radial-gradient(circle at 50% 20%, rgba(30, 41, 59, 0.45) 0%, rgba(15, 23, 42, 0.7) 50%, #08090C 90%)',
    bgStyle: 'from-[#0b0f19] via-[#08090c] to-[#040507]'
  },
  {
    id: 'wp-nebula',
    name: 'Obsidian Nebula',
    tone: 'Coral & Violet Dust',
    gradient: 'radial-gradient(circle at 75% 30%, rgba(232, 93, 104, 0.12) 0%, rgba(99, 132, 255, 0.1) 40%, #08090C 85%)',
    bgStyle: 'from-[#130d18] via-[#09090e] to-[#050507]'
  },
  {
    id: 'wp-mountain',
    name: 'Alpine Midnight Ridge',
    tone: 'Deep Moonlight Silver',
    gradient: 'radial-gradient(circle at 30% 10%, rgba(99, 132, 255, 0.18) 0%, rgba(18, 20, 26, 0.8) 60%, #08090C 100%)',
    bgStyle: 'from-[#0d131f] via-[#090b10] to-[#040506]'
  },
  {
    id: 'wp-minimal',
    name: 'Pure Obsidian Void',
    tone: 'Zero Light Monochrome',
    gradient: 'radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.03) 0%, rgba(18, 20, 26, 0.85) 60%, #08090C 100%)',
    bgStyle: 'from-[#08090c] via-[#07080a] to-[#030405]'
  }
];

export const INITIAL_WEATHER: WeatherInfo = {
  tempF: 68,
  tempC: 20,
  condition: 'Waxing Crescent · Clear',
  location: 'San Francisco, CA',
  high: 72,
  low: 54,
  humidity: 62,
  windMph: 8,
  moonPhase: 'Waxing Crescent',
  moonIllumination: '28%',
  hourly: [
    { time: '9 PM', temp: 68, icon: 'Moon' },
    { time: '10 PM', temp: 65, icon: 'Moon' },
    { time: '11 PM', temp: 63, icon: 'Moon' },
    { time: '12 AM', temp: 60, icon: 'CloudMoon' },
    { time: '1 AM', temp: 58, icon: 'CloudMoon' },
    { time: '2 AM', temp: 56, icon: 'Moon' },
  ]
};

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  category: 'Dev' | 'Design' | 'Productivity' | 'Reading';
  icon: string;
  visits: number;
}

export interface QuickApp {
  id: string;
  name: string;
  url: string;
  icon: string;
  category: string;
  color: string;
  shortcut: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  tag: string;
  createdAt: string;
}

export interface MediaTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  coverGradient: string;
  bpm: number;
  genre: string;
}

export interface RecentTab {
  id: string;
  title: string;
  url: string;
  domain: string;
  timeAgo: string;
  iconName: string;
}

export interface WeatherInfo {
  tempF: number;
  tempC: number;
  condition: string;
  location: string;
  high: number;
  low: number;
  humidity: number;
  windMph: number;
  moonPhase: string;
  moonIllumination: string;
  hourly: { time: string; temp: number; icon: string }[];
}

export interface DashboardSettings {
  userName: string;
  timeFormat24h: boolean;
  wallpaperId: string;
  glassOpacity: number;
  blurStrength: number;
  soundEffects: boolean;
  ambientRainPlaying: boolean;
}

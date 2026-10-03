export type Position = "GK" | "CB" | "LB" | "RB" | "LWB" | "RWB" | "CDM" | "CM" | "CAM" | "LM" | "RM" | "LW" | "RW" | "CF" | "ST";

export type FormationName = "4-3-3" | "4-2-3-1" | "3-5-2" | "4-4-2" | "3-4-3" | "5-3-2";

export interface Player {
  id: string;
  name: string;
  number: number;
  position: Position;
  photo?: string;
  nationality?: string;
  age?: number;
}

export interface Formation {
  name: FormationName;
  positions: { position: Position; x: number; y: number }[];
}

export interface TacticalSetup {
  id: string;
  name: string;
  formation: FormationName;
  players: { playerId: string; position: Position; x: number; y: number }[];
  homeTeam: boolean;
  matchId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type ContentPlatform = "YouTube" | "Instagram" | "TikTok" | "Shorts";

export type ContentType = "Tactical Analysis" | "Match Preview" | "Match Review" | "Player Profile" | "Transfer News" | "Press Conference" | "Vlog" | "Short Form";

export type ContentStatus = "Idea" | "Scripted" | "Filmed" | "Editing" | "Published";

export interface ContentItem {
  id: string;
  title: string;
  platform: ContentPlatform;
  type: ContentType;
  status: ContentStatus;
  priority: "Low" | "Medium" | "High";
  scheduledDate?: string;
  publishedDate?: string;
  thumbnail?: string;
  tags: string[];
  matchId?: string;
  description?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: "match" | "content" | "stream" | "training";
  platform?: ContentPlatform;
  date: string;
  time?: string;
  matchId?: string;
  contentId?: string;
  description?: string;
  color: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  competition: string;
  date: string;
  time: string;
  venue: string;
  status: "scheduled" | "live" | "finished" | "postponed";
  homeScore?: number;
  awayScore?: number;
  matchday?: number;
  season: string;
  round?: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  crest: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface PlayerRating {
  playerId: string;
  playerName: string;
  number: number;
  position: Position;
  rating: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  keyPasses: number;
  tackles: number;
  interceptions: number;
  duelsWon: number;
}

export interface MatchDetail extends Match {
  homeFormation: FormationName;
  awayFormation: FormationName;
  homeLineup: { playerId: string; position: Position }[];
  awayLineup: { playerId: string; position: Position }[];
  homeRatings: PlayerRating[];
  awayRatings: PlayerRating[];
  tacticalNotes: string;
  events: MatchEvent[];
}

export interface MatchEvent {
  id: string;
  minute: number;
  type: "goal" | "assist" | "yellow_card" | "red_card" | "substitution" | "var";
  playerId: string;
  playerName: string;
  teamId: string;
  description: string;
}

export interface AnalyticsData {
  views: number;
  watchTimeHours: number;
  subscribers: number;
  engagementRate: number;
  recentVideos: VideoPerformance[];
  viewsOverTime: { date: string; views: number }[];
  platformBreakdown: { platform: ContentPlatform; views: number; percentage: number }[];
  topContent: VideoPerformance[];
}

export interface VideoPerformance {
  id: string;
  title: string;
  platform: ContentPlatform;
  views: number;
  watchTimeHours: number;
  engagementRate: number;
  publishedDate: string;
  thumbnail: string;
}

export interface Creator {
  id: string;
  slug: string;
  name: string;
  handle: string;
  bio: string;
  avatar: string;
  coverImage: string;
  primaryTeam: Team;
  socialLinks: {
    youtube?: string;
    instagram?: string;
    tiktok?: string;
    twitter?: string;
    website?: string;
  };
  stats: {
    subscribers: number;
    totalViews: number;
    videosCount: number;
  };
}

export interface TacticalAnalysis {
  id: string;
  slug: string;
  title: string;
  matchId: string;
  creatorId: string;
  date: string;
  formation: FormationName;
  tacticalBoardId: string;
  explanation: string;
  keyObservations: string[];
  playerNotes: { playerId: string; note: string }[];
  published: boolean;
}

export interface FanPrediction {
  id: string;
  matchId: string;
  creatorId: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
  totalVotes: number;
  closesAt: string;
}

export interface StreamOverlay {
  id: string;
  name: string;
  type: "scorebug" | "poll" | "tactics" | "lineup" | "stats";
  enabled: boolean;
  config: Record<string, unknown>;
}

export interface StreamState {
  status: "offline" | "starting" | "live" | "ending";
  currentMatchId?: string;
  title: string;
  startedAt?: string;
  viewers: number;
  overlays: StreamOverlay[];
}
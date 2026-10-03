import { StreamState, StreamOverlay } from "./types";

export const streamOverlays: StreamOverlay[] = [
  {
    id: "overlay-scorebug",
    name: "Score Bug",
    type: "scorebug",
    enabled: true,
    config: {
      position: "top-center",
      showTimer: true,
      showScore: true,
      showCompetition: true,
      homeTeam: "MIL",
      awayTeam: "INT",
      homeScore: 0,
      awayScore: 0,
      minute: 0,
    },
  },
  {
    id: "overlay-poll",
    name: "Live Poll",
    type: "poll",
    enabled: true,
    config: {
      position: "bottom-right",
      question: "Who will win the Derby?",
      options: [
        { id: "1", text: "AC Milan", votes: 1247 },
        { id: "2", text: "Draw", votes: 523 },
        { id: "3", text: "Inter Milan", votes: 892 },
      ],
      allowMultiple: false,
      showResults: true,
    },
  },
  {
    id: "overlay-tactics",
    name: "Tactics Overlay",
    type: "tactics",
    enabled: false,
    config: {
      position: "bottom-left",
      formation: "4-2-3-1",
      showPlayerNames: true,
      showArrows: true,
      opacity: 0.85,
    },
  },
  {
    id: "overlay-lineup",
    name: "Starting XI",
    type: "lineup",
    enabled: true,
    config: {
      position: "left",
      homeFormation: "4-2-3-1",
      awayFormation: "3-5-2",
      showNumbers: true,
      showPositions: true,
      compact: false,
    },
  },
  {
    id: "overlay-stats",
    name: "Live Stats",
    type: "stats",
    enabled: false,
    config: {
      position: "right",
      metrics: ["possession", "shots", "xG", "passes"],
      updateInterval: 30,
    },
  },
];

export const streamState: StreamState = {
  status: "offline",
  title: "Derby della Madonnina - Live Tactical Analysis",
  viewers: 0,
  overlays: streamOverlays,
};

export const getStreamState = (): StreamState => streamState;

export const updateOverlayConfig = (overlayId: string, config: Record<string, unknown>): StreamOverlay | undefined => {
  const overlay = streamOverlays.find((o) => o.id === overlayId);
  if (overlay) {
    overlay.config = { ...overlay.config, ...config };
    return overlay;
  }
  return undefined;
};

export const toggleOverlay = (overlayId: string): StreamOverlay | undefined => {
  const overlay = streamOverlays.find((o) => o.id === overlayId);
  if (overlay) {
    overlay.enabled = !overlay.enabled;
    return overlay;
  }
  return undefined;
};
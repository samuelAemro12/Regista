import { CalendarEvent, ContentPlatform } from "./types";
import { matches } from "./matches";
import { contentItems } from "./content";

export const calendarEvents: CalendarEvent[] = [
  // Matches
  ...matches
    .filter((m) => m.status === "scheduled")
    .map((m) => ({
      id: `event-match-${m.id}`,
      title: `${m.homeTeam.shortName} vs ${m.awayTeam.shortName}`,
      type: "match" as const,
      date: m.date,
      time: m.time,
      matchId: m.id,
      description: `${m.competition} - ${m.venue}`,
      color: "#FB090B",
    })),
  ...matches
    .filter((m) => m.status === "finished")
    .map((m) => ({
      id: `event-match-${m.id}`,
      title: `${m.homeTeam.shortName} ${m.homeScore}-${m.awayScore} ${m.awayTeam.shortName}`,
      type: "match" as const,
      date: m.date,
      time: m.time,
      matchId: m.id,
      description: `${m.competition} - ${m.venue}`,
      color: "#22c55e",
    })),
  // Content
  ...contentItems
    .filter((c) => c.scheduledDate)
    .map((c) => ({
      id: `event-content-${c.id}`,
      title: c.title,
      type: "content" as const,
      platform: c.platform,
      date: c.scheduledDate!.split("T")[0],
      time: c.scheduledDate!.split("T")[1]?.slice(0, 5),
      contentId: c.id,
      description: `${c.platform} - ${c.type}`,
      color: getPlatformColor(c.platform),
    })),
  // Streams
  {
    id: "event-stream-1",
    title: "Pre-Match Live: Milan vs Inter",
    type: "stream",
    date: "2025-09-21",
    time: "19:30",
    description: "Live tactical preview with chat",
    color: "#8b5cf6",
  },
  {
    id: "event-stream-2",
    title: "Post-Match Reaction: Milan vs Juventus",
    type: "stream",
    date: "2025-09-28",
    time: "20:00",
    description: "Live analysis and fan Q&A",
    color: "#8b5cf6",
  },
  {
    id: "event-stream-3",
    title: "UCL Preview: Liverpool vs Milan",
    type: "stream",
    date: "2025-09-16",
    time: "18:00",
    description: "Champions League tactical preview",
    color: "#8b5cf6",
  },
];

function getPlatformColor(platform: ContentPlatform): string {
  switch (platform) {
    case "YouTube":
      return "#FF0000";
    case "Instagram":
      return "#E4405F";
    case "TikTok":
      return "#000000";
    case "Shorts":
      return "#FF0000";
    default:
      return "#6366f1";
  }
}

export const getEventsForMonth = (year: number, month: number): CalendarEvent[] => {
  return calendarEvents.filter((e) => {
    const eventDate = new Date(e.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });
};

export const getUpcomingEvents = (limit = 10): CalendarEvent[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return calendarEvents
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
};

export const getEventsByType = (type: CalendarEvent["type"]): CalendarEvent[] => {
  return calendarEvents.filter((e) => e.type === type);
};

export const getEventsByDate = (date: string): CalendarEvent[] => {
  return calendarEvents.filter((e) => e.date === date);
};
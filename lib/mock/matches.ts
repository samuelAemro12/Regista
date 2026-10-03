import { Match, Team } from "./types";
import { teams } from "./creator";

export const matches: Match[] = [
  {
    id: "match-1",
    homeTeam: teams.find((t) => t.id === "team-milan")!,
    awayTeam: teams.find((t) => t.id === "team-inter")!,
    competition: "Serie A",
    date: "2025-09-21",
    time: "20:45",
    venue: "San Siro",
    status: "scheduled",
    matchday: 5,
    season: "2025-26",
    round: "Matchday 5",
  },
  {
    id: "match-2",
    homeTeam: teams.find((t) => t.id === "team-juventus")!,
    awayTeam: teams.find((t) => t.id === "team-milan")!,
    competition: "Serie A",
    date: "2025-09-28",
    time: "18:00",
    venue: "Allianz Stadium",
    status: "scheduled",
    matchday: 6,
    season: "2025-26",
    round: "Matchday 6",
  },
  {
    id: "match-3",
    homeTeam: teams.find((t) => t.id === "team-milan")!,
    awayTeam: teams.find((t) => t.id === "team-napoli")!,
    competition: "Serie A",
    date: "2025-10-05",
    time: "20:45",
    venue: "San Siro",
    status: "scheduled",
    matchday: 7,
    season: "2025-26",
    round: "Matchday 7",
  },
  {
    id: "match-4",
    homeTeam: teams.find((t) => t.id === "team-liverpool")! || {
      id: "team-liverpool",
      name: "Liverpool",
      shortName: "LIV",
      crest: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
      primaryColor: "#C8102E",
      secondaryColor: "#00B2A9",
    },
    awayTeam: teams.find((t) => t.id === "team-milan")!,
    competition: "UEFA Champions League",
    date: "2025-09-17",
    time: "21:00",
    venue: "Anfield",
    status: "scheduled",
    matchday: 1,
    season: "2025-26",
    round: "Matchday 1",
  },
  {
    id: "match-5",
    homeTeam: teams.find((t) => t.id === "team-milan")!,
    awayTeam: teams.find((t) => t.id === "team-roma")!,
    competition: "Serie A",
    date: "2025-09-01",
    time: "20:45",
    venue: "San Siro",
    status: "finished",
    homeScore: 2,
    awayScore: 1,
    matchday: 3,
    season: "2025-26",
    round: "Matchday 3",
  },
  {
    id: "match-6",
    homeTeam: teams.find((t) => t.id === "team-atalanta")!,
    awayTeam: teams.find((t) => t.id === "team-milan")!,
    competition: "Serie A",
    date: "2025-08-24",
    time: "20:45",
    venue: "Gewiss Stadium",
    status: "finished",
    homeScore: 1,
    awayScore: 2,
    matchday: 2,
    season: "2025-26",
    round: "Matchday 2",
  },
  {
    id: "match-7",
    homeTeam: teams.find((t) => t.id === "team-milan")!,
    awayTeam: teams.find((t) => t.id === "team-fiorentina")!,
    competition: "Serie A",
    date: "2025-08-17",
    time: "18:30",
    venue: "San Siro",
    status: "finished",
    homeScore: 2,
    awayScore: 2,
    matchday: 1,
    season: "2025-26",
    round: "Matchday 1",
  },
  {
    id: "match-8",
    homeTeam: teams.find((t) => t.id === "team-lazio")!,
    awayTeam: teams.find((t) => t.id === "team-milan")!,
    competition: "Serie A",
    date: "2025-10-19",
    time: "20:45",
    venue: "Stadio Olimpico",
    status: "scheduled",
    matchday: 8,
    season: "2025-26",
    round: "Matchday 8",
  },
  {
    id: "match-9",
    homeTeam: teams.find((t) => t.id === "team-milan")!,
    awayTeam: teams.find((t) => t.id === "team-udinese")! || {
      id: "team-udinese",
      name: "Udinese",
      shortName: "UDI",
      crest: "https://upload.wikimedia.org/wikipedia/it/5/54/Udinese_Calcio_Logo_2024.svg",
      primaryColor: "#000000",
      secondaryColor: "#FFFFFF",
    },
    competition: "Serie A",
    date: "2025-10-26",
    time: "15:00",
    venue: "San Siro",
    status: "scheduled",
    matchday: 9,
    season: "2025-26",
    round: "Matchday 9",
  },
  {
    id: "match-10",
    homeTeam: teams.find((t) => t.id === "team-milan")!,
    awayTeam: teams.find((t) => t.id === "team-bologna")! || {
      id: "team-bologna",
      name: "Bologna",
      shortName: "BOL",
      crest: "https://upload.wikimedia.org/wikipedia/it/0/0c/Bologna_FC_1909_Logo_2018.svg",
      primaryColor: "#0033A0",
      secondaryColor: "#FFD700",
    },
    competition: "Serie A",
    date: "2025-11-02",
    time: "20:45",
    venue: "San Siro",
    status: "scheduled",
    matchday: 10,
    season: "2025-26",
    round: "Matchday 10",
  },
];

export const getUpcomingMatches = (): Match[] => {
  return matches
    .filter((m) => m.status === "scheduled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getRecentMatches = (limit = 5): Match[] => {
  return matches
    .filter((m) => m.status === "finished")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getMatchById = (id: string): Match | undefined => {
  return matches.find((m) => m.id === id);
};

export const getNextMatch = (): Match | undefined => {
  const upcoming = getUpcomingMatches();
  return upcoming[0];
};

export const getLastResult = (): Match | undefined => {
  const recent = getRecentMatches(1);
  return recent[0];
};
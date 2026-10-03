"use client";

import { useState } from "react";
import { matches, getUpcomingMatches, getRecentMatches, Match } from "@/lib/mock/matches";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

const statusConfig = {
  scheduled: { label: "Scheduled", color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
  live: { label: "Live", color: "bg-red-100 text-red-700", dot: "bg-red-500" },
  finished: { label: "Finished", color: "bg-green-100 text-green-700", dot: "bg-green-500" },
  postponed: { label: "Postponed", color: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
};

export function MatchesCenter() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "recent">("all");
  const upcomingMatches = getUpcomingMatches();
  const recentMatches = getRecentMatches(10);

  const filteredMatches = filter === "upcoming" ? upcomingMatches : filter === "recent" ? recentMatches : matches;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-pitch-700">Matches</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Match Center</h1>
        <p className="mt-1 text-slate-500">Upcoming fixtures, recent results, and match analysis.</p>
      </div>

      {/* Filter Tabs */}
      <Card variant="outlined" padding="sm">
        <CardContent className="flex items-center gap-2">
          {[
            { id: "all", label: "All Matches" },
            { id: "upcoming", label: "Upcoming" },
            { id: "recent", label: "Recent Results" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={filter === tab.id ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilter(tab.id as typeof filter)}
            >
              {tab.label}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Matches List */}
      <div className="space-y-4">
        {filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}

function MatchCard({ match }: { match: Match }) {
  const config = statusConfig[match.status];
  const isFinished = match.status === "finished";

  return (
    <Card variant="outlined" padding="md" className={isFinished ? "opacity-80" : ""}>
      <CardContent className="py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Competition & Status */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Badge variant="outline" className={config.color}>
              {config.label}
            </Badge>
            <span className="text-sm text-slate-500">{match.competition}</span>
            {match.round && <span className="text-sm text-slate-400">{match.round}</span>}
          </div>

          {/* Teams & Score */}
          <div className="flex-1 flex items-center justify-center gap-4 min-w-0">
            {/* Home Team */}
            <div className="flex items-center gap-3 text-right min-w-[140px]">
              <Avatar src={match.homeTeam.crest} alt={match.homeTeam.name} size="md" />
              <div className="text-right">
                <p className="font-semibold text-slate-950">{match.homeTeam.shortName}</p>
                <p className="text-xs text-slate-500">{match.homeTeam.name}</p>
              </div>
            </div>

            {/* Score / VS */}
            <div className="flex flex-col items-center gap-1 min-w-[80px]">
              {isFinished && match.homeScore !== undefined && match.awayScore !== undefined ? (
                <div className="flex items-center gap-3 text-2xl font-bold text-slate-950">
                  <span>{match.homeScore}</span>
                  <span className="text-slate-400">–</span>
                  <span>{match.awayScore}</span>
                </div>
              ) : (
                <span className="text-lg font-medium text-slate-400">vs</span>
              )}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{match.time}</span>
              </div>
            </div>

            {/* Away Team */}
            <div className="flex items-center gap-3 min-w-[140px]">
              <div className="text-left">
                <p className="font-semibold text-slate-950">{match.awayTeam.shortName}</p>
                <p className="text-xs text-slate-500">{match.awayTeam.name}</p>
              </div>
              <Avatar src={match.awayTeam.crest} alt={match.awayTeam.name} size="md" />
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 flex-shrink-0 text-right min-w-[140px]">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-950">
                {new Date(match.date).toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: "short" })}
              </p>
              <p className="text-xs text-slate-500">{match.venue}</p>
            </div>
          </div>
        </div>

        {/* Additional Info for Finished Matches */}
        {isFinished && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
            <span>Matchday {match.matchday} • {match.season}</span>
            <span>Full Time</span>
          </div>
        )}

        {!isFinished && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
            <span>Matchday {match.matchday} • {match.season}</span>
            <span>{match.venue}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
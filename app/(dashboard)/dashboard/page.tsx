import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { creator, teams } from "@/lib/mock/creator";
import { getNextMatch, getLastResult, getUpcomingMatches } from "@/lib/mock/matches";
import { contentItems, getContentByStatus } from "@/lib/mock/content";
import { calendarEvents, getUpcomingEvents } from "@/lib/mock/calendar";
import { analyticsData } from "@/lib/mock/analytics";

export default function DashboardPage() {
  const nextMatch = getNextMatch();
  const lastResult = getLastResult();
  const upcomingMatches = getUpcomingMatches().slice(0, 3);
  const upcomingEvents = getUpcomingEvents(5);
  const publishedContent = getContentByStatus("Published").slice(0, 3);
  const inProgressContent = contentItems.filter(c => c.status !== "Published" && c.status !== "Idea").slice(0, 3);
  const ideasCount = getContentByStatus("Idea").length;
  const scriptedCount = getContentByStatus("Scripted").length;
  const filmingCount = getContentByStatus("Filmed").length;
  const editingCount = getContentByStatus("Editing").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-pitch-700">Workspace</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-slate-500">Welcome back. Here's what's happening with AC Milan Analysis.</p>
      </div>

      {/* Current Club / Workspace */}
      <Card variant="outlined" padding="md">
        <CardHeader>
          <CardTitle>Current Workspace</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar src={creator.primaryTeam.crest} alt={creator.primaryTeam.name} size="xl" />
            <div>
              <h2 className="text-xl font-bold text-slate-950">{creator.primaryTeam.name}</h2>
              <p className="text-sm text-slate-500">{creator.name} • {creator.handle}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="info">{creator.primaryTeam.shortName}</Badge>
                <Badge variant="outline">Serie A</Badge>
                <Badge variant="outline">UCL</Badge>
                <Badge variant="outline">Coppa Italia</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Matches & Next Match */}
        <div className="lg:col-span-2 space-y-6">
          {/* Next Match */}
          {nextMatch && (
            <Card variant="elevated" padding="md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Next Match</CardTitle>
                  <Badge variant="info">{nextMatch.competition}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <p className="font-semibold text-slate-950">{nextMatch.homeTeam.shortName}</p>
                    <p className="text-sm text-slate-500">{nextMatch.homeTeam.name}</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 px-6">
                    <div className="flex items-center gap-3 text-2xl font-bold text-slate-950">
                      <span>vs</span>
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">
                      {new Date(nextMatch.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    </div>
                    <div className="text-sm text-slate-500">{nextMatch.time} • {nextMatch.venue}</div>
                    <Badge variant="outline" className="mt-1">{nextMatch.round}</Badge>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-slate-950">{nextMatch.awayTeam.shortName}</p>
                    <p className="text-sm text-slate-500">{nextMatch.awayTeam.name}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Link href={`/matches`}>
                    <Button variant="outline" size="sm">View All Matches</Button>
                  </Link>
                </div>
              </CardContent></Card>
          )}

          {/* Recent Result */}
          {lastResult && (
            <Card variant="outlined" padding="md">
              <CardHeader>
                <CardTitle>Recent Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <p className="font-semibold text-slate-950">{lastResult.homeTeam.shortName}</p>
                    <p className="text-sm text-slate-500">{lastResult.homeTeam.name}</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 px-6">
                    <div className="flex items-center gap-3 text-2xl font-bold text-slate-950">
                      <span className="text-pitch-600">{lastResult.homeScore}</span>
                      <span>–</span>
                      <span>{lastResult.awayScore}</span>
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">
                      {new Date(lastResult.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    </div>
                    <div className="text-sm text-slate-500">{lastResult.competition} • {lastResult.venue}</div>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-slate-950">{lastResult.awayTeam.shortName}</p>
                    <p className="text-sm text-slate-500">{lastResult.awayTeam.name}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Link href={`/matches`}>
                    <Button variant="ghost" size="sm">View Match Center</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upcoming Matches */}
          <Card variant="outlined" padding="md">
            <CardHeader>
              <CardTitle>Upcoming Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingMatches.map((match) => (
                  <Link key={match.id} href={`/matches`} className="block">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <Avatar src={match.homeTeam.crest} alt={match.homeTeam.name} size="sm" />
                        <div>
                          <p className="font-medium text-slate-950">{match.homeTeam.shortName} vs {match.awayTeam.shortName}</p>
                          <p className="text-xs text-slate-500">{match.competition} • {match.round}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-950">
                          {new Date(match.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                        <p className="text-xs text-slate-500">{match.time}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Content Pipeline & Quick Actions */}
        <div className="space-y-6">
          {/* Content Pipeline Summary */}
          <Card variant="outlined" padding="md">
            <CardHeader>
              <CardTitle>Content Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Ideas</span>
                  <Badge variant="outline">{ideasCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Scripted</span>
                  <Badge variant="info">{scriptedCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Filmed</span>
                  <Badge variant="warning">{filmingCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Editing</span>
                  <Badge variant="danger">{editingCount}</Badge>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-sm font-medium text-slate-950">Published</span>
                  <Badge variant="success">{publishedContent.length}</Badge>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <Link href="/content-pipeline">
                  <Button variant="outline" size="sm" className="w-full">Open Pipeline</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Content */}
          <Card variant="outlined" padding="md">
            <CardHeader>
              <CardTitle>Upcoming Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {inProgressContent.map((content) => (
                  <Link key={content.id} href="/content-pipeline" className="block">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <Badge variant="outline" className="mt-0.5 flex-shrink-0">{content.platform}</Badge>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-950 truncate">{content.title}</p>
                        <p className="text-xs text-slate-500">{content.type} • {content.status}</p>
                        {content.scheduledDate && (
                          <p className="text-xs text-slate-400 mt-1">
                            Scheduled: {new Date(content.scheduledDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Link href="/content-pipeline">
                  <Button variant="ghost" size="sm" className="w-full">View All Content</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card variant="outlined" padding="md">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link href="/tactics-board">
                  <Button variant="primary" className="w-full justify-start gap-3">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="2" />
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                    </svg>
                    New Tactic
                  </Button>
                </Link>
                <Link href="/content-pipeline">
                  <Button variant="secondary" className="w-full justify-start gap-3">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                    </svg>
                    New Content
                  </Button>
                </Link>
                <Link href="/calendar">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                    </svg>
                    Schedule Content
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  Create Prediction
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Snapshot */}
      <Card variant="outlined" padding="md">
        <CardHeader>
          <CardTitle>Analytics Snapshot (Last 28 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-slate-500">Total Views</p>
              <p className="mt-1 text-3xl font-bold text-slate-950">{analyticsData.views.toLocaleString()}</p>
              <p className="mt-1 text-sm text-green-600">+12.4% vs prev period</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Watch Time</p>
              <p className="mt-1 text-3xl font-bold text-slate-950">{analyticsData.watchTimeHours.toLocaleString()}h</p>
              <p className="mt-1 text-sm text-green-600">+8.7% vs prev period</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Subscribers</p>
              <p className="mt-1 text-3xl font-bold text-slate-950">{analyticsData.subscribers.toLocaleString()}</p>
              <p className="mt-1 text-sm text-green-600">+3.2% vs prev period</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Engagement Rate</p>
              <p className="mt-1 text-3xl font-bold text-slate-950">{analyticsData.engagementRate}%</p>
              <p className="mt-1 text-sm text-red-600">-0.3% vs prev period</p>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Link href="/analytics">
              <Button variant="outline">View Full Analytics</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card variant="outlined" padding="md">
        <CardHeader>
          <CardTitle>Upcoming Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: event.color }} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-950 truncate">{event.title}</p>
                  <p className="text-sm text-slate-500">
                    {event.type === "match" && "Match"}
                    {event.type === "content" && `Content (${event.platform})`}
                    {event.type === "stream" && "Live Stream"}
                    • {new Date(event.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    {event.time && ` at ${event.time}`}
                  </p>
                </div>
                <Badge variant="outline" className="flex-shrink-0">
                  {event.type === "match" && "Match"}
                  {event.type === "content" && event.platform}
                  {event.type === "stream" && "Stream"}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Link href="/calendar">
              <Button variant="ghost" size="sm">View Full Calendar</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
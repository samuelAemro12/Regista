"use client";

import { useState, useMemo } from "react";
import { calendarEvents, getEventsForMonth, getUpcomingEvents, CalendarEvent } from "@/lib/mock/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "list">("month");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const eventsForMonth = useMemo(() => getEventsForMonth(year, month), [year, month]);
  const upcomingEvents = useMemo(() => getUpcomingEvents(10), []);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return eventsForMonth.filter((e) => e.date === dateStr);
  };

  const getEventIcon = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "match": return "⚽";
      case "content": return "📹";
      case "stream": return "🔴";
      default: return "📅";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-pitch-700">Schedule</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="mt-1 text-slate-500">View and manage your content schedule and match days.</p>
      </div>

      {/* Toolbar */}
      <Card variant="outlined" padding="sm">
        <CardContent className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={prevMonth}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <h2 className="text-xl font-semibold text-slate-950 min-w-[180px] text-center">
              {monthNames[month]} {year}
            </h2>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            <Button variant="ghost" size="sm" onClick={goToToday} className="ml-2">
              Today
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={view === "month" ? "primary" : "outline"}
              size="sm"
              onClick={() => setView("month")}
            >
              Month
            </Button>
            <Button
              variant={view === "list" ? "primary" : "outline"}
              size="sm"
              onClick={() => setView("list")}
            >
              List
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      {view === "month" && (
        <Card variant="outlined" padding="none">
          <CardContent className="p-0">
            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
              {dayNames.map((day) => (
                <div key={day} className="px-2 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7">
              {/* Previous month days */}
              {Array.from({ length: firstDayOfMonth }, (_, i) => {
                const day = new Date(year, month, 0).getDate() - firstDayOfMonth + 1 + i;
                const date = new Date(year, month - 1, day);
                const events = getEventsForDay(day);
                return (
                  <DayCell
                    key={`prev-${day}`}
                    day={day}
                    date={date}
                    events={events}
                    isCurrentMonth={false}
                  />
                );
              })}

              {/* Current month days */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const date = new Date(year, month, day);
                const events = getEventsForDay(day);
                const isToday = date.toDateString() === new Date().toDateString();
                return (
                  <DayCell
                    key={`curr-${day}`}
                    day={day}
                    date={date}
                    events={events}
                    isCurrentMonth={true}
                    isToday={isToday}
                  />
                );
              })}

              {/* Next month days */}
              {Array.from({ length: 42 - firstDayOfMonth - daysInMonth }, (_, i) => {
                const day = i + 1;
                const date = new Date(year, month + 1, day);
                const events = getEventsForDay(day);
                return (
                  <DayCell
                    key={`next-${day}`}
                    day={day}
                    date={date}
                    events={events}
                    isCurrentMonth={false}
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* List View */}
      {view === "list" && (
        <Card variant="outlined" padding="none">
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: event.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-950 truncate">{event.title}</p>
                    <p className="text-sm text-slate-500">
                      {event.type === "match" && "⚽ Match"}
                      {event.type === "content" && `📹 Content (${event.platform})`}
                      {event.type === "stream" && "🔴 Live Stream"}
                      {event.type === "training" && "🏋️ Training"}
                      • {new Date(event.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                      {event.time && ` at ${event.time}`}
                    </p>
                  </div>
                  <Badge variant="outline" className="flex-shrink-0">
                    {event.type === "match" && "Match"}
                    {event.type === "content" && event.platform}
                    {event.type === "stream" && "Stream"}
                    {event.type === "training" && "Training"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <Card variant="outlined" padding="md">
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-slate-700">Event Types:</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FB090B" }} />
              <span className="text-sm text-slate-600">Matches</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FF0000" }} />
              <span className="text-sm text-slate-600">YouTube/Shorts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#E4405F" }} />
              <span className="text-sm text-slate-600">Instagram</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#000000" }} />
              <span className="text-sm text-slate-600">TikTok</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#8b5cf6" }} />
              <span className="text-sm text-slate-600">Streams</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DayCell({
  day,
  date,
  events,
  isCurrentMonth,
  isToday = false,
}: {
  day: number;
  date: Date;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
  isToday?: boolean;
}) {
  return (
    <div
      className={`
        min-h-[100px] p-2 border-r border-b border-slate-100
        ${!isCurrentMonth ? "bg-slate-50/50 text-slate-400" : "bg-white"}
        ${isToday ? "bg-pitch-50 border-pitch-200" : ""}
      `}
    >
      <div className="flex items-center justify-between mb-1">
        <span className={`text-sm font-medium ${isToday ? "text-pitch-700" : "text-slate-950"}`}>
          {day}
        </span>
        {events.length > 0 && (
          <Badge variant="outline" className="text-[10px]">{events.length}</Badge>
        )}
      </div>
      <div className="space-y-1">
        {events.slice(0, 3).map((event) => (
          <div
            key={event.id}
            className="text-[11px] truncate px-1.5 py-0.5 rounded"
            style={{ backgroundColor: event.color + "20", color: event.color }}
          >
            {getEventIcon(event.type)} {event.title}
          </div>
        ))}
        {events.length > 3 && (
          <div className="text-[11px] text-slate-400 truncate">+{events.length - 3} more</div>
        )}
      </div>
    </div>
  );
}
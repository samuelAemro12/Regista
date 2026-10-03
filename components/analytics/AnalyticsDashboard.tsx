"use client";

import { useState } from "react";
import { analyticsData, mockMetricChanges, VideoPerformance } from "@/lib/mock/analytics";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const platformColors: Record<string, string> = {
  YouTube: "#FF0000",
  Shorts: "#FF0000",
  Instagram: "#E4405F",
  TikTok: "#000000",
};

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<"7d" | "28d" | "90d">("28d");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-pitch-700">Analytics</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">YouTube Analytics</h1>
          <p className="mt-1 text-slate-500">Channel performance overview (mock data)</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as "7d" | "28d" | "90d")}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pitch-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="28d">Last 28 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Views"
          value={analyticsData.views.toLocaleString()}
          change={mockMetricChanges.views}
          icon={<ViewsIcon />}
        />
        <MetricCard
          title="Watch Time"
          value={`${(analyticsData.watchTimeHours / 1000).toFixed(1)}k hrs`}
          change={mockMetricChanges.watchTime}
          icon={<WatchTimeIcon />}
        />
        <MetricCard
          title="Subscribers"
          value={analyticsData.subscribers.toLocaleString()}
          change={mockMetricChanges.subscribers}
          icon={<SubscribersIcon />}
        />
        <MetricCard
          title="Engagement Rate"
          value={`${analyticsData.engagementRate}%`}
          change={mockMetricChanges.engagement}
          icon={<EngagementIcon />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Views Over Time */}
        <Card variant="outlined" padding="md">
          <CardHeader>
            <CardTitle>Views Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ViewsChart data={analyticsData.viewsOverTime} />
          </CardContent>
        </Card>

        {/* Platform Breakdown */}
        <Card variant="outlined" padding="md">
          <CardHeader>
            <CardTitle>Platform Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <PlatformBreakdown data={analyticsData.platformBreakdown} />
          </CardContent>
        </Card>
      </div>

      {/* Top Content & Recent Videos */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Performing Content */}
        <Card variant="outlined" padding="md">
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
          </CardHeader>
          <CardContent>
            <TopContentList videos={analyticsData.topContent} />
          </CardContent>
        </Card>

        {/* Recent Videos */}
        <Card variant="outlined" padding="md">
          <CardHeader>
            <CardTitle>Recent Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentVideosList videos={analyticsData.recentVideos} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: { value: number; positive: boolean };
  icon: React.ReactNode;
}) {
  return (
    <Card variant="outlined" padding="md">
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="mt-1 text-3xl font-bold text-slate-950">{value}</p>
          </div>
          <div className="p-2 rounded-lg bg-slate-100 text-slate-600">{Icon}</div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Badge
            variant={change.positive ? "success" : "danger"}
            className="text-xs"
          >
            {change.positive ? "+" : ""}{change.value}% vs prev period
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function ViewsChart({ data }: { data: { date: string; views: number }[] }) {
  const maxViews = Math.max(...data.map((d) => d.views));
  const width = "100%";
  const height = 200;

  return (
    <div className="relative h-[200px]">
      <svg width={width} height={height} viewBox={`0 0 ${data.length * 30} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FB090B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FB090B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area */}
        <path
          d={getAreaPath(data, maxViews, height)}
          fill="url(#viewsGradient)"
        />
        {/* Line */}
        <path
          d={getLinePath(data, maxViews, height)}
          stroke="#FB090B"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Points */}
        {data.map((point, i) => (
          <circle
            key={i}
            cx={i * 30 + 15}
            cy={height - (point.views / maxViews) * (height - 40) - 20}
            r="4"
            fill="#FB090B"
            stroke="#ffffff"
            strokeWidth="2"
          />
        ))}
      </svg>
      {/* X-axis labels */}
      <div className="flex justify-between mt-2 text-xs text-slate-500">
        {data.filter((_, i) => i % 3 === 0).map((point) => (
          <span key={point.date}>{new Date(point.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        ))}
      </div>
    </div>
  );
}

function getLinePath(data: { date: string; views: number }[], maxViews: number, height: number) {
  return data
    .map((point, i) => {
      const x = i * 30 + 15;
      const y = height - (point.views / maxViews) * (height - 40) - 20;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function getAreaPath(data: { date: string; views: number }[], maxViews: number, height: number) {
  const linePath = getLinePath(data, maxViews, height);
  const firstX = 15;
  const lastX = (data.length - 1) * 30 + 15;
  return `${linePath} L${lastX} ${height - 20} L${firstX} ${height - 20} Z`;
}

function PlatformBreakdown({ data }: { data: { platform: string; views: number; percentage: number }[] }) {
  const totalViews = data.reduce((sum, d) => sum + d.views, 0);

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.platform} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: platformColors[item.platform] }} />
              <span className="font-medium text-slate-950">{item.platform}</span>
            </div>
            <span className="text-slate-500">{item.views.toLocaleString()} ({item.percentage}%)</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${item.percentage}%`, backgroundColor: platformColors[item.platform] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TopContentList({ videos }: { videos: VideoPerformance[] }) {
  return (
    <div className="space-y-4">
      {videos.map((video, index) => (
        <div key={video.id} className="flex items-start gap-3">
          <span className="text-lg font-bold text-slate-300 flex-shrink-0 mt-1">#{index + 1}</span>
          <div className="relative w-20 h-11 flex-shrink-0 rounded bg-slate-100 overflow-hidden">
            <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-slate-950 truncate">{video.title}</p>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
              <Badge variant="outline" className="text-[10px]">{video.platform}</Badge>
              <span>{video.views.toLocaleString()} views</span>
              <span>•</span>
              <span>{video.engagementRate}% engagement</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RecentVideosList({ videos }: { videos: VideoPerformance[] }) {
  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <div key={video.id} className="flex items-start gap-3">
          <div className="relative w-24 h-13 flex-shrink-0 rounded bg-slate-100 overflow-hidden">
            <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-slate-950 truncate">{video.title}</p>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
              <Badge variant="outline" className="text-[10px]">{video.platform}</Badge>
              <span>{new Date(video.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            </div>
            <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
              <span>{video.views.toLocaleString()} views</span>
              <span>{video.watchTimeHours.toLocaleString()}h watch</span>
              <span>{video.engagementRate}% engagement</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Icons
function ViewsIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function WatchTimeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function SubscribersIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function EngagementIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}
"use client";

import { useState } from "react";
import { contentItems, getContentByStatus, contentColumns, platforms, ContentItem, ContentStatus, ContentPlatform } from "@/lib/mock/content";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dropdown, DropdownItem, DropdownDivider, DropdownLabel } from "@/components/ui/Dropdown";
import { Avatar } from "@/components/ui/Avatar";

const platformColors: Record<ContentPlatform, string> = {
  YouTube: "#FF0000",
  Instagram: "#E4405F",
  TikTok: "#000000",
  Shorts: "#FF0000",
};

const statusColors: Record<ContentStatus, string> = {
  Idea: "bg-slate-100 text-slate-700",
  Scripted: "bg-blue-100 text-blue-700",
  Filmed: "bg-amber-100 text-amber-700",
  Editing: "bg-purple-100 text-purple-700",
  Published: "bg-green-100 text-green-700",
};

const priorityColors = {
  Low: "bg-slate-100 text-slate-700",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-red-100 text-red-700",
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export function ContentPipeline() {
  const [filterPlatform, setFilterPlatform] = useState<ContentPlatform | "All">("All");
  const [filterStatus, setFilterStatus] = useState<ContentStatus | "All">("All");
  const [editingCard, setEditingCard] = useState<ContentItem | null>(null);

  const filteredContent = contentItems.filter((item) => {
    const platformMatch = filterPlatform === "All" || item.platform === filterPlatform;
    const statusMatch = filterStatus === "All" || item.status === filterStatus;
    return platformMatch && statusMatch;
  });

  const getContentForColumn = (status: ContentStatus) => {
    return filteredContent.filter((item) => item.status === status);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-pitch-700">Content</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Content Pipeline</h1>
        <p className="mt-1 text-slate-500">Manage your content workflow from idea to publication.</p>
      </div>

      {/* Filters */}
      <Card variant="outlined" padding="sm">
        <CardContent className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">Platform</label>
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value as ContentPlatform | "All")}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pitch-500"
            >
              <option value="All">All Platforms</option>
              {platforms.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
            <label className="text-sm font-medium text-slate-700">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ContentStatus | "All")}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pitch-500"
            >
              <option value="All">All Statuses</option>
              {contentColumns.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="primary" size="sm">+ New Content</Button>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {contentColumns.map((column) => {
          const items = getContentForColumn(column.id);
          return (
            <div
              key={column.id}
              className="flex-shrink-0 w-80 max-h-[700px] flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[column.id]}`}>
                    {column.label}
                  </span>
                  <Badge variant="outline" className="text-xs">{items.length}</Badge>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 min-h-[200px] bg-slate-50/50 rounded-xl p-2">
                {items.map((item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    onEdit={() => setEditingCard(item)}
                  />
                ))}
                {items.length === 0 && (
                  <div className="h-20 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-sm">
                    No content
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ContentCard({ item, onEdit }: { item: ContentItem; onEdit: () => void }) {
  return (
    <Card variant="elevated" padding="sm" className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onEdit}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-xs" style={{ borderColor: platformColors[item.platform], color: platformColors[item.platform] }}>
              {item.platform}
            </Badge>
            <Badge variant="outline" className="text-xs">{item.type}</Badge>
          </div>
          <h4 className="font-semibold text-slate-950 truncate">{item.title}</h4>
          <p className="text-xs text-slate-500 mt-1">{item.status} • {formatDate(item.scheduledDate)}</p>
          {item.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {item.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600">
                  {tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-400">
                  +{item.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
        <Dropdown align="right">
          <Dropdown.trigger>
            <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </Dropdown.trigger>
          <Dropdown.content>
            <DropdownItem onClick={onEdit}>Edit</DropdownItem>
            <DropdownItem>Duplicate</DropdownItem>
            <DropdownDivider />
            <DropdownLabel>Move to</DropdownLabel>
            {contentColumns.map((col) =>
              col.id !== item.status && (
                <DropdownItem key={col.id} onClick={() => { /* move logic */ }}>
                  {col.label}
                </DropdownItem>
              )
            )}
            <DropdownDivider />
            <DropdownItem destructive>Delete</DropdownItem>
          </Dropdown.content>
        </Dropdown>
      </div>
      {item.thumbnail && (
        <div className="mt-2 rounded-lg overflow-hidden aspect-video bg-slate-100">
          <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="mt-2 flex items-center justify-between">
        <Badge variant="outline" className={priorityColors[item.priority]}>
          {item.priority}
        </Badge>
        {item.matchId && (
          <span className="text-xs text-slate-400">Match linked</span>
        )}
      </div>
    </Card>
  );
}
"use client";

import { useState } from "react";
import { streamState, streamOverlays, StreamOverlay, updateOverlayConfig, toggleOverlay } from "@/lib/mock/stream";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Dropdown, DropdownItem, DropdownDivider, DropdownLabel } from "@/components/ui/Dropdown";

export function StreamWorkspace() {
  const [status, setStatus] = useState(streamState.status);
  const [overlays, setOverlays] = useState(streamOverlays);
  const [viewers, setViewers] = useState(streamState.viewers);
  const [streamTitle, setStreamTitle] = useState(streamState.title);

  const handleToggleOverlay = (overlayId: string) => {
    const updated = toggleOverlay(overlayId);
    if (updated) {
      setOverlays([...overlays]);
    }
  };

  const handleOverlayConfigChange = (overlayId: string, config: Record<string, unknown>) => {
    const updated = updateOverlayConfig(overlayId, config);
    if (updated) {
      setOverlays(overlays.map(o => o.id === overlayId ? updated : o));
    }
  };

  const handleGoLive = () => {
    setStatus("starting");
    setTimeout(() => {
      setStatus("live");
      setViewers(Math.floor(Math.random() * 500) + 100);
      const interval = setInterval(() => {
        setViewers(v => v + Math.floor(Math.random() * 10) - 2);
      }, 3000);
      return () => clearInterval(interval);
    }, 2000);
  };

  const handleEndStream = () => {
    setStatus("ending");
    setTimeout(() => {
      setStatus("offline");
      setViewers(0);
    }, 1000);
  };

  const statusConfig = {
    offline: { label: "Offline", color: "bg-slate-100 text-slate-700", dot: "bg-slate-400" },
    starting: { label: "Starting...", color: "bg-amber-100 text-amber-700", dot: "bg-amber-500 animate-pulse" },
    live: { label: "LIVE", color: "bg-red-100 text-red-700", dot: "bg-red-500 animate-pulse" },
    ending: { label: "Ending...", color: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  };

  const currentConfig = statusConfig[status];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-pitch-700">Stream</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Stream Workspace</h1>
          <p className="mt-1 text-slate-500">Control room for live streams. OBS handles video; Regista manages overlays & data.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className={currentConfig.color}>
            <span className={`relative flex items-center gap-1.5 ${currentConfig.dot}`}>
              <span className="w-1.5 h-1.5 rounded-full" />
              {currentConfig.label}
            </span>
          </Badge>
          {status === "offline" && (
            <Button variant="primary" size="lg" onClick={handleGoLive} className="gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Go Live
            </Button>
          )}
          {status === "live" && (
            <Button variant="danger" size="lg" onClick={handleEndStream} className="gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
              End Stream
            </Button>
          )}
          {(status === "starting" || status === "ending") && (
            <Button variant="outline" size="lg" disabled>Please wait...</Button>
          )}
        </div>
      </div>

      {/* Stream Info */}
      <Card variant="outlined" padding="md">
        <CardContent className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-slate-700">Stream Title</label>
            <input
              type="text"
              value={streamTitle}
              onChange={(e) => setStreamTitle(e.target.value)}
              className="flex-1 min-w-[300px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pitch-500"
            />
          </div>
          <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
            <label className="text-sm font-medium text-slate-700">Viewers</label>
            <span className="text-2xl font-bold text-slate-950 tabular-nums">{viewers.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
            <label className="text-sm font-medium text-slate-700">Duration</label>
            <span className="text-xl font-mono text-slate-950" id="stream-timer">00:00:00</span>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Left: Preview & Overlays */}
        <div className="space-y-6">
          {/* Stream Preview */}
          <Card variant="outlined" padding="none">
            <CardHeader className="px-6 py-4 border-b border-slate-200">
              <CardTitle>Stream Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                {/* OBS Video Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                  <div className="text-center text-slate-400">
                    <svg className="mx-auto mb-4 h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    <p className="text-lg font-medium">OBS Video Feed</p>
                    <p className="text-sm mt-1">Connect OBS to see live preview here</p>
                  </div>
                </div>

                {/* Overlay Previews */}
                {overlays.filter(o => o.enabled).map((overlay) => (
                  <OverlayPreview key={overlay.id} overlay={overlay} />
                ))}

                {/* Status indicators */}
                {status === "live" && (
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="relative flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-sm font-medium">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      LIVE
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/50 text-white text-sm font-mono" id="stream-timer-display">00:00:00</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Overlay Controls */}
          <Card variant="outlined" padding="md">
            <CardHeader>
              <CardTitle>Overlay Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {overlays.map((overlay) => (
                  <OverlayControl
                    key={overlay.id}
                    overlay={overlay}
                    onToggle={() => handleToggleOverlay(overlay.id)}
                    onConfigChange={(config) => handleOverlayConfigChange(overlay.id, config)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Match Info & Chat */}
        <div className="space-y-6">
          {/* Current Match */}
          <Card variant="outlined" padding="md">
            <CardHeader>
              <CardTitle>Current Match</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg" alt="AC Milan" className="w-10 h-10" />
                    <div>
                      <p className="font-semibold text-slate-950">AC Milan</p>
                      <p className="text-sm text-slate-500">Home</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-950 tabular-nums">0 - 0</p>
                    <p className="text-xs text-slate-500">0'</p>
                  </div>
                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <p className="font-semibold text-slate-950">Inter Milan</p>
                      <p className="text-sm text-slate-500">Away</p>
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg" alt="Inter Milan" className="w-10 h-10" />
                  </div>
                </div>
                <div className="text-sm text-slate-500 text-center">
                  Serie A • Matchday 5 • San Siro
                </div>
              </div>
            </CardContent>
          </Card>

          {/* YouTube Chat Placeholder */}
          <Card variant="outlined" padding="md">
            <CardHeader>
              <CardTitle>YouTube Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <svg className="mx-auto mb-2 h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                  </svg>
                  <p className="font-medium">Chat Disconnected</p>
                  <p className="text-sm mt-1">Connect YouTube Live Chat to see messages here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card variant="outlined" padding="md">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                <Button variant="outline" className="w-full justify-start">Create Poll</Button>
                <Button variant="outline" className="w-full justify-start">Update Score</Button>
                <Button variant="outline" className="w-full justify-start">Show Tactics</Button>
                <Button variant="outline" className="w-full justify-start">Switch Scene</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function OverlayPreview({ overlay }: { overlay: StreamOverlay }) {
  const positions = {
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "left": "left-4 top-1/2 -translate-y-1/2",
    "right": "right-4 top-1/2 -translate-y-1/2",
  };

  return (
    <div className={`absolute ${positions[overlay.config.position as keyof typeof positions] || "top-4 left-4"} pointer-events-none`}>
      {overlay.type === "scorebug" && (
        <div className="flex items-center gap-4 px-4 py-2 rounded-full bg-black/80 backdrop-blur text-white text-sm font-medium">
          <span className="font-bold">{overlay.config.homeTeam}</span>
          <span className="text-2xl tabular-nums">{overlay.config.homeScore} - {overlay.config.awayScore}</span>
          <span className="font-bold">{overlay.config.awayTeam}</span>
          {overlay.config.showTimer && <span className="font-mono">{overlay.config.minute}'</span>}
        </div>
      )}
      {overlay.type === "poll" && (
        <div className="w-64 bg-black/80 backdrop-blur rounded-xl p-4 text-white">
          <p className="font-semibold mb-2">{overlay.config.question}</p>
          <div className="space-y-2">
            {(overlay.config.options as { id: string; text: string; votes: number }[]).map((opt) => (
              <div key={opt.id} className="flex items-center gap-2 text-sm">
                <span className="flex-1 text-left">{opt.text}</span>
                <span className="font-mono tabular-nums">{opt.votes}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {overlay.type === "tactics" && (
        <div className="w-48 h-32 bg-black/60 backdrop-blur rounded-lg border border-white/20 flex items-center justify-center text-white/50 text-xs">
          Tactics Overlay
        </div>
      )}
      {overlay.type === "lineup" && (
        <div className="w-56 bg-black/80 backdrop-blur rounded-xl p-3 text-white text-sm">
          <p className="font-semibold mb-2">Starting XI</p>
          <div className="grid grid-cols-4 gap-1 text-xs">
            {["GK", "CB", "CB", "RB", "LB", "CDM", "CM", "CAM", "LW", "ST", "RW"].map((pos, i) => (
              <div key={i} className="px-2 py-1 bg-white/10 rounded text-center">{pos}</div>
            ))}
          </div>
        </div>
      )}
      {overlay.type === "stats" && (
        <div className="w-48 bg-black/80 backdrop-blur rounded-xl p-3 text-white text-sm">
          <p className="font-semibold mb-2">Live Stats</p>
          <div className="space-y-1">
            {(overlay.config.metrics as string[]).map((m) => (
              <div key={m} className="flex justify-between">
                <span>{m}</span>
                <span className="font-mono">--</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OverlayControl({
  overlay,
  onToggle,
  onConfigChange,
}: {
  overlay: StreamOverlay;
  onToggle: () => void;
  onConfigChange: (config: Record<string, unknown>) => void;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={overlay.enabled}
          onChange={onToggle}
          className="w-4 h-4 rounded border-slate-300 text-pitch-600 focus:ring-pitch-500"
        />
        <div>
          <p className="font-medium text-slate-950 capitalize">{overlay.type}</p>
          <p className="text-sm text-slate-500">{overlay.name}</p>
        </div>
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
          <DropdownItem onClick={() => onConfigChange({ position: "top-center" })}>Top Center</DropdownItem>
          <DropdownItem onClick={() => onConfigChange({ position: "bottom-right" })}>Bottom Right</DropdownItem>
          <DropdownItem onClick={() => onConfigChange({ position: "bottom-left" })}>Bottom Left</DropdownItem>
          <DropdownItem onClick={() => onConfigChange({ position: "left" })}>Left</DropdownItem>
          <DropdownItem onClick={() => onConfigChange({ position: "right" })}>Right</DropdownItem>
          <DropdownDivider />
          <DropdownItem destructive>Remove Overlay</DropdownItem>
        </Dropdown.content>
      </Dropdown>
    </div>
  );
}
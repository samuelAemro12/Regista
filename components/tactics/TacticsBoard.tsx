"use client";

import { useState, useCallback } from "react";
import { formations, getFormation, getDefaultPositions, formationOptions, FormationName } from "@/lib/mock/tactics";
import { players, getPlayerById, Player } from "@/lib/mock/players";
import { Position } from "@/lib/mock/types";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

interface PlayerOnPitch {
  playerId: string;
  position: Position;
  x: number;
  y: number;
}

const initialFormation: FormationName = "4-2-3-1";
const defaultPositions = getDefaultPositions(initialFormation);

const initialPlayersOnPitch: PlayerOnPitch[] = [
  { playerId: "player-maignan", position: "GK", x: 50, y: 92 },
  { playerId: "player-calabria", position: "RB", x: 90, y: 68 },
  { playerId: "player-tomori", position: "CB", x: 75, y: 72 },
  { playerId: "player-gabbia", position: "CB", x: 25, y: 72 },
  { playerId: "player-hernandez", position: "LB", x: 10, y: 68 },
  { playerId: "player-fofana", position: "CDM", x: 35, y: 55 },
  { playerId: "player-reijnders", position: "CDM", x: 65, y: 55 },
  { playerId: "player-pulisic", position: "RM", x: 85, y: 40 },
  { playerId: "player-loftus-cheek", position: "CAM", x: 50, y: 40 },
  { playerId: "player-leao", position: "LM", x: 15, y: 40 },
  { playerId: "player-morata", position: "ST", x: 50, y: 18 },
];

const benchPlayers = [
  "player-sportiello",
  "player-emerson",
  "player-terracciano",
  "player-thiaw",
  "player-pavlovic",
  "player-bennacer",
  "player-mussah",
  "player-chukwueze",
  "player-okuonghae",
  "player-jovic",
  "player-abraham",
];

export function TacticsBoard() {
  const [formation, setFormation] = useState<FormationName>(initialFormation);
  const [homeTeam, setHomeTeam] = useState(true);
  const [playersOnPitch, setPlayersOnPitch] = useState<PlayerOnPitch[]>(initialPlayersOnPitch);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [draggingPlayerId, setDraggingPlayerId] = useState<string | null>(null);

  const formationData = getFormation(formation);

  const handleFormationChange = useCallback((newFormation: FormationName) => {
    setFormation(newFormation);
    const newPositions = getDefaultPositions(newFormation);
    const newPlayersOnPitch = newPositions.map((pos, index) => {
      const existingPlayer = playersOnPitch[index];
      if (existingPlayer) {
        return { ...existingPlayer, position: pos.position, x: pos.x, y: pos.y };
      }
      return { playerId: "", position: pos.position, x: pos.x, y: pos.y };
    });
    setPlayersOnPitch(newPlayersOnPitch);
  }, [playersOnPitch]);

  const handleDragStart = (e: React.MouseEvent, playerId: string) => {
    e.preventDefault();
    setDraggingPlayerId(playerId);
    setSelectedPlayerId(playerId);
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (!draggingPlayerId) return;
    const pitch = e.currentTarget.closest(".pitch-container") as HTMLElement;
    if (!pitch) return;

    const rect = pitch.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPlayersOnPitch((prev) =>
      prev.map((p) =>
        p.playerId === draggingPlayerId ? { ...p, x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)) } : p
      )
    );
  };

  const handleDragEnd = () => {
    setDraggingPlayerId(null);
  };

  const getPositionName = (position: Position) => {
    const names: Record<Position, string> = {
      GK: "GK",
      CB: "CB",
      LB: "LB",
      RB: "RB",
      LWB: "LWB",
      RWB: "RWB",
      CDM: "CDM",
      CM: "CM",
      CAM: "CAM",
      LM: "LM",
      RM: "RM",
      LW: "LW",
      RW: "RW",
      CF: "CF",
      ST: "ST",
    };
    return names[position];
  };

  const getPlayer = (playerId: string) => getPlayerById(playerId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-pitch-700">Analysis</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Tactics Board</h1>
        <p className="mt-1 text-slate-500">Set up formations, analyze tactics, and prepare match analysis.</p>
      </div>

      {/* Toolbar */}
      <Card variant="outlined" padding="md">
        <CardContent className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">Formation</label>
            <Select
              value={formation}
              onValueChange={handleFormationChange}
              options={formationOptions.map((f) => ({ value: f.value, label: f.label }))}
              className="w-40"
            />
          </div>
          <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
            <label className="text-sm font-medium text-slate-700">Side</label>
            <div className="flex items-center gap-2">
              <Button
                variant={homeTeam ? "primary" : "outline"}
                size="sm"
                onClick={() => setHomeTeam(true)}
              >
                Home
              </Button>
              <Button
                variant={!homeTeam ? "primary" : "outline"}
                size="sm"
                onClick={() => setHomeTeam(false)}
              >
                Away
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
            <Button variant="outline" size="sm" onClick={() => setPlayersOnPitch(initialPlayersOnPitch)}>
              Reset Positions
            </Button>
            <Button variant="outline" size="sm">
              Clear All
            </Button>
            <Button variant="primary" size="sm">
              Save Formation
            </Button>
            <Button variant="secondary" size="sm">
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Pitch Area */}
        <div className="relative pitch-container">
          <svg
            className="w-full h-[600px] bg-pitch-950"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
            onMouseMove={handleDrag}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            <defs>
              <pattern id="grassPattern" patternUnits="userSpaceOnUse" width="4" height="4">
                <rect width="4" height="4" fill="#0d4d1a" />
                <rect x="2" y="2" width="2" height="2" fill="#15803d" />
              </pattern>
            </defs>

            {/* Pitch Background */}
            <rect width="100" height="100" fill="url(#grassPattern)" />

            {/* Pitch Lines */}
            <g stroke="#ffffff33" strokeWidth="0.5">
              {/* Outer boundary */}
              <rect x="2" y="2" width="96" height="96" fill="none" stroke="#ffffff66" strokeWidth="1" rx="2" />
              {/* Halfway line */}
              <line x1="50" y1="2" x2="50" y2="98" />
              {/* Center circle */}
              <circle cx="50" cy="50" r="15" fill="none" />
              {/* Center spot */}
              <circle cx="50" cy="50" r="0.5" fill="#ffffff66" />
              {/* Penalty areas */}
              <rect x="2" y="18" width="20" height="64" fill="none" />
              <rect x="78" y="18" width="20" height="64" fill="none" />
              {/* Goal areas */}
              <rect x="2" y="37" width="8" height="26" fill="none" />
              <rect x="90" y="37" width="8" height="26" fill="none" />
              {/* Penalty spots */}
              <circle cx="11" cy="50" r="0.5" fill="#ffffff66" />
              <circle cx="89" cy="50" r="0.5" fill="#ffffff66" />
              {/* Penalty arcs */}
              <path d="M31 50 a10 10 0 0 1 0 -20" fill="none" />
              <path d="M69 50 a10 10 0 0 0 0 -20" fill="none" />
              <path d="M31 50 a10 10 0 0 0 0 20" fill="none" />
              <path d="M69 50 a10 10 0 0 1 0 20" fill="none" />
              {/* Corner arcs */}
              <path d="M2 2 a2 2 0 0 1 2 2" fill="none" />
              <path d="M98 2 a2 2 0 0 0 -2 2" fill="none" />
              <path d="M2 98 a2 2 0 0 0 2 -2" fill="none" />
              <path d="M98 98 a2 2 0 0 1 -2 -2" fill="none" />
            </g>

            {/* Formation Position Guides */}
            <g stroke="#ffffff15" strokeWidth="0.5" fill="none">
              {formationData.positions.map((pos) => (
                <circle key={`${pos.position}-${pos.x}-${pos.y}`} cx={pos.x} cy={pos.y} r="3" />
              ))}
            </g>

            {/* Players on Pitch */}
            {playersOnPitch.map((p) => {
              const player = getPlayer(p.playerId);
              const isSelected = selectedPlayerId === p.playerId;
              const isDragging = draggingPlayerId === p.playerId;

              if (!player) {
                return (
                  <circle
                    key={`empty-${p.position}-${p.x}-${p.y}`}
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill="#ffffff22"
                    stroke="#ffffff44"
                    strokeWidth="1"
                    className="cursor-pointer"
                    onMouseDown={(e) => handleDragStart(e, `empty-${p.position}`)}
                  />
                );
              }

              return (
                <g
                  key={p.playerId}
                  transform={`translate(${p.x}, ${p.y})`}
                  className="cursor-move"
                  onMouseDown={(e) => handleDragStart(e, p.playerId)}
                >
                  {/* Player Circle */}
                  <circle
                    r="8"
                    fill={homeTeam ? "#FB090B" : "#02A8E0"}
                    stroke="#ffffff"
                    strokeWidth={isSelected || isDragging ? 3 : 1.5}
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                  />
                  {/* Player Number */}
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="5"
                    fontWeight="bold"
                    fontFamily="system-ui, sans-serif"
                    pointerEvents="none"
                  >
                    {player.number}
                  </text>
                  {/* Selection indicator */}
                  {isSelected && (
                    <circle r="12" fill="none" stroke="#FB090B" strokeWidth="2" strokeDasharray="4 4" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Selected Player */}
          {selectedPlayerId && (
            <Card variant="outlined" padding="md">
              <CardContent>
                <p className="text-sm font-medium text-slate-500">Selected Player</p>
                {(() => {
                  const player = getPlayer(selectedPlayerId);
                  if (!player) return <p className="text-slate-500">Position marker</p>;
                  return (
                    <div className="mt-2 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-600">
                        {player.number}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-950">{player.name}</p>
                        <p className="text-sm text-slate-500">#{player.number} • {getPositionName(player.position)}</p>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          {/* Player Panel */}
          <Card variant="outlined" padding="md">
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-slate-950">Squad</p>
                <Badge variant="outline">{playersOnPitch.filter(p => p.playerId).length}/11</Badge>
              </div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {playersOnPitch.map((p, index) => {
                  const player = getPlayer(p.playerId);
                  if (!player) {
                    return (
                      <div
                        key={`empty-${index}`}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-dashed border-slate-200"
                      >
                        <span className="text-sm text-slate-400">{getPositionName(p.position)}</span>
                        <Badge variant="outline" className="text-xs">Empty</Badge>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={player.id}
                      className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        selectedPlayerId === player.id ? "bg-pitch-50 border border-pitch-200" : "hover:bg-slate-50"
                      }`}
                      onClick={() => setSelectedPlayerId(player.id)}
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600 flex-shrink-0">
                        {player.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-950 truncate">{player.name}</p>
                        <p className="text-xs text-slate-500">#{player.number} • {getPositionName(player.position)}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">{getPositionName(p.position)}</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Bench */}
          <Card variant="outlined" padding="md">
            <CardContent>
              <p className="font-semibold text-slate-950 mb-3">Bench</p>
              <div className="grid gap-2 grid-cols-3">
                {benchPlayers.map((id) => {
                  const player = getPlayer(id);
                  if (!player) return null;
                  return (
                    <div
                      key={player.id}
                      className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors text-center cursor-pointer"
                      onClick={() => {
                        // Could implement swap logic here
                        setSelectedPlayerId(player.id);
                      }}
                    >
                      <div className="w-7 h-7 rounded-full bg-slate-200 mx-auto mb-1 flex items-center justify-center text-xs font-bold text-slate-500">
                        {player.number}
                      </div>
                      <p className="text-xs font-medium text-slate-700 truncate">{player.name.split(" ")[1] || player.name}</p>
                      <p className="text-[10px] text-slate-400">{getPositionName(player.position)}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
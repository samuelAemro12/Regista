import { Formation, FormationName, Position } from "./types";

export const formations: Record<FormationName, Formation> = {
  "4-3-3": {
    name: "4-3-3",
    positions: [
      { position: "GK", x: 50, y: 92 },
      { position: "LB", x: 10, y: 68 },
      { position: "CB", x: 25, y: 72 },
      { position: "CB", x: 75, y: 72 },
      { position: "RB", x: 90, y: 68 },
      { position: "CDM", x: 50, y: 55 },
      { position: "CM", x: 30, y: 48 },
      { position: "CM", x: 70, y: 48 },
      { position: "LW", x: 15, y: 28 },
      { position: "ST", x: 50, y: 18 },
      { position: "RW", x: 85, y: 28 },
    ],
  },
  "4-2-3-1": {
    name: "4-2-3-1",
    positions: [
      { position: "GK", x: 50, y: 92 },
      { position: "LB", x: 10, y: 68 },
      { position: "CB", x: 25, y: 72 },
      { position: "CB", x: 75, y: 72 },
      { position: "RB", x: 90, y: 68 },
      { position: "CDM", x: 35, y: 55 },
      { position: "CDM", x: 65, y: 55 },
      { position: "CAM", x: 50, y: 40 },
      { position: "LM", x: 15, y: 40 },
      { position: "RM", x: 85, y: 40 },
      { position: "ST", x: 50, y: 18 },
    ],
  },
  "3-5-2": {
    name: "3-5-2",
    positions: [
      { position: "GK", x: 50, y: 92 },
      { position: "CB", x: 20, y: 70 },
      { position: "CB", x: 50, y: 73 },
      { position: "CB", x: 80, y: 70 },
      { position: "LWB", x: 5, y: 50 },
      { position: "RWB", x: 95, y: 50 },
      { position: "CDM", x: 40, y: 55 },
      { position: "CM", x: 50, y: 45 },
      { position: "CDM", x: 60, y: 55 },
      { position: "ST", x: 40, y: 20 },
      { position: "ST", x: 60, y: 20 },
    ],
  },
  "4-4-2": {
    name: "4-4-2",
    positions: [
      { position: "GK", x: 50, y: 92 },
      { position: "LB", x: 10, y: 68 },
      { position: "CB", x: 25, y: 72 },
      { position: "CB", x: 75, y: 72 },
      { position: "RB", x: 90, y: 68 },
      { position: "LM", x: 15, y: 50 },
      { position: "CM", x: 35, y: 52 },
      { position: "CM", x: 65, y: 52 },
      { position: "RM", x: 85, y: 50 },
      { position: "ST", x: 40, y: 20 },
      { position: "ST", x: 60, y: 20 },
    ],
  },
  "3-4-3": {
    name: "3-4-3",
    positions: [
      { position: "GK", x: 50, y: 92 },
      { position: "CB", x: 20, y: 70 },
      { position: "CB", x: 50, y: 73 },
      { position: "CB", x: 80, y: 70 },
      { position: "LWB", x: 8, y: 50 },
      { position: "RWB", x: 92, y: 50 },
      { position: "CM", x: 35, y: 52 },
      { position: "CM", x: 65, y: 52 },
      { position: "LW", x: 15, y: 28 },
      { position: "ST", x: 50, y: 18 },
      { position: "RW", x: 85, y: 28 },
    ],
  },
  "5-3-2": {
    name: "5-3-2",
    positions: [
      { position: "GK", x: 50, y: 92 },
      { position: "LWB", x: 5, y: 65 },
      { position: "CB", x: 18, y: 70 },
      { position: "CB", x: 50, y: 73 },
      { position: "CB", x: 82, y: 70 },
      { position: "RWB", x: 95, y: 65 },
      { position: "CDM", x: 50, y: 55 },
      { position: "CM", x: 30, y: 48 },
      { position: "CM", x: 70, y: 48 },
      { position: "ST", x: 40, y: 20 },
      { position: "ST", x: 60, y: 20 },
    ],
  },
};

export const formationOptions: { value: FormationName; label: string }[] = [
  { value: "4-3-3", label: "4-3-3" },
  { value: "4-2-3-1", label: "4-2-3-1" },
  { value: "3-5-2", label: "3-5-2" },
  { value: "4-4-2", label: "4-4-2" },
  { value: "3-4-3", label: "3-4-3" },
  { value: "5-3-2", label: "5-3-2" },
];

export const getFormation = (name: FormationName): Formation => {
  return formations[name];
};

export const getDefaultPositions = (formationName: FormationName): { position: Position; x: number; y: number }[] => {
  return formations[formationName].positions;
};
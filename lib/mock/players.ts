import { Player, Position, Team } from "./types";

const milanTeam: Team = {
  id: "team-milan",
  name: "AC Milan",
  shortName: "MIL",
  crest: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
  primaryColor: "#FB090B",
  secondaryColor: "#000000",
};

export const players: Player[] = [
  {
    id: "player-maignan",
    name: "Mike Maignan",
    number: 16,
    position: "GK",
    nationality: "France",
    age: 29,
  },
  {
    id: "player-sportiello",
    name: "Marco Sportiello",
    number: 57,
    position: "GK",
    nationality: "Italy",
    age: 32,
  },
  {
    id: "player-tomori",
    name: "Fikayo Tomori",
    number: 23,
    position: "CB",
    nationality: "England",
    age: 26,
  },
  {
    id: "player-gabbia",
    name: "Matteo Gabbia",
    number: 46,
    position: "CB",
    nationality: "Italy",
    age: 24,
  },
  {
    id: "player-thiaw",
    name: "Malick Thiaw",
    number: 28,
    position: "CB",
    nationality: "Germany",
    age: 23,
  },
  {
    id: "player-pavlovic",
    name: "Strahinja Pavlović",
    number: 31,
    position: "CB",
    nationality: "Serbia",
    age: 23,
  },
  {
    id: "player-hernandez",
    name: "Théo Hernandez",
    number: 19,
    position: "LB",
    nationality: "France",
    age: 26,
  },
  {
    id: "player-calabria",
    name: "Davide Calabria",
    number: 2,
    position: "RB",
    nationality: "Italy",
    age: 27,
  },
  {
    id: "player-emerson",
    name: "Emerson Royal",
    number: 22,
    position: "RB",
    nationality: "Brazil",
    age: 25,
  },
  {
    id: "player-terracciano",
    name: "Filippo Terracciano",
    number: 38,
    position: "RB",
    nationality: "Italy",
    age: 21,
  },
  {
    id: "player-fofana",
    name: "Youssouf Fofana",
    number: 29,
    position: "CDM",
    nationality: "France",
    age: 25,
  },
  {
    id: "player-reijnders",
    name: "Tijjani Reijnders",
    number: 14,
    position: "CM",
    nationality: "Netherlands",
    age: 26,
  },
  {
    id: "player-mussah",
    name: "Yunus Musah",
    number: 80,
    position: "CM",
    nationality: "USA",
    age: 21,
  },
  {
    id: "player-loftus-cheek",
    name: "Ruben Loftus-Cheek",
    number: 8,
    position: "CM",
    nationality: "England",
    age: 28,
  },
  {
    id: "player-bennacer",
    name: "Ismaël Bennacer",
    number: 4,
    position: "CDM",
    nationality: "Algeria",
    age: 26,
  },
  {
    id: "player-pulisic",
    name: "Christian Pulisic",
    number: 11,
    position: "RW",
    nationality: "USA",
    age: 25,
  },
  {
    id: "player-leao",
    name: "Rafael Leão",
    number: 10,
    position: "LW",
    nationality: "Portugal",
    age: 25,
  },
  {
    id: "player-chukwueze",
    name: "Samuel Chukwueze",
    number: 21,
    position: "RW",
    nationality: "Nigeria",
    age: 25,
  },
  {
    id: "player-okuonghae",
    name: "Noah Okafor",
    number: 17,
    position: "LW",
    nationality: "Switzerland",
    age: 24,
  },
  {
    id: "player-jovic",
    name: "Luka Jović",
    number: 9,
    position: "ST",
    nationality: "Serbia",
    age: 26,
  },
  {
    id: "player-morata",
    name: "Álvaro Morata",
    number: 7,
    position: "ST",
    nationality: "Spain",
    age: 31,
  },
  {
    id: "player-abraham",
    name: "Tammy Abraham",
    number: 90,
    position: "ST",
    nationality: "England",
    age: 26,
  },
];

export const playersByPosition = (position: Position): Player[] => {
  return players.filter((p) => p.position === position);
};

export const getPlayerById = (id: string): Player | undefined => {
  return players.find((p) => p.id === id);
};

export const getPlayersByIds = (ids: string[]): Player[] => {
  return players.filter((p) => ids.includes(p.id));
};
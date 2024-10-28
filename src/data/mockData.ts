import { Character } from "../types/dataTypes";
import { Comic } from "../types/dataTypes";

export const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Spider-Man',
    description: 'No description provided',
    comics: [1, 2],
  },
  {
    id: 2,
    name: 'Iron Man',
    description: 'No description provided',
    comics: [3, 4],
  },
  {
    id: 3,
    name: 'Captain America',
    description: 'No description provided',
    comics: [5, 6],
  },
  {
    id: 4,
    name: 'Hulk',
    description: 'No description provided',
    comics: [6, 9],
  },
  {
    id: 5,
    name: 'Spider-Man',
    description: 'No description provided',
    comics: [1, 2],
  },
  {
    id: 6,
    name: 'Iron Man',
    description: 'No description provided',
    comics: [3, 4],
  },
  {
    id: 7,
    name: 'Captain America',
    description: 'No description provided',
    comics: [5, 6],
  },
  {
    id: 8,
    name: 'Hulk',
    description: 'No description provided',
    comics: [6, 9],
  },
];

export const mockComics: Comic[] = [
  {
    id: 1,
    title: 'Amazing Fantasy #15',
    description: 'No description provided',
    characters: [1, 5],
  },
  {
    id: 2,
    title: 'The Amazing Spider-Man #1',
    description: 'No description provided',
    characters: [1, 5],
  },
  {
    id: 3,
    title: 'Tales of Suspense #39',
    description: 'No description provided',
    characters: [2, 6],
  },
  {
    id: 4,
    title: 'Iron Man #1',
    description: 'No description provided',
    characters: [2, 6],
  },
  {
    id: 5,
    title: 'Captain America Comics #1',
    description: 'No description provided',
    characters: [3, 7],
  },
  {
    id: 6,
    title: 'Avengers #4',
    description: 'No description provided',
    characters: [3, 4, 7, 8],
  },
  {
    id: 7,
    title: 'Journey into Mystery #83',
    description: 'No description provided',
    characters: [4, 8],
  },
];

export interface Character {
  id: number;
  name: string;
  description: string;
  comics: number[];
}

export interface Comic {
  id: number;
  title: string;
  description: string;
  characters: number[];
}

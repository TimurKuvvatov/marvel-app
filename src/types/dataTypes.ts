export interface Character {
  id: number;
  name: string;
  description: string;
  comics: number[];
  image: string;
}

export interface Comic {
  id: number;
  name: string;
  description: string;
  characters: number[];
  image: string;
}

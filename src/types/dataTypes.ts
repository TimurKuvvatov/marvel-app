export interface Item {
  resourceURI: string;
  name: string;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  
  comics: {
    items: Item[];
  };
}

export interface Comic {
  id: number;
  title: string;
  description: string;
  thumbnail: Thumbnail;
  characters: {
    items: Item[];
  };
}

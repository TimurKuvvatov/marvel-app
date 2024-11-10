import { makeAutoObservable, runInAction } from 'mobx';
import api from '../api/helpers/axios';
import { Character, Comic } from '../types/dataTypes';
import { Md5 } from 'ts-md5';

class PostsStore {
  characters: Character[] = [];
  comics: Comic[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getPostsList(limit = 100) {
    this.loading = true;
    this.error = null;
    const publicKey = import.meta.env.VITE_PUBLIC_API_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_API_KEY;
    const timestamp = new Date().getTime().toString();
    const hash = Md5.hashStr(timestamp + privateKey + publicKey);
    try {
      console.log('Fetching characters with params:', {
        limit: Math.min(limit, 100),
        apikey: publicKey,
        ts: timestamp,
        hash: hash,
      });
      const [charactersResponse, comicsResponse] = await Promise.all([
        api.get('/characters', {
          params: {
            limit: Math.min(limit, 100),
            apikey: publicKey,
            ts: timestamp,
            hash: hash,
          },
        }),
        api.get('/comics', {
          params: {
            limit: Math.min(limit, 100),
            apikey: publicKey,
            ts: timestamp,
            hash: hash,
          },
        }),
      ]);
      runInAction(() => {
        this.characters = charactersResponse.data.data.results;
        this.comics = comicsResponse.data.data.results;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'An unknown error occurred';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

const postsStore = new PostsStore();

export default postsStore;
